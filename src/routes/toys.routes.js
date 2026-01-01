import { Router } from "express";
import {
    approve,
    showPending,
    create,
    index,
    myToys,
} from "../controllers/toys.controller.js";
import {
    ensureAdmin,
    ensureAuthenticated,
} from "../middlewares/auth.middleware.js";

const router = Router();

// Rotas públicas
router.get("/", index);

// Rotas USER
router.post("/", ensureAuthenticated, create);
router.get("/my-toys", ensureAuthenticated, myToys);

// Rotodas ADMIN
router.get("/pending", ensureAuthenticated, ensureAdmin, showPending);
router.patch("/:id/approve", ensureAuthenticated, ensureAdmin, approve);

export default router;
