import { AppError } from '../utils/AppError.js';

export function errorMiddleware(error, req, res, next) {
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