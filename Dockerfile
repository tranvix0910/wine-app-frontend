FROM node:lts AS development
# Build App
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
ENV CI=true
ENV PORT=3000
CMD [ "npm", "start" ]
FROM development AS build
RUN npm start

# 2. For Nginx setup
FROM nginx:alpine
# Copy config nginx
COPY --from=build .nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=build /app/build .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]