# docker build -f client.Dockerfile -t client-app .
# docker run -itp 3000:3000 client-app

FROM node:alpine

WORKDIR /app
COPY package.json ./
COPY ./apps/common-components ./apps/common-components
COPY ./apps/client-catering-app ./apps/client-catering-app

WORKDIR /app
RUN yarn install

WORKDIR /app/apps/common-components
RUN yarn build

EXPOSE 3000

WORKDIR /app/apps/client-catering-app
ENTRYPOINT yarn start-production
