import { Router } from "express";
import { getStaff, createStaffMember, deleteStaffMember } from "../controllers/staff.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

// Public: view all staff
router.get("/", getStaff);

// Protected Admin: Add or delete staff
router.post("/", verifyToken, isAdmin, createStaffMember);
router.delete("/:id", verifyToken, isAdmin, deleteStaffMember);

export default router;
