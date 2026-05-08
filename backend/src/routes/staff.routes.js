import { Router } from "express";
import { getStaff, updateStaffMember, deleteStaffMember } from "../controllers/staff.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

// Public: view all staff
router.get("/", getStaff);

// Protected Admin: Manage staff
router.put("/:id", verifyToken, isAdmin, updateStaffMember);
router.delete("/:id", verifyToken, isAdmin, deleteStaffMember);

export default router;
