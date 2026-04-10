import Reservation from "../models/Reservation.js";

export const createReservation = async (req, res) => {
  try {
    const { fecha, hora, sede, barbero } = req.body;
    const userId = req.user.id;

    // 1. Validar que no sea una fecha pasadas
    const now = new Date();
    const [year, month, day] = fecha.split("-").map(Number);
    const [hours, minutes] = hora.split(":").map(Number);
    const reservationDate = new Date(year, month - 1, day, hours, minutes);

    if (reservationDate < now) {
      return res.status(400).json({ 
        message: "No puedes agendar una cita para una fecha u hora que ya ha pasado." 
      });
    }

    // 2. Verificar conflicto del Barbero (mismo barbero, fecha y hora)
    if (barbero) {
        const barberConflict = await Reservation.findOne({ fecha, hora, barbero });
        if (barberConflict) {
            return res.status(400).json({ 
                message: "Lo sentimos, este barbero ya tiene una cita reservada en ese horario." 
            });
        }
    }

    // 3. Verificar conflicto del Usuario (mismo usuario, fecha y hora)
    const userConflict = await Reservation.findOne({ fecha, hora, userId });
    if (userConflict) {
        return res.status(400).json({ 
            message: "Ya tienes otra cita agendada para este mismo horario." 
        });
    }

    // 4. Verificar conflicto general de Sede (mismo lugar, fecha y hora)
    const existingReservation = await Reservation.findOne({ fecha, hora, sede, barbero });
    if (existingReservation) {
        return res.status(400).json({ 
            message: "Este horario ya no está disponible en esta sede." 
        });
    }

    const reservationData = { ...req.body, userId: req.user.id };
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
