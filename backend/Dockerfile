FROM node:18.19-alpine3.18

WORKDIR /var/www/service/backend

COPY . .

RUN apk add yarn
RUN yarn install

CMD yarn run start
