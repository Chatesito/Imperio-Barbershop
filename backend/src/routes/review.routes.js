import { Router } from "express";
import { getReviews, createReview, deleteReview } from "../controllers/review.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getReviews);
router.post("/", verifyToken, createReview);
router.delete("/:id", verifyToken, isAdmin, deleteReview);

export default router;
