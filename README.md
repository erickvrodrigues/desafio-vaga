# API de Pedidos (Desafio)

Esta é uma API REST desenvolvida em **Node.js** com **Express** e banco de dados **PostgreSQL**, voltada para o gerenciamento de pedidos (Orders) e seus respectivos itens, bem como autenticação simples com JWT.

##  Tecnologias Utilizadas

- **Node.js**
- **Express**
- **PostgreSQL** (com pacote `pg`)
- **JWT** (JSON Web Token)
- **Bcrypt** (para hash de senhas)

##  Pré-requisitos

Para rodar este projeto, você precisará ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 14+ recomendada)
- [PostgreSQL](https://www.postgresql.org/)

##  Configuração do Banco de Dados

1. Certifique-se de que o **PostgreSQL** está rodando localmente na porta `5432`.
2. Crie um banco de dados chamado `orders`.
3. As credenciais padrão configuradas no projeto (`src/config/db.js`) são:
   - **User:** `postgres`
   - **Password:** `123456`
   - **Database:** `orders`
   - *(Se o seu usuário ou senha forem diferentes, altere no arquivo `src/config/db.js`)*

4. **Criação das Tabelas:**
   Execute o seguinte script SQL no seu banco de dados `orders` para criar as tabelas necessárias:

   ```sql
   CREATE TABLE "Order" (
       "orderId" VARCHAR(255) PRIMARY KEY,
       "value" NUMERIC NOT NULL,
       "creationDate" TIMESTAMP NOT NULL
   );

   CREATE TABLE "Items" (
       "id" SERIAL PRIMARY KEY,
       "orderId" VARCHAR(255) REFERENCES "Order"("orderId") ON DELETE CASCADE,
       "productId" VARCHAR(255) NOT NULL,
       "quantity" INTEGER NOT NULL,
       "price" NUMERIC NOT NULL
   );
   ```
   *(Nota: O nome da tabela `"Order"` e coluna `"orderId"` deve estar entre aspas duplas pois "order" é uma palavra reservada no SQL).*

##  Instalação

1. Clone o repositório ou baixe os arquivos (se aplicável).
2. Abra o terminal na raiz do projeto (onde está o arquivo `package.json`).
3. Instale as dependências executando:

```bash
npm install
```

##  Como Executar

Você pode iniciar o projeto de duas maneiras:

**Modo de Desenvolvimento (com Nodemon - recarrega automaticamente ao salvar):**
```bash
npm run dev
```

**Modo de Produção:**
```bash
npm start
```

A API estará rodando em: `http://localhost:3000`

##  Autenticação (Login)

Para usar as rotas de pedidos, você precisa fazer login e obter um **Token JWT**.
O sistema possui um usuário fixo de teste configurado:

- **Username:** `admin`
- **Password:** `admin123`

Faça uma requisição `POST` para `http://localhost:3000/login` com o seguinte corpo (JSON):

```json
{
  "username": "admin",
  "password": "admin123"
}
```

A resposta retornará um `token`. Você deve enviar este token no Header (Cabeçalho) das demais requisições no formato:
`Authorization: Bearer SEU_TOKEN_AQUI`

##  Estrutura do Projeto

- `src/router/`: Definição das rotas da API.
- `src/controller/`: Recebe as requisições e envia as respostas.
- `src/service/`: Lógica de negócio e validações.
- `src/repository/`: Comunicação direta com o banco de dados (SQL).
- `src/config/`: Configurações de banco de dados e JWT.
- `src/middleware/`: Middlewares de autenticação e tratamento global de erros.
- `src/model/`: Classes e estruturas de dados.


##  A collection com os exemplos de requisições se encontra no arquivo desafio-vaga.postman_collection.json. 
## deve ser usado no postman
