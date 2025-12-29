import { toysRepository } from "../repositories/toys.repository.js";

class ToysService {
    async create({
        title,
        description,
        category,
        condition,
        imageUrl,
        userId,
    }) {
        const toy = await toysRepository.create({
            title,
            description,
            category,
            condition,
            imageUrl,
            userId,
        });

        return toy;
    }
}

export const toysService = new ToysService();
