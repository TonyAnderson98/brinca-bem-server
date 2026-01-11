import pool from '../config/database.js';
import { Toy } from '../types/index.js'

// DTO para criação
interface CreateToyDTO {
    title: string;
    description: string;
    category: string;
    condition: 'new' | 'used';
    images: string[];
    userId: number;
}

class ToysRepository {
    async create({
        title,
        description,
        category,
        condition,
        images,
        userId,
    }: CreateToyDTO): Promise<Toy> {
        const query = `
            INSERT INTO toys (
                title,
                description,
                category,
                condition,
                images,
                user_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING * `;

        const values = [
            title,
            description,
            category,
            condition,
            images,
            userId,
        ];

        const { rows } = await pool.query<Toy>(query, values);
        return rows[0];
    }

    async findByStatus(status: string): Promise<Toy[]> {
        const query = `
            SELECT
                id,
                title,
                description,
                category,
                condition,
                status,
                images
            FROM toys
            WHERE status = $1
            ORDER BY created_at DESC
        `;

        const { rows } = await pool.query<Toy>(query, [status]);
        return rows;
    }

    async findById(id: number): Promise<Toy | undefined> {
        const query = `
            SELECT
                id,
                title,
                description,
                category,
                condition,
                status,
                images
            FROM toys
            WHERE id = $1
        `;

        const { rows } = await pool.query<Toy>(query, [id]);

        return rows[0];
    }

    async updateStatus({ toyId, status }: { toyId: number; status: string }): Promise<Toy | undefined> {
        const query = `
            UPDATE toys
            SET status = $1
            WHERE id = $2
            RETURNING *`;

        const { rows } = await pool.query<Toy>(query, [status, toyId]);

        return rows[0];
    }

    async myToys(userId: number): Promise<Toy[]> {
        const query = `
            SELECT 
                id,
                title,
                description,
                category,
                condition,
                status,
                images
            FROM toys
            WHERE user_id = $1
        `;

        const { rows } = await pool.query<Toy>(query, [userId]);

        return rows;
    }

}

export const toysRepository = new ToysRepository();