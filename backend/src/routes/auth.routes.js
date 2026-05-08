import { Router } from "express";
import { loginUser, registerUser, refreshToken, getAllUsers, updateUserRole, createAdminUser, changePassword, updateProfile } from "../controllers/auth.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.put("/change-password", verifyToken, changePassword);
router.put("/update-profile", verifyToken, updateProfile);

// Admin only
router.post("/create-user", verifyToken, isAdmin, createAdminUser);
router.get("/users", verifyToken, isAdmin, getAllUsers);
router.put("/users/role", verifyToken, isAdmin, updateUserRole);

export default router;
