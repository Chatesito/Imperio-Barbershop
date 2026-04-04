import { Router } from "express";
import { getStaff, createStaffMember, deleteStaffMember } from "../controllers/staff.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { adminRoute } from "../middlewares/admin.middleware.js";

const router = Router();

// Public: view all staff
router.get("/", getStaff);

// Protected Admin: Add or delete staff
router.post("/", protectRoute, adminRoute, createStaffMember);
router.delete("/:id", protectRoute, adminRoute, deleteStaffMember);

export default router;
