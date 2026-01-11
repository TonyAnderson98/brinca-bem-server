import { toysRepository } from "../repositories/toys.repository.js";
import { Toy } from "../types/index.js";
import { AppError } from "../utils/AppError.js";

interface CreateToyServiceDTO {
    title: string;
    description: string;
    category: string;
    condition: 'new' | 'used';
    images: string[];
    userId: number;
}

class ToysService {
    async create({
        title,
        description,
        category,
        condition,
        images,
        userId,
    }: CreateToyServiceDTO): Promise<Toy> {
        const toy = await toysRepository.create({
            title,
            description,
            category,
            condition,
            images,
            userId,
        });

        return toy;
    }

    async listAvailabel(): Promise<Toy[]> {
        const toys = await toysRepository.findByStatus("available");

        return toys;
    }

    async findById(id: number): Promise<Toy | undefined> {
        const toy = await toysRepository.findById(id);

        // Rota pública deve retornar somente se o brinquedo for disponível
        // Não avisaremos ao front end que o recurso existe

        // Futuramente os admins usarão este mesmo método para buscar um brinquedo, mas eles também receberão
        // 404 Not Found. Vou estuadar se é viável usar o 'user.role' para retornar ou não um brinquedo 'pending' ou 'donated'

        if (toy?.status !== 'available') {
            throw new AppError("Este brinquedo não foi encontrado", 404)
        }

        return toy;
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
