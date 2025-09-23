# Stage 1: Build React client
FROM node:20-alpine AS client
ENV PORT=8000

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps && npm cache clean --force

# Copy source code
COPY ./ ./

# Build React app
RUN npm run build

# Stage 2: Production server
FROM node:20-alpine AS server
ENV PORT=8000

WORKDIR /app

# Copy only server files
COPY --from=client /app/server ./server
COPY --from=client /app/build ./client/build

# Install server dependencies
WORKDIR /app/server
RUN npm install --legacy-peer-deps && npm cache clean --force

EXPOSE $PORT
CMD ["node", "index.js"]
