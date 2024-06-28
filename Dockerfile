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