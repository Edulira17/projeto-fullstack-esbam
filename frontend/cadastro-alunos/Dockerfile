FROM node:22-slim

WORKDIR /app

COPY package*.json ./
COPY vite.config.ts ./
COPY tsconfig*.json ./
COPY ./public ./public
COPY ./src ./src

RUN npm install

EXPOSE 5173

CMD [ "npm", "run", "dev" ]

