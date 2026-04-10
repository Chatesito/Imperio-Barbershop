import Reservation from "../models/Reservation.js";

export const createReservation = async (req, res) => {
  try {
    const { fecha, hora, sede, barbero } = req.body;

    // Verificar unicidad
    const existingReservation = await Reservation.findOne({ fecha, hora, sede, barbero });
    if (existingReservation) {
        return res.status(400).json({ 
            message: "Lo sentimos, este horario ya ha sido reservado. Por favor elige otro." 
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
