import pool from "../config/database.js";

class ToysRepository {
    async create({
        title,
        description,
        category,
        condition,
        imageUrl,
        userId,
    }) {
        const query = `
            INSERT INTO toys (
                title,
                description,
                category,
                condition,
                image_url,
                user_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING * 
        `;

        const values = [
            title,
            description,
            category,
            condition,
            imageUrl,
            userId,
        ];

        const { rows } = await pool.query(query, values);
        return rows[0];
    }
}

export const toysRepository = new ToysRepository();
