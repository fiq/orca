FROM node:23 AS builder
RUN mkdir -p /build
WORKDIR /build
COPY . /build
RUN npm i
RUN npm run build

FROM nginx:1.27.3
COPY --from=builder /build/public /usr/share/nginx/html

