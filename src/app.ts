import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";

import usersRoutes from "./routes/users.routes.js";
import authRoutes from "./routes/auth.routes.js";
import toysRoutes from "./routes/toys.routes.js";

import { errorMiddleware } from "./middlewares/error.middleware.js";
import httpLogger from './middlewares/httpLogger.js';


const require = createRequire(import.meta.url);
const swaggerFile = require("./swagger-output.json");

const app = express();

app.use(express.json());
app.use(cors());
app.use(httpLogger);

// --- VERCEL USAR CDN PARA UI DO SWAGGER ---
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui.min.css";
const JS_URL = [
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui-bundle.js",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui-standalone-preset.js",
];

app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/toys", toysRoutes);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerFile, {
        customCssUrl: CSS_URL,
        customJs: JS_URL,
        customSiteTitle: "Brinca Bem API Docs"
    })
);

// Health Check
app.get("/health", (req, res) => {
    return res.json({ status: "ok" });
});

app.use(errorMiddleware);

export default app;
