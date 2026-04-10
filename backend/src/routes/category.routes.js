import { Router } from "express";
import { getCategories, createCategory, deleteCategory } from "../controllers/category.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getCategories);
router.post("/", verifyToken, isAdmin, createCategory);
router.delete("/:id", verifyToken, isAdmin, deleteCategory);

export default router;
