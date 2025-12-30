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

    async listAvailabel() {
        const toys = await toysRepository.findByStatus("available");

        return toys;
    }
}

export const toysService = new ToysService();
