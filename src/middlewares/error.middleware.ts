import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';

export function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
    // Erro controlado (ufa!) 
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }

    // Erro desconhecido
    console.error('ERROR:', error);

    // Retorna mensagem genérica para o front
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
}