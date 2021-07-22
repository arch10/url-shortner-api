FROM node:14.17-alpine

ENV NODE_ENV=production
ENV PORT=80
ENV CONTEXT_PATH=/api/v1

EXPOSE 80/tcp

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install

COPY . .

CMD [ "node", "src/app.js" ]