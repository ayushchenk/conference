FROM node:alpine as build
ARG VITE_USER_API_URL
ARG VITE_CONFERENCE_API_URL
ARG VITE_SUBMISSION_API_URL
WORKDIR /usr/app/front
COPY . .
RUN rm .env
RUN echo "VITE_USER_API_URL=${VITE_USER_API_URL}" >> .env
RUN echo "VITE_CONFERENCE_API_URL=${VITE_CONFERENCE_API_URL}" >> .env
RUN echo "VITE_SUBMISSION_API_URL=${VITE_SUBMISSION_API_URL}" >> .env
RUN npm install
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /usr/app/front/dist /usr/share/nginx/html
COPY --from=build /usr/app/front/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]