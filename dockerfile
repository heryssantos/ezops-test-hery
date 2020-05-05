FROM node:10-slim AS node-image
WORKDIR /home/node/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD [ "node", "server.js" ]