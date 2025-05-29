FROM node:20-alpine

# Build argument to specify which service to build
ARG SERVICE_NAME=user-service
ARG SERVICE_PORT=3001

WORKDIR /app

# Copy package files from specified service
COPY ${SERVICE_NAME}/package*.json ./

# Copy Prisma schema files (needed for postinstall script)
COPY ${SERVICE_NAME}/prisma ./prisma/

# Install ALL dependencies including devDependencies (needed for TypeScript build)
RUN npm ci

# Copy service source code
COPY ${SERVICE_NAME}/ .

# Build the application
RUN npm run build

# Remove devDependencies to reduce image size (keep only production dependencies)
RUN npm prune --omit=dev

# Expose port
EXPOSE ${SERVICE_PORT}

# Start the application
CMD ["node", "dist/src/server.js"]