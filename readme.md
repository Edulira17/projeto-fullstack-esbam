📋🎓 Sistema de Cadastro de Alunos
📝 Descrição
Esta é uma aplicação web fullstack para gerenciamento de alunos, desenvolvida com:

⚛️ React + Vite no frontend para uma experiência moderna e responsiva.

🚀 Node.js + Express no backend para criação de APIs RESTful.

🗃️ SQLite como banco de dados local simples e eficiente.

🐳 Docker + Docker Compose para facilitar o ambiente de desenvolvimento.

Funcionalidades
➕ Cadastro de alunos com nome, email e curso

📖 Visualização de todos os alunos cadastrados

🗑️ Remoção de alunos

💻 Execução Local (sem Docker)
Se preferir executar manualmente sem Docker, siga os passos:

1. Clone o repositório
bash
Copiar
Editar
git clone https://github.com/Edulira17/projeto-fullstack-esbam
cd fullstack-app
2. Instale as dependências do backend
bash
Copiar
Editar
cd backend
npm install
3. Instale as dependências do frontend
bash
Copiar
Editar
cd ../frontend/cadastro-alunos
npm install
4. Execute os servidores (em terminais separados)
Backend:

bash
Copiar
Editar
npm run dev
Frontend:

bash
Copiar
Editar
npm run dev
🐳 Execução com Docker (Recomendado)
A forma mais prática de executar o projeto é com Docker Compose.

Pré-requisitos
Docker

Docker Compose

Passo a passo
Navegue até a raiz do projeto:

bash
Copiar
Editar
cd /caminho/para/fullstack-app
Construa e inicie os containers:

bash
Copiar
Editar
docker-compose up --build
Esse comando irá:

Criar e subir o backend (backend-app) na porta 3001

Criar e subir o frontend (frontend-app) na porta 5173

Criar um volume sqlite_data para persistência do banco de dados SQLite

🌐 Acesso à Aplicação
Após subir os containers, acesse:

🔌 Backend: http://localhost:3001

🌍 Frontend: http://localhost:5173

Abra seu navegador e visite http://localhost:5173 para começar a usar! 🎉

🛠️ Tecnologias
Frontend: React, Vite, TypeScript

Backend: Node.js, Express

Banco de Dados: SQLite

Containerização: Docker, Docker Compose

