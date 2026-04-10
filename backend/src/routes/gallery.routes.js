import { Router } from "express";
import { getGallery, createGalleryImage, deleteGalleryImage } from "../controllers/gallery.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getGallery);
router.post("/", verifyToken, isAdmin, createGalleryImage);
router.delete("/:id", verifyToken, isAdmin, deleteGalleryImage);

export default router;
