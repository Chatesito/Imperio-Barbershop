import { Router } from "express";
import { getServices, createService, deleteService } from "../controllers/service.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { adminRoute } from "../middlewares/admin.middleware.js";

const router = Router();

router.get("/", getServices);
router.post("/", protectRoute, adminRoute, createService);
router.delete("/:id", protectRoute, adminRoute, deleteService);

export default router;
