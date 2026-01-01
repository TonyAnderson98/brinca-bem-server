import { Router } from 'express';
import { login } from '../controllers/auth.controller.js'

const router = Router();

router.post('/login',
    /* #swagger.tags = ['Auth']
       #swagger.description = 'Autentica o usuário e retorna o Token JWT'
       #swagger.parameters['body'] = {
            in: 'body',
            description: 'Credenciais de acesso',
            schema: { $ref: '#/definitions/Login' }
       } 
    */
    login);


export default router;