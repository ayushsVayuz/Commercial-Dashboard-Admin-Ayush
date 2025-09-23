FROM node:18 as client

WORKDIR /app

# Set environment variable for port (optional, helpful for app code)
ENV PORT=4000

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the client (if needed)
RUN npm run build

# Move to server directory
WORKDIR /app/server

# You can expose a default port here (just for documentation)
EXPOSE ${PORT}

# Start the app (this uses the ENV PORT)
CMD ["sh", "-c", "node index.js"]