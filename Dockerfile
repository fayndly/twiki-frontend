FROM node:19-alpine

WORKDIR /app

COPY dist .

RUN npm i --global serve

CMD [ "serve", "-p", "80", "-s" ]