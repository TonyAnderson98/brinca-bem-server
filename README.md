# 🧸 Brinca Bem - Server

Backend da aplicação **Brinca Bem**, um marketplace focado na doação de brinquedos. O objetivo é conectar doadores a pessoas interessadas, gerenciando o ciclo de vida dos anúncios através de moderação e regras de negócio claras.

## 📋 Sobre o Projeto

O sistema permite que usuários se cadastrem, publiquem brinquedos para doação e gerenciem o status desses itens. Há um sistema de moderação onde administradores aprovam anúncios antes que eles fiquem visíveis publicamente.

### Tecnologias Utilizadas

*   **Runtime:** Node.js
*   **Framework:** Express
*   **Database:** PostgreSQL (Driver `pg`) hospedado no Neon Tech
*   **Autenticação:** JWT (JsonWebToken)
*   **Criptografia:** Bcrypt
*   **Arquitetura:** Camadas (`Controller`, `Service`, `Repository`) inspirada em `Clean Architecture`.

---

## 🚀 Como Executar

### Pré-requisitos
*   Node.js (v18+)
*   PostgreSQL

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/brinca-bem-server.git
    cd brinca-bem-server
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz baseado no exemplo abaixo:

    ```env
    PORT=3333
    DATABASE_URL=postgresql://user:pass@host:5432/database
    JWT_SECRET=sua_chave_secreta_aqui
    ```

4.  **Configure o Banco de Dados:**
    Execute o script SQL localizado em `src/database/schema.sql` no seu banco de dados para criar as tabelas necessárias.

5.  **Inicie o Servidor:**
    ```bash
    npm start
    ```

O servidor estará rodando em `http://localhost:3333`.

---

## 🏛 Arquitetura

O projeto segue uma arquitetura em camadas para garantir a separação de responsabilidades:

1.  **Routes:** Define os endpoints e aplica middlewares.
2.  **Controllers:** Lida com a requisição HTTP, validação básica de entrada e respostas.
3.  **Services:** Contém toda a regra de negócio (validações lógicas, regras de doação, hash de senha).
4.  **Repositories:** Responsável única e exclusivamente por comunicar com o banco de dados (SQL).

---

## 🧪 Status do Projeto

*   [x] Configuração inicial e conexão com Banco
*   [x] Autenticação (Login/JWT)
*   [x] Cadastro de Usuários (Hash senha)
*   [ ] CRUD de Brinquedos (Toys)
*   [ ] Moderação de Anúncios (Admin)