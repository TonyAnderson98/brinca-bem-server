import app from './app.js';
import { env } from './config/env.js';
import pool from './config/database.js';
import logger from './config/logger.js';

// Testa conexão com banco antes de subir o servidor
async function start() {
    try {
        await pool.query('SELECT 1'); // Ping no banco

        app.listen(env.port, () => {
            logger.info(`Server running on port ${env.port}`);
            logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
            logger.info(`http://localhost:${env.port}`);
        });
    } catch (error) {
        logger.error('❌ Critical Error: Failed to connect to database at startup.');

        if (error instanceof Error) {
            logger.error(`Details: ${error.message}`);
            logger.debug(error.stack);
        } else {
            logger.error(JSON.stringify(error));
        }
        process.exit(1);
    }
}

start();