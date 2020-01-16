FROM node:12-alpine

WORKDIR /usr/app

COPY . .
RUN yarn install --frozen-lockfile
