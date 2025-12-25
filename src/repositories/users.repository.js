import pool from '../config/database.js';

class UsersRepository {
    async findByEmail(email){
        const query = `SELECT * FROM users WHERE email = $1`;

        const { rows } = await pool.query(query, [email]);
        return rows[0];
    }

    async create({name, email, passwordHash}) {
        const query = `
            INSERT INTO users (name, email, password_hash) VALUES
            ($1, $2, $3)
            RETURNING id, name, email, role
        `;

        const { rows } = await pool.query(query, [name, email, passwordHash]);
        return rows[0];
    }
}

export const usersRepository = new UsersRepository();