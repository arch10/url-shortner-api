FROM node:14.17-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN npm i -g yarn
RUN yarn install

COPY . .

CMD [ "yarn", "server.js" ]