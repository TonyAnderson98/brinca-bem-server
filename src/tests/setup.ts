import { beforeAll, afterAll } from 'vitest';
import pool from '../config/database.js';
import fs from 'fs';
import path from 'path';

// Pega o caminho do seu schema.sql
const schemaPath = path.resolve(__dirname, '../database/schema.sql');
const schemaSql = fs.readFileSync(schemaPath, 'utf-8');

beforeAll(async () => {
    // Conecta no banco de teste, apaga tudo e roda o schema
    await pool.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
    await pool.query(schemaSql);
});

afterAll(async () => {
    await pool.end();
});