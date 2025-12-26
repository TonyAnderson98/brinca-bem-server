# 📚 Documentação da API

## Autenticação e Permissões

A API utiliza **Bearer Token**. Para rotas protegidas, envie o header:
`Authorization: Bearer <token_jwt>`

*   **Público:** Acesso livre.
*   **Autenticado:** Requer token válido.
*   **Admin:** Requer token válido de um usuário com `role: 'admin'`.

---

## 👤 Auth & Usuários

### 1. Registrar Usuário
Cria uma nova conta de usuário.

*   **Rota:** `POST /users`
*   **Permissão:** Público
*   **Body:**
    ```json
    {
      "name": "Fulano da Silva",
      "email": "fulano@email.com",
      "password": "senha"
    }
    ```
*   **Resposta (201 Created):**
    ```json
    {
      "id": 1,
      "name": "Fulano da Silva",
      "email": "fulano@email.com",
      "role": "user"
    }
    ```

### 2. Login
Autentica o usuário e retorna o token.

*   **Rota:** `POST /auth/login`
*   **Permissão:** Público
*   **Body:**
    ```json
    {
      "email": "fulano@email.com",
      "password": "senha"
    }
    ```
*   **Resposta (200 OK):**
    ```json
    {
      "token": "eyJhbGciOiJIUzI1Ni...",
      "user": { ... }
    }
    ```

### 3. Listar Usuários (Admin)
Lista todos os usuários cadastrados.

*   **Rota:** `GET /users`
*   **Permissão:** Admin

---

## 🧸 Brinquedos (Toys) - *Escopo Planejado*

### 1. Criar Anúncio
Cria um novo brinquedo. O status inicial será sempre `pending` (em análise).

*   **Rota:** `POST /toys`
*   **Permissão:** Autenticado
*   **Body:**
    ```json
    {
      "title": "Bola de Futebol",
      "description": "Bola pouco usada, acabamento texturizado.",
      "category": "Esportes",
      "condition": "used",  // 'new' ou 'used'
      "image_url": "https://imgbb.com/..."
    }
    ```

### 2. Listar Brinquedos
Lista brinquedos disponíveis para doação.

*   **Rota:** `GET /toys`
*   **Permissão:** Público
*   **Filtros (Query Params):** `?category=Bonecas&status=available`

### 3. Detalhes do Brinquedo
*   **Rota:** `GET /toys/:id`
*   **Permissão:** Público

### 4. Atualizar Brinquedo
Permitido apenas ao dono ou Admin. Só pode editar se status for `available` ou `pending`.

*   **Rota:** `PUT /toys/:id`
*   **Permissão:** Autenticado (Dono/Admin)

### 5. Alterar Status (Moderação/Fluxo)
*   **Rota:** `PATCH /toys/:id/status`
*   **Permissão:** 
    *   `pending` -> `available` (Apenas Admin)
    *   `available` -> `reserved`/`donated` (Dono ou Admin)
*   **Body:**
    ```json
    { "status": "available" }
    ```

### 6. Remover Brinquedo
*   **Rota:** `DELETE /toys/:id`
*   **Permissão:** Autenticado (Dono/Admin). Não permitido se status for `donated`.