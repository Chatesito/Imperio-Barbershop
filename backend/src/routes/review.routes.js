import { Router } from "express";
import { getReviews, getMyReviews, createReview, deleteReview } from "../controllers/review.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getReviews);
router.get("/my-reviews", verifyToken, getMyReviews);
router.post("/", verifyToken, createReview);
router.delete("/:id", verifyToken, deleteReview);

export default router;
