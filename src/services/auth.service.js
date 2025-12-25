import {usersRepository} from '../repositories/users.repository.js'
import {AppError} from '../utils/AppError.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js'


class AuthService {
    async authenticate(email, password) {
        // Verificar se o email existe
        const user = await usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError('Invalid credentials', 401)
        }


        // Verificar se a senha corresponde
        const passwordMatch = bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            throw new AppError('Invalid credentials', 401)
        }


        // Gerar token
        const token = jwt.sign(
            {id: user.id, role: user.role},
            env.jwt.secret,
            {expiresIn: env.jwt.expiresIn}
        );

        // Retornar dados do usuário autenticado (sem senha)
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }
    }
}




export const authService = new AuthService();