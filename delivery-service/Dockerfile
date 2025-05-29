FROM node:20-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Copy Prisma schema files (needed for postinstall script)
COPY prisma ./prisma/

# Install dependencies (this will run prisma:generate via postinstall)
RUN npm ci --omit=dev

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port (adjust per service: 3001, 3002, 3003)
EXPOSE 3001

# Start the application
CMD ["node", "dist/src/server.js"]