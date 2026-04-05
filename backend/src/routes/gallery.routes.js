import { Router } from "express";
import { getGallery, createGalleryImage, deleteGalleryImage } from "../controllers/gallery.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { adminRoute } from "../middlewares/admin.middleware.js";

const router = Router();

router.get("/", getGallery);
router.post("/", protectRoute, adminRoute, createGalleryImage);
router.delete("/:id", protectRoute, adminRoute, deleteGalleryImage);

export default router;
