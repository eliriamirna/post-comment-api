# API Backend - Sistema de Postagens e Comentários

Este projeto implementa a API para um sistema de postagens e comentários, com funcionalidades de autenticação e autorização de usuários. A API permite que os usuários realizem operações CRUD (Criar, Ler, Atualizar e Excluir) para postagens e comentários. Além disso, as postagens incluem a capacidade de adicionar imagens, contadores de comentários.

## Funcionalidades

- **Cadastro e Autenticação de Usuários**: 
  - Permite o cadastro de usuários e autenticação via **JWT**.
  - Os usuários podem editar seu perfil após o login.
  
- **CRUD de Postagens**: 
  - Criação, leitura, atualização e exclusão de postagens.
  - Apenas o criador da postagem pode editá-la ou excluí-la.
  - As postagens incluem:
    - Adição de imagens.

- **CRUD de Comentários**: 
  - Criação, leitura, atualização e exclusão de comentários.
  - Somente o criador do comentário ou o criador da postagem pode excluí-lo.

- **Relatório de Postagens**:
  - Geração de relatório com dados como:
    - Título da postagem.
    - Quantidade de comentários.

## Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **PostgreSQL** (como banco de dados)
- **JWT** (para autenticação de usuários)
- **TypeScript** (para tipagem estática)
- **Multer** (para upload de imagens)

## Instalação

### Pré-requisitos

- Node.js v16+
- PostgreSQL
- Docker e Docker Compose (opcional, mas recomendado)

### Passos para Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/eliriamirna/post-comment-api
   cd post-comment-api
   ```

2. Instale as dependências do projeto:

    ```bash
    npm install
    ```

3. Crie um arquivo .env na raiz do projeto e configure as variáveis de ambiente:

    ```
    PORTA=5000
PG_USER=postgres
PG_PASSWORD=postgres
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=posts_comment_db

JWT_SECRET=9f3b8b8a56970c9c2e5bdf9c8f4a5e7f77f34d6e3bd9a733cb9fef3b7e89f622f52e1db9ebec0b3c8f9e3a9c96f0323a0567bfaad5a93e4b9277be287b7e1bcd
    ```

4. Execute o Docker Compose para iniciar o banco de dados:

    ```bash
        docker-compose up -d
    ```

5. Rode o servidor em modo de desenvolvimento:

    ```bash
    npm run dev
    ```

6. Para compilar o projeto e rodar em produção:

    ```bash
    npm run build
    npm start
    ```

## Banco de dados
 
Se você estiver utilizando o PostgreSQL diretamente, crie as entidades com os comando CREATE TABLE que se encontra no arquivo comandos.sql

## Uso
 
A API possui os seguintes endpoints:

- POST ```/users``` - Cria um novo user.
- POST ```/login``` - Login do user no sistema com autenticação.
- POST ```/posts``` - Cria um novo post.
- POST ```/comments``` - Cria um novo comment.
- POST ```/upload``` - Adiciona um arquivo a um post pelo id. 
- GET ```/users``` - Retorna todos os users cadastrados.
- GET ```/users/:id``` - Retorna todos os dados de um user pelo id.
- GET ```/comments``` - Retorna todos os comments cadastrados.
- GET ```/comments/:id``` - Retorna todos os dados de um comment pelo id.
- GET ```/posts``` - Retorna todos os posts cadastrados.
- GET ```/posts/:id``` - Retorna todos os dados de um post pelo id.
- GET ```/posts-report``` - Retorna todos os post com titulo e quantidade de comentarios.
- PUT ```/users/:id``` - Atualiza um user existente.
- PUT ```/posts/:id``` - Atualiza um post existente.
- PUT ```/comments/:id``` - Atualiza um comment existente.
- DELETE ```/users/:id``` - Deleta um user existente.
- DELETE ```/posts/:id``` - Deleta um post existente.
- DELETE ```/comments/:id``` - Deleta um comment existente. 

Exemplo de Requisição para Criação de Cliente

```
POST /users
Content-Type: application/json
{
  "name": "eliria",
  "email": "eliria@mail.com",
  "password": "123"
}
```

```
POST /posts
Content-Type: application/json
{
  "user_id": 4,
  "title": "titulo5",
  "description": "texto5"
}
```

```
POST /posts
Content-Type: application/json
{
  "user_id": 4,
  "title": "titulo5",
  "description": "texto5"
}
```

```
POST /comments
Content-Type: application/json
{
  "user_id": 2,
  "post_id": 2,
  "description": "comentario"
}
```

```
POST /posts/1/upload
Content-Type: multipart/form-data
{
  "file": "<Arquivo PDF>",
  "post_id": 1
}
```

```
POST /auth/login
Content-Type: application/json
{
  "email": "bruno@mail.com",
  "password": "123"
}

```
