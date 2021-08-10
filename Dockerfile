FROM node:13-alpine as build
WORKDIR /app

COPY package*.json /app/

RUN npm install -g @angular/cli
RUN npm install

COPY ./ /app/

RUN npm run build:prod
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/osciloscopio /usr/share/nginx/html/