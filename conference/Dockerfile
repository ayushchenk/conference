FROM node:alpine as build
WORKDIR /usr/app/front
COPY . .
COPY .env.docker .env
RUN npm install
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /usr/app/front/dist /usr/share/nginx/html
COPY --from=build /usr/app/front/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]