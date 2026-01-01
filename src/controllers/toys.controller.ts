import { Request, Response, NextFunction } from 'express';
import { toysService } from "../services/toys.service.js";
import { AppError } from "../utils/AppError.js";

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const { title, description, category, condition, image_url } = req.body;
        const userId = req.user!.id; // Injetado pelo middleware de autenticação

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

export async function index(req: Request, res: Response, next: NextFunction) {
    try {
        const toys = await toysService.listAvailabel();

        return res.status(200).json(toys);
    } catch (error) {
        next(error);
    }
}

export async function showPending(req: Request, res: Response, next: NextFunction) {
    try {
        const toys = await toysService.showPending();

        return res.status(200).json(toys);
    } catch (error) {
        next(error);
    }
}

export async function approve(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const toy = await toysService.approve({ toyId: Number(id) });

        return res.status(200).json(toy);
    } catch (error) {
        next(error);
    }
}

export async function myToys(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user!.id; // Injetado pelo middleware de autenticação

        const toys = await toysService.myToys(userId);

        return res.status(200).json(toys);
    } catch (error) {
        next(error);
    }
}
