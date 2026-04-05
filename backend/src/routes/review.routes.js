import { Router } from "express";
import { getReviews, createReview, deleteReview } from "../controllers/review.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { adminRoute } from "../middlewares/admin.middleware.js";

const router = Router();

router.get("/", getReviews);
router.post("/", protectRoute, createReview);
router.delete("/:id", protectRoute, adminRoute, deleteReview);

export default router;
