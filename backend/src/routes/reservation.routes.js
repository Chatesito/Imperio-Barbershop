import { Router } from "express";
import { createReservation, getReservations, getMyReservations, deleteReservation } from "../controllers/reservation.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { adminRoute } from "../middlewares/admin.middleware.js";

const router = Router();

router.post("/", protectRoute, createReservation);
router.get("/me", protectRoute, getMyReservations);
router.get("/", protectRoute, adminRoute, getReservations);
router.delete("/:id", protectRoute, deleteReservation);

export default router;
