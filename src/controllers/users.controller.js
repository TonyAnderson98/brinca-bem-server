import { userService } from "../services/users.service.js";
import { AppError } from "../utils/AppError.js";

export async function register(req, res, next){
    try {
        const { name, email, password } = req.body;

        // Validação simples
        if (!name || !email || !password){
            throw new AppError('Name, email and password are required', 400)
        }

        const user = await userService.register({name, email, password});
        return res.status(201).json(user);

    } catch (error) {
        next(error);
    }
}

export async function index(req, res, next) {
    try {
        const users = await userService.listUsers();
        return res.json(users);
    } catch (error) {
        next(error)
    }
}