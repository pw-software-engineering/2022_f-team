# docker build -f deliverer.Dockerfile -t deliverer-app .
# docker run -itp 3000:80 deliverer-app

# download base image
FROM node:alpine as build

# copy common-components and deliverer-app
COPY package.json ./
COPY ./apps/common-components ./apps/common-components
COPY ./apps/deliverer-catering-app ./apps/deliverer-catering-app

# install in root dir
RUN yarn install

# build cc
WORKDIR /apps/common-components
RUN yarn build-production

# build deliverer
WORKDIR /apps/deliverer-catering-app
RUN yarn build-production

# configure nginx
FROM nginx:latest
WORKDIR /
COPY --from=build /apps/deliverer-catering-app/build /usr/share/nginx/html

# needed this to make React Router work properly 
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Expose port and start nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
