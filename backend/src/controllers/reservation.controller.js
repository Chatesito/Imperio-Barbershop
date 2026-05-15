import Reservation from "../models/Reservation.js";
import Staff from "../models/Staff.js";

export const createReservation = async (req, res) => {
  try {
    const { fecha, hora, sede, barbero } = req.body;
    
    let userId = req.user.id;
    if (req.user.role === "admin" && req.body.isWalkIn) {
      userId = null;
    }

    const now = new Date();
    
    // Convert fecha and hora to a Date object in -05:00 (Barbershop local time)
    // We do this manually to avoid platform-specific parsing issues with string offsets
    const [y, mon, d] = fecha.split('-').map(Number);
    const [hh, mm] = hora.split(':').map(Number);
    
    // -05:00 means UTC = Local + 5 hours
    const reservationDate = new Date(Date.UTC(y, mon - 1, d, hh + 5, mm));

    if (isNaN(reservationDate.getTime())) {
      return res.status(400).json({ message: "Fecha u hora inválida." });
    }

    // Allow a 5-minute grace period for server clock drift
    const nowWithGrace = new Date(now.getTime() - 5 * 60 * 1000);

    if (reservationDate < nowWithGrace) {
      return res.status(400).json({ 
        message: "No puedes agendar una cita para una fecha u hora que ya ha pasado." 
      });
    }

    const oneHourLater = new Date(now.getTime() + 55 * 60 * 1000); // 55 mins instead of 60 to be more flexible
    if (reservationDate < oneHourLater) {
      return res.status(400).json({ 
        message: "Las citas para el mismo día deben reservarse con al menos 1 hora de anticipación." 
      });
    }

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

    const timeToMins = (t) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };

    const minsToTime = (m) => {
      const hh = Math.floor(m / 60).toString().padStart(2, '0');
      const mm = (m % 60).toString().padStart(2, '0');
      return `${hh}:${mm}`;
    };

    const newStart = timeToMins(hora);
    const newDuration = req.body.duration || 30;
    const newEnd = newStart + newDuration;

    if (barbero && barbero !== "Sin preferencia / El mejor disponible") {
        const existingReservations = await Reservation.find({ 
          fecha, 
          barbero,
          status: { $in: ["pending", "confirmed"] }
        });

        for (const resv of existingReservations) {
          const resStart = timeToMins(resv.hora);
          const resEnd = resStart + (resv.duration || 30);

          if ((newStart >= resStart && newStart < resEnd) || 
              (newEnd > resStart && newEnd <= resEnd) ||
              (newStart <= resStart && newEnd >= resEnd)) {
            return res.status(400).json({ 
              message: `Lo sentimos, este barbero ya tiene una cita de ${minsToTime(resStart)} a ${minsToTime(resEnd)}.` 
            });
          }
        }
    }

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
            message: "Ya tienes una cita agendada para este mismo horario." 
        });
    }

    if (!barbero || barbero === "Sin preferencia / El mejor disponible") {
      const concurrentReservations = await Reservation.find({ 
        fecha, 
        sede,
        status: { $in: ["pending", "confirmed"] }
      });

      let overlaps = 0;
      for (const resv of concurrentReservations) {
        const resStart = timeToMins(resv.hora);
        const resEnd = resStart + (resv.duration || 30);
        if ((newStart >= resStart && newStart < resEnd) || (newEnd > resStart && newEnd <= resEnd)) {
          overlaps++;
        }
      }

      if (overlaps >= 5) {
          return res.status(400).json({ 
              message: "Lo sentimos, no hay barberos disponibles en este intervalo de tiempo para esta sede." 
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
      const staffMember = await Staff.findOne({ userId: req.user.id });
      const barberName = staffMember ? staffMember.name : req.user.name;
      
      if (barberName) {
        // Escape special characters for Regex
        const escapedName = barberName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        query.$or = [
          { barbero: { $regex: new RegExp(escapedName, "i") } }
        ];
        if (staffMember) {
          query.$or.push({ barbero: staffMember._id.toString() });
        }
      }
    }
    const reservations = await Reservation.find(query).sort({ fecha: 1, hora: 1 });
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
    const isOwner = reservation.userId && reservation.userId.toString() === req.user.id;
    if (req.user.role !== "admin" && !isOwner) {
       return res.status(403).json({ message: "No puedes cancelar esta reservación" });
    }
    await Reservation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Reservación cancelada" });
  } catch (error) {
    res.status(500).json({ message: "Error cancelando reservación", error: error.message });
  }
};
