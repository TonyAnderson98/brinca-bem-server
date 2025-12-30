import { toysService } from "../services/toys.service.js";
import { AppError } from "../utils/AppError.js";

export async function create(req, res, next) {
    try {
        const { title, description, category, condition, image_url } = req.body;
        const userId = req.user.id; // Injetado pelo middleware de autenticação

        if (!title || !description || !category || !condition || !image_url) {
            throw new AppError("All fields are required", 400);
        }

        const toy = await toysService.create({
            title,
            description,
            category,
            condition,
            imageUrl: image_url,
            userId,
        });

        return res.status(201).json(toy);
    } catch (error) {
        next(error);
    }
}

export async function index(req, res, next) {
    try {
        const toys = await toysService.listAvailabel();

        return res.status(200).json(toys);
    } catch (error) {
        next(error);
    }
}
