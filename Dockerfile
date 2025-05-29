FROM node:18

WORKDIR /app

# Install dependencies first for caching
COPY package*.json ./
COPY user-service/package*.json ./user-service/
COPY restaurant-service/package*.json ./restaurant-service/
COPY delivery-service/package*.json ./delivery-service/
COPY shared ./shared

# Install root dependencies
RUN npm ci

# Install service dependencies
RUN cd user-service && npm ci
RUN cd restaurant-service && npm ci
RUN cd delivery-service && npm ci

# Copy source code
COPY . .

# Generate Prisma clients
RUN cd user-service && npm run prisma:generate
RUN cd restaurant-service && npm run prisma:generate
RUN cd delivery-service && npm run prisma:generate

# Build TypeScript
RUN cd user-service && npm run build
RUN cd restaurant-service && npm run build
RUN cd delivery-service && npm run build

# Expose ports
EXPOSE 3001 3002 3003

# Final command
CMD ["sh", "-c", "npm run prisma:generate && npm start"]
