FROM node:20-alpine

WORKDIR /app

# Install root deps
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source
COPY . .

# Build frontend
RUN npm run build

# Install server deps
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install --legacy-peer-deps

# Back to app root
WORKDIR /app

# Vercel sets PORT automatically
EXPOSE 3000

CMD ["node", "server/index.js"]
