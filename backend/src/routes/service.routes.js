import { Router } from "express";
import { getServices, createService, deleteService } from "../controllers/service.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getServices);
router.post("/", verifyToken, isAdmin, createService);
router.delete("/:id", verifyToken, isAdmin, deleteService);

export default router;
