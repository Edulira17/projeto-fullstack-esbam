FROM node:22-slim

WORKDIR /app

COPY package*.json ./
COPY ./src ./src
COPY bancodedados.db ./

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]

