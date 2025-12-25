import jwt, { decode } from 'jsonwebtoken';
import {AppError} from '../utils/AppError.js'
import {env} from '../config/env.js'


export function ensureAuthenticated(req, res, next){
    const authHeader = req.headers.authorization;

    // Verifica se o Header existe
    if (!authHeader) {
        throw new AppError('Token missing', 401)
    }

    // Separar Bearer <token>
    const [, token] = authHeader.split(' ');

    try {
        // Verifica a assinatura do token
        const decoded = jwt.verify(token, env.jwt.secret);

        // Injeta os dados do usuário na requisição (req.user) para
        // ficarem disponíveis para os controllers
        req.user = {
            id: decoded.id,
            role: decoded.role
        }

        return next();


    } catch (error) {
        throw new AppError('Invalid token', 401)
    }


}


