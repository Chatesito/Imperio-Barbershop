import { Router } from "express";
import { getBranches, createBranch, deleteBranch } from "../controllers/branch.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { adminRoute } from "../middlewares/admin.middleware.js";

const router = Router();

router.get("/", getBranches);
router.post("/", protectRoute, adminRoute, createBranch);
router.delete("/:id", protectRoute, adminRoute, deleteBranch);

export default router;
