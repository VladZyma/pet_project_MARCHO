FROM node:18-alpine

MAINTAINER Vlad

RUN mkdir /app
WORKDIR /app

COPY ./backend/package.json /app

RUN npm i --production