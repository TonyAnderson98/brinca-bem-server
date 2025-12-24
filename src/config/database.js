import pkg from 'pg';
import { env } from './env.js';

const { Pool } = pkg;

const pool = new Pool({
    connectionString: env.database.url,
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
});

pool.on('connect', () => {
  console.log('✅ Database connected successfully');
});

export default pool;