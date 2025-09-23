#Stage1 : Building client Image
FROM node:alpine3.12 AS client
ENV PORT=8000
#FROM node:16-alpine as client
WORKDIR /app
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY ./ ./
RUN ls
RUN npm run build
RUN ls
WORKDIR /app/server
RUN npm install && npm cache clean --force
RUN ls
EXPOSE $PORT
CMD ["node","index.js"]
