import { Router } from "express";
import { submitContact, getContacts, deleteContact } from "../controllers/contact.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { adminRoute } from "../middlewares/admin.middleware.js";

const router = Router();

router.post("/", submitContact);
router.get("/", protectRoute, adminRoute, getContacts);
router.delete("/:id", protectRoute, adminRoute, deleteContact);

export default router;
