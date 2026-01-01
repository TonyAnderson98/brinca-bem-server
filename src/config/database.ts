import { Pool } from 'pg';
import { env } from './env.js';



const pool = new Pool({
    connectionString: env.database.url,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.on('connect', () => {
  console.log('✅ Database connected successfully');
});

export default pool;