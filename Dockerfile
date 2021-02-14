FROM node:10 AS builder
WORKDIR /app
COPY . /app
RUN yarn install && yarn run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
