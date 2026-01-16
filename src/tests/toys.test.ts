import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import pool from '../config/database.js';

describe('Rotas de Brinquedos (Toys)', () => {

    // Variáveis globais para compartilhar dados entre os testes
    let mainUserToken: string;
    let adminToken: string;
    let mainUserToyId: number;

    beforeAll(async () => {
        // 1. Criar o Usuário Comum (Dono do brinquedo)
        const mainUser = { name: "Dono", email: "dono@toys.com", password: "123" };
        await request(app).post('/users').send(mainUser);

        const loginMain = await request(app).post('/auth/login').send({
            email: mainUser.email, password: mainUser.password
        });
        mainUserToken = loginMain.body.token;

        // 2. Criar o Administrador
        const adminUser = { name: "Sr. Admin", email: "admin@toys.com", password: "123" };
        await request(app).post('/users').send(adminUser);

        // Atualiza o role direto no banco
        await pool.query("UPDATE users SET role = 'admin' WHERE email = $1", [adminUser.email]);

        const loginAdmin = await request(app).post('/auth/login').send({
            email: adminUser.email, password: adminUser.password
        });
        adminToken = loginAdmin.body.token;
    });

    describe('1. Criação e Aprovação', () => {
        it('NÃO deve permitir cadastrar brinquedo sem estar logado', async () => {
            const response = await request(app).post('/toys').send({});
            expect(response.status).toBe(401);
        });

        it('Não deve permitir criar brinquedo sem título (Validação de Dados)', async () => {
            // Objeto incompleto (sem título)
            const brinquedoInvalido = {
                description: "Boneco sem nome",
                category: "Bonecos",
                condition: "new"
            };

            const response = await request(app)
                .post('/toys')
                .set('Authorization', `Bearer ${mainUserToken}`)
                .send(brinquedoInvalido);

            expect(response.status).toBe(400);
        });

        it('Deve cadastrar um brinquedo com sucesso', async () => {
            const novoBrinquedo = {
                title: "Buzz Lightyear",
                description: "Ao infinito e além",
                category: "Bonecos",
                condition: "used",
                images: ["http://foto.jpg"]
            };

            const response = await request(app)
                .post('/toys')
                .set('Authorization', `Bearer ${mainUserToken}`)
                .send(novoBrinquedo);

            expect(response.status).toBe(201);
            // Salva o ID para usar nos próximos testes
            mainUserToyId = response.body.id;
        });

        it('Visitantes devem ver lista vazia se os brinquedos ainda estiverem pendentes', async () => {
            const response = await request(app).get('/toys');
            expect(response.body.length).toBe(0);
        });

        it('SEGURANÇA: Usuário comum NÃO deve conseguir aprovar brinquedos', async () => {
            const response = await request(app)
                .patch(`/toys/${mainUserToyId}/approve`)
                .set('Authorization', `Bearer ${mainUserToken}`);

            expect(response.status).toBe(403);
        });

        it('Admin deve ser capaz de aprovar o brinquedo', async () => {
            const response = await request(app)
                .patch(`/toys/${mainUserToyId}/approve`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('available');

            // Se o admin conseguiu aprovar o brinquedo, ele deve aparecer na lista pública
            const listaPublica = await request(app).get('/toys');
            expect(listaPublica.body.length).toBe(1);
        });
    });

    describe('2. Leitura e Detalhes', () => {
        it('Qualquer um deve conseguir ver os detalhes de um brinquedo aprovado', async () => {
            const response = await request(app).get(`/toys/${mainUserToyId}`);
            expect(response.status).toBe(200);
            expect(response.body.title).toBe('Buzz Lightyear');
            expect(response.body).toHaveProperty('id');
        });

        it('Deve retornar erro 404 ao buscar um brinquedo que não existe', async () => {
            const idInexistente = 99999;
            const response = await request(app).get(`/toys/${idInexistente}`);
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('message');
        });
    });

    describe('3. Segurança e Isolamento', () => {
        it('Deve listar APENAS os meus brinquedos (Isolamento de dados)', async () => {
            // Cria um usuário secundário (Vizinho) para testar colisão de dados
            const secondaryUser = { name: "Vizinho", email: "vizinho@teste.com", password: "123" };
            await request(app).post('/users').send(secondaryUser);

            const loginSecond = await request(app).post('/auth/login').send(secondaryUser);
            const secondaryToken = loginSecond.body.token;

            // Vizinho cria um brinquedo dele
            await request(app).post('/toys')
                .set('Authorization', `Bearer ${secondaryToken}`)
                .send({ title: "Bola Quadrada", description: "...", category: "X", condition: "new", images: [] });

            // Busca os brinquedos do usuário principal (Main)
            const response = await request(app)
                .get('/toys/my-toys')
                .set('Authorization', `Bearer ${mainUserToken}`);

            expect(response.status).toBe(200);

            // O array deve conter o Buzz, mas NÃO deve conter a Bola Quadrada
            expect(response.body.find((t: any) => t.title === "Buzz Lightyear")).toBeDefined();
            expect(response.body.find((t: any) => t.title === "Bola Quadrada")).toBeUndefined();
        });
    });

});