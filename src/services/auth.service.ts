import { usersRepository } from '../repositories/users.repository.js'
import { AppError } from '../utils/AppError.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js'

interface AuthResponse {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
}

class AuthService {
    async authenticate(email: string, password: string): Promise<AuthResponse> {
        // Verificar se o email existe
        const user = await usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError('Invalid credentials', 401)
        }


        // Verificar se a senha corresponde
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            throw new AppError('Invalid credentials', 401)
        }


        // Gerar token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            env.jwt.secret,
            { expiresIn: env.jwt.expiresIn as jwt.SignOptions['expiresIn'] }
        );

        // Retornar dados do usuário autenticado (sem senha)
        return {
            token,
            user: {
                id: Number(user.id),
                name: user.name,
                email: user.email,
                role: user.role
            }
        }
    }
}




export const authService = new AuthService();