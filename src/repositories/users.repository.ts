import pool from '../config/database.js';
import { User } from '../types/index.js'

// Define o que é necessário para criar um usuário (DTO - Data Transfer Object)
interface CreateUserDTO {
    name: string;
    email: string;
    passwordHash: string;
}

class UsersRepository {
    async findByEmail(email: string): Promise<User | undefined>{
        const query = `SELECT * FROM users WHERE email = $1`;

        const { rows } = await pool.query<User>(query, [email]);
        return rows[0];
    }

    async create({name, email, passwordHash}: CreateUserDTO): Promise<User> {
        const query = `
            INSERT INTO users (name, email, password_hash) VALUES
            ($1, $2, $3)
            RETURNING id, name, email, role
        `;

        const { rows } = await pool.query<User>(query, [name, email, passwordHash]);
        return rows[0];
    }

    async findAll(): Promise<Pick<User, 'id' | 'name' | 'email' | 'role'>[]> {
        const query = `SELECT id, name, email, role FROM users ORDER BY id`;

        const { rows } = await pool.query<Pick<User, 'id' | 'name' | 'email' | 'role'>>(query);

        return rows;
    }
}

export const usersRepository = new UsersRepository();