FROM node:17-alpine

WORKDIR /app

COPY package.json .

RUN npm install --force

COPY . .

EXPOSE 9000

CMD ["npm", "start"]