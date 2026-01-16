import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import pool from '../config/database.js';

describe('Rotas de Usuários (Users)', () => {

    it('Deve criar um usuário com sucesso e persistir no banco', async () => {
        const newUser = {
            name: "Tony",
            email: "tony@email.com",
            password: "123"
        };

        const response = await request(app)
            .post('/users')
            .send(newUser);

        expect(response.status).toBe(201);
        expect(response.body.email).toBe(newUser.email);

        // Segurança: senha nunca deve retornar no body
        expect(response.body).not.toHaveProperty('password');

        // Validação direta no banco (Sanity Check)
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [newUser.email]);

        expect(rows.length).toBe(1);
        expect(rows[0].name).toBe(newUser.name);
    });

    it('Não deve permitir cadastro com email duplicado', async () => {
        const duplicateUser = {
            name: "Clone do Tony",
            email: "clone@teste.com",
            password: "123"
        };

        // 1. Primeira criação (Sucesso)
        await request(app).post('/users').send(duplicateUser);

        // 2. Tentativa de duplicação (Deve falhar)
        const response = await request(app)
            .post('/users')
            .send(duplicateUser);

        expect(response.status).toBe(409);
        expect(response.body.message).toBe('User already exists');
    });

});