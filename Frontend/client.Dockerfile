# docker build -f client.Dockerfile -t client-app .
# docker run -itp 3000:3000 client-app

FROM node:alpine as build

WORKDIR /app
COPY package.json ./
COPY ./apps/common-components ./apps/common-components
COPY ./apps/client-catering-app ./apps/client-catering-app

WORKDIR /app
RUN yarn install

WORKDIR /app/apps/common-components
RUN yarn build

FROM nginx:latest

COPY --from=build /usr/local/app/dist/frontend /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# WORKDIR /app/apps/client-catering-app
# ENTRYPOINT yarn start
