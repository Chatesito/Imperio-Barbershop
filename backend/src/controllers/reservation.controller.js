import Reservation from "../models/Reservation.js";

export const createReservation = async (req, res) => {
  try {
    const newReservation = await Reservation.create(req.body);
    res.status(201).json({ message: "Reservación creada con éxito", reservation: newReservation });
  } catch (error) {
    res.status(500).json({ message: "Error creando reservación", error: error.message });
  }
};

export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo reservaciones", error: error.message });
  }
};
