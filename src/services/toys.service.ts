import { toysRepository } from "../repositories/toys.repository.js";
import { Toy } from "../types/index.js";
import { AppError } from "../utils/AppError.js";

interface CreateToyServiceDTO {
    title: string;
    description: string;
    category: string;
    condition: 'new' | 'used';
    imageUrl: string;
    userId: number;
}

class ToysService {
    async create({
        title,
        description,
        category,
        condition,
        imageUrl,
        userId,
    }: CreateToyServiceDTO): Promise<Toy> {
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

    async listAvailabel(): Promise<Toy[]> {
        const toys = await toysRepository.findByStatus("available");

        return toys;
    }

    async showPending(): Promise<Toy[]> {
        const toys = await toysRepository.findByStatus("pending");

        return toys;
    }

    async approve({ toyId }: { toyId: number }): Promise<Toy> {

        const toy = await toysRepository.updateStatus({
            toyId,
            status: "available",
        });

        if (!toy) {
            throw new AppError("Failed to create toy", 500)
        }

        return toy;
    }

    async myToys(userId: number): Promise<Toy[]> {
        const toys = await toysRepository.myToys(userId);

        return toys;
    }
}

export const toysService = new ToysService();
