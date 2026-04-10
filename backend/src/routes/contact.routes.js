import { Router } from "express";
import { submitContact, getContacts, deleteContact } from "../controllers/contact.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", submitContact);
router.get("/", verifyToken, isAdmin, getContacts);
router.delete("/:id", verifyToken, isAdmin, deleteContact);

export default router;
