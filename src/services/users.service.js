import bcrypt from 'bcrypt';
import { usersRepository } from '../repositories/users.repository.js';
import { AppError } from '../utils/AppError.js';

class UserService {
    async register({name, email, password}) {
        // Regra: email único
        const userExists = await usersRepository.findByEmail(email);
        if (userExists) {
            throw new AppError('User already exists', 409);
        }
        
        // Regra: Senha criptografada
        const passwordHash = await bcrypt.hash(password, 10);

        const user = await usersRepository.create({name, email, passwordHash});

        return user;
    }
}

export const userService = new UserService();