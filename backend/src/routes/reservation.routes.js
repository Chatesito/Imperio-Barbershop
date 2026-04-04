import { Router } from "express";
import { createReservation, getReservations } from "../controllers/reservation.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", protectRoute, createReservation);
router.get("/", protectRoute, getReservations);

export default router;
