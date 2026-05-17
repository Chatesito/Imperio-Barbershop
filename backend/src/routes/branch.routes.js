import { Router } from "express";
import { getBranches, createBranch, deleteBranch, updateBranch } from "../controllers/branch.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getBranches);
router.post("/", verifyToken, isAdmin, createBranch);
router.put("/:id", verifyToken, isAdmin, updateBranch);
router.delete("/:id", verifyToken, isAdmin, deleteBranch);

export default router;
