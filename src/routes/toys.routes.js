import { Router } from "express";
import { create, index } from "../controllers/toys.controller.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", ensureAuthenticated, create);
router.get("/", index);

export default router;
