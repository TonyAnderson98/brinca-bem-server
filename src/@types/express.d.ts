import { User } from "../types/index.js";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                role: 'user' | 'admin';
            };
        }
    }
}