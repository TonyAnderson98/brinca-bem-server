import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError.js'
import { env } from '../config/env.js'

interface TokenPayload {
    id: number;
    role: 'user' | 'admin';
    iat: number;
    exp: number;
}


export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    // Verifica se o Header existe
    if (!authHeader) {
        throw new AppError('Token missing', 401)
    }

    // Separar Bearer <token>
    const [, token] = authHeader.split(' ');

    try {
        // Verifica a assinatura do token
        const decoded = jwt.verify(token, env.jwt.secret) as unknown as TokenPayload;

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


export function ensureAdmin(req: Request, res: Response, next: NextFunction) {

    if (req.user?.role !== 'admin') {
        throw new AppError('Access denied: Admins only', 403)
    }

    return next();
}

