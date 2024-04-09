# Projeto Next.js

Este é um projeto [Next.js](https://nextjs.org/) iniciado com [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Como Começar

Para iniciar, siga os passos abaixo:

1. **Crie um arquivo .env:** Faça uma cópia do arquivo `.env.example` e renomeie-a para `.env`, preenchendo com as informações necessárias.

2. **Instale as Dependências:** Execute o comando abaixo para instalar todas as dependências necessárias:

```
npm install
```

3. **Crie a Instância do Banco de Dados:** Execute o comando abaixo para criar a instância do banco de dados usando Docker:

```
docker-compose up
```

4. **Rode as Migrações do Prisma:** Execute o comando abaixo para rodar as migrações do Prisma e sincronizar o banco de dados:

```
npx prisma migrate dev
```

5. **Inicialize a Aplicação:** Por fim, execute o comando abaixo para inicializar a aplicação:

```
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para visualizar o resultado.
