import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('Fluxo de Autenticação (Auth)', () => {

    const validUser = {
        name: "Tony Anderson",
        email: "tony@email.com",
        password: "123"
    };

    // Setup: Cria o usuário no banco para ser usado nos testes
    beforeAll(async () => {
        const response = await request(app).post('/users').send(validUser);

        // Sanity check: Se falhar a criação, os testes de login não fazem sentido
        expect(response.status).toBe(201);
    });

    it('Deve impedir login com senha errada', async () => {
        const response = await request(app).post('/auth/login').send({
            email: validUser.email,
            password: "senha_incorreta"
        });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid credentials');
    });

    it('Deve realizar login com sucesso e retornar um Token', async () => {
        const response = await request(app).post('/auth/login').send({
            email: validUser.email,
            password: validUser.password
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');

        // Garante que a senha não está sendo devolvida no payload
        expect(response.body.user).not.toHaveProperty('password');
    });

});