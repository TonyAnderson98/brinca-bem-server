import app from './app.js';
import { env } from './config/env.js';
import pool from './config/database.js';

// Testa conexão com banco antes de subir o servidor
async function start() {
    try {
        await pool.query('SELECT 1'); // Ping no banco
        
        app.listen(env.port, () => {
            console.log(`🚀 Server running on port ${env.port}`);
        });
    } catch (error) {
        console.error('❌ Failed to connect to database:', error);
        process.exit(1);
    }
}

start();