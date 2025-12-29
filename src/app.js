import express from "express";
import cors from "cors";

import usersRoutes from "./routes/users.routes.js";
import authRoutes from "./routes/auth.routes.js";
import toysRoutes from "./routes/toys.routes.js";

import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/toys", toysRoutes);

// Health Check
app.get("/health", (req, res) => {
    return res.json({ status: "ok" });
});

app.use(errorMiddleware);

export default app;
