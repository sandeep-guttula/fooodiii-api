FROM node:20-alpine

WORKDIR /app

# Copy package files from user-service
COPY user-service/package*.json ./

# Copy Prisma schema files (needed for postinstall script)
COPY user-service/prisma ./prisma/

# Install ALL dependencies including devDependencies (needed for TypeScript build)
RUN npm ci

# Copy user-service source code
COPY user-service/ .

# Build the application
RUN npm run build

# Remove devDependencies to reduce image size
RUN npm prune --omit=dev

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "dist/src/server.js"]