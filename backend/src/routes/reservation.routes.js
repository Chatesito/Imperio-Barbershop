import { Router } from "express";
import { createReservation, getReservations, getMyReservations, deleteReservation } from "../controllers/reservation.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyToken, createReservation);
router.get("/me", verifyToken, getMyReservations);
router.get("/", verifyToken, getReservations);
router.delete("/:id", verifyToken, deleteReservation);

export default router;
