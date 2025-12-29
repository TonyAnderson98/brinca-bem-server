import { Router } from "express";
import { create } from "../controllers/toys.controller.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

// POST /toys
router.post("/", ensureAuthenticated, create);

export default router;
