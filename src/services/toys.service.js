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

    async showPending() {
        const toys = await toysRepository.findByStatus("pending");

        return toys;
    }

    async approve({ toyId }) {
        if (!toyId) {
            throw new AppError("Toy ID is required");
        }

        const toy = await toysRepository.updateStatus({
            toyId,
            status: "available",
        });

        if (!toy) {
            throw new AppError("Toy not found", 404);
        }

        return toy;
    }
}

export const toysService = new ToysService();
