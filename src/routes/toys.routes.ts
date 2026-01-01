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
router.get("/",
    /* #swagger.tags = ['Toys']
       #swagger.description = 'Lista todos os brinquedos disponíveis'
    */
    index);

// Rotas USER
router.post("/", ensureAuthenticated,
    /* #swagger.tags = ['Toys']
       #swagger.security = [{ "bearerAuth": [] }] 
       #swagger.description = 'Cadastra um novo brinquedo'
       #swagger.parameters['body'] = {
            in: 'body',
            description: 'Dados do brinquedo',
            schema: { $ref: '#/definitions/AddToy' }
       }
    */
    create);
router.get("/my-toys", ensureAuthenticated,
    /* #swagger.tags = ['Toys']
       #swagger.security = [{ "bearerAuth": [] }]
       #swagger.description = 'Lista os brinquedos do usuário logado'
    */
    myToys);

// Rotodas ADMIN
router.get("/pending", ensureAuthenticated, ensureAdmin,
    /* #swagger.tags = ['Admin']
       #swagger.security = [{ "bearerAuth": [] }]
       #swagger.description = 'Lista brinquedos aguardando aprovação (Admin)'
    */
    showPending);
router.patch("/:id/approve", ensureAuthenticated, ensureAdmin,
    /* #swagger.tags = ['Admin']
       #swagger.security = [{ "bearerAuth": [] }]
       #swagger.description = 'Aprova um brinquedo pendente'
    */
    approve);

export default router;
