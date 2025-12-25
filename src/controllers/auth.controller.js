import { authService } from "../services/auth.service.js";
import { AppError } from "../utils/AppError.js";



export async function login (req, res, next) {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            throw new AppError('Email and password are required', 400)
        }

    // Usuário logado retornado sem senha
    const result = await authService.authenticate(email, password);


    return res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}