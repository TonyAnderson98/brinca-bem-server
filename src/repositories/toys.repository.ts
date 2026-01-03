import pool from '../config/database.js';
import { Toy } from '../types/index.js'

// DTO para criação
interface CreateToyDTO {
    title: string;
    description: string;
    category: string;
    condition: 'new' | 'used';
    imageUrl: string; // capa
    gallery: string[]; // outras imagens
    userId: number;
}

class ToysRepository {
    async create({
        title,
        description,
        category,
        condition,
        imageUrl,
        gallery,
        userId,
    }: CreateToyDTO): Promise<Toy> {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            // Inserir a capa
            const queryToy = `
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

            const valuesToy = [
                title,
                description,
                category,
                condition,
                imageUrl,
                userId,
            ];

            const { rows: toyRows } = await client.query<Toy>(queryToy, valuesToy);
            const toy = toyRows[0];


            // Inserir demais imagens (se houver)
            if (gallery && gallery.length > 0) {
                const queryGallery = `
                    INSERT INTO toys_gallery (toy_id, image_url)
                    VALUES ($1, $2)
                `;

                for (const url of gallery) {
                    await client.query(queryGallery, [toy.id, url]);
                }
            }

            await client.query('COMMIT');

            // Retorna o objeto completo
            return { ...toy, gallery };
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
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
                image_url
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
                image_url
            FROM toys
            WHERE id = $1
        `;

        const { rows: toyRows } = await pool.query<Toy>(query, [id]);

        // Busca a galeria separadamente
        const queryGallery = `
            SELECT image_url
            FROM toys_gallery
            WHERE toy_id = $1`;

        const { rows: galleryRows } = await pool.query<{ image_url: string }>(queryGallery, [id]);

        const toy = toyRows[0];

        toy.gallery = galleryRows.map(row => row.image_url);

        return toy;




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
                image_url
            FROM toys
            WHERE user_id = $1
        `;

        const { rows } = await pool.query<Toy>(query, [userId]);

        return rows;
    }

}

export const toysRepository = new ToysRepository();
