import { Router } from "express";
import { getBranches, createBranch, deleteBranch } from "../controllers/branch.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getBranches);
router.post("/", verifyToken, isAdmin, createBranch);
router.delete("/:id", verifyToken, isAdmin, deleteBranch);

export default router;
