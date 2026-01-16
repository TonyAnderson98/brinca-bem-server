import { Pool } from 'pg';
import { env } from './env.js';
import logger from './logger.js';

// Detecta se estamos rodando testes
const isTest = process.env.NODE_ENV === 'test';

const pool = new Pool({
    connectionString: env.database.url,

    // - Teste (GitHub/Local Docker): false (Sem SSL)
    // - Produção/Dev (Neon): Objeto SSL (Com SSL)
    ssl: isTest ? false : {
        rejectUnauthorized: false
    }
});


pool.on('connect', () => {
    if (!isTest) {
        logger.info('✅ Database connected successfully');
    }
});

pool.on('error', (err) => {
    logger.error(`Unexpected database error: ${err.message}`);
});

export default pool;