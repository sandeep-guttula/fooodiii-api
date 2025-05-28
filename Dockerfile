FROM node:18-alpine

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
COPY user-service/package*.json ./user-service/
COPY restaurant-service/package*.json ./restaurant-service/
COPY delivery-service/package*.json ./delivery-service/

# Copy shared directory (needed for Prisma schema)
COPY shared ./shared

# Install root dependencies
RUN npm ci

# Install service dependencies
RUN cd user-service && npm ci
RUN cd restaurant-service && npm ci  
RUN cd delivery-service && npm ci

# Copy source code
COPY . .

# Generate Prisma client first
RUN npm run prisma:generate

# Build all services
RUN npm run build

# Expose ports
EXPOSE 3001 3002 3003

# Start command
CMD ["npm", "start"]