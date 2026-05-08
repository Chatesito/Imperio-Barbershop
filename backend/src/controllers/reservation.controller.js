import Reservation from "../models/Reservation.js";

export const createReservation = async (req, res) => {
  try {
    const { fecha, hora, sede, barbero } = req.body;
    
    // For admins, allow walk-ins which won't be tied to their personal userId
    // Optionally, the frontend could pass a specific userId if they want to book for an existing user.
    // For simplicity, if it's an admin and they don't pass a userId, we'll leave it null or undefined.
    let userId = req.user.id;
    if (req.user.role === "admin" && req.body.isWalkIn) {
      userId = null;
    }

    // 1. Validar que no sea una fecha pasada
    const now = new Date();
    const [year, month, day] = fecha.split("-").map(Number);
    const [hours, minutes] = hora.split(":").map(Number);
    const reservationDate = new Date(year, month - 1, day, hours, minutes);

    if (reservationDate < now) {
      return res.status(400).json({ 
        message: "No puedes agendar una cita para una fecha u hora que ya ha pasado." 
      });
    }

    // Anti-Spam: max 2 appointments per day per user (unless Admin)
    if (req.user.role !== "admin") {
      const dailyCount = await Reservation.countDocuments({
        userId,
        fecha,
        status: { $in: ["pending", "confirmed"] }
      });
      if (dailyCount >= 2) {
        return res.status(400).json({
          message: "Has alcanzado el límite de citas diarias permitidas (2). Por favor elige otro día."
        });
      }
    }

    // 2. Verificar conflicto del Barbero (mismo barbero, fecha y hora)
    if (barbero && barbero !== "Sin preferencia / El mejor disponible") {
        const barberConflict = await Reservation.findOne({ 
          fecha, 
          hora, 
          barbero,
          status: { $in: ["pending", "confirmed"] }
        });
        if (barberConflict) {
            return res.status(400).json({ 
                message: "Lo sentimos, este barbero ya tiene una cita reservada en ese horario." 
            });
        }
    }

    // 3. Verificar conflicto del Usuario (mismo email/usuario, fecha y hora)
    const userConflictQuery = { 
      fecha, 
      hora, 
      status: { $in: ["pending", "confirmed"] }
    };
    if (userId) {
      userConflictQuery.userId = userId;
    } else {
      userConflictQuery.email = req.body.email;
    }

    const userConflict = await Reservation.findOne(userConflictQuery);
    if (userConflict) {
        return res.status(400).json({ 
            message: "Ya hay una cita agendada para este mismo horario con estos datos." 
        });
    }

    // 4. Verificar conflicto general de Sede si no hay barbero asignado (Capacidad limitada por sede)
    // Para simplificar, asumiremos que una sede puede atender máximo N personas a la vez (e.g. 5)
    if (!barbero || barbero === "Sin preferencia / El mejor disponible") {
      const concurrentReservations = await Reservation.countDocuments({ 
        fecha, 
        hora, 
        sede,
        status: { $in: ["pending", "confirmed"] }
      });
      if (concurrentReservations >= 5) { // Asumimos 5 barberos por sede
          return res.status(400).json({ 
              message: "Lo sentimos, no hay barberos disponibles en este horario para esta sede." 
          });
      }
    }

    const reservationData = { ...req.body };
    if (userId) {
      reservationData.userId = userId;
    }

    const newReservation = await Reservation.create(reservationData);
    res.status(201).json({ message: "Reservación creada con éxito", reservation: newReservation });
  } catch (error) {
    res.status(500).json({ message: "Error creando reservación", error: error.message });
  }
};

export const getReservations = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === "barber") {
      query.barbero = req.user.name;
    }
    const reservations = await Reservation.find(query).sort({ createdAt: -1 });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo reservaciones", error: error.message });
  }
};

export const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo reservaciones", error: error.message });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservación no encontrada" });
    }
    // Allow cancellation if admin or is owner
    if (req.user.role !== "admin" && reservation.userId.toString() !== req.user.id) {
       return res.status(403).json({ message: "No puedes cancelar esta reservación" });
    }
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Reservación cancelada" });
  } catch (error) {
    res.status(500).json({ message: "Error cancelando reservación", error: error.message });
  }
};
