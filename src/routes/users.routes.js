import { Router } from "express";
import { register, index } from "../controllers/users.controller.js";
import { ensureAuthenticated, ensureAdmin } from '../middlewares/auth.middleware.js'

const router = Router();

router.post('/', register);

router.get('/', ensureAuthenticated, ensureAdmin, index);

export default router;