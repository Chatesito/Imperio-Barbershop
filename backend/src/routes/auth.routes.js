import { Router } from "express";
import { loginUser, registerUser, refreshToken, getAllUsers, updateUserRole } from "../controllers/auth.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);

// Admin only
router.get("/users", verifyToken, isAdmin, getAllUsers);
router.put("/users/role", verifyToken, isAdmin, updateUserRole);

export default router;
