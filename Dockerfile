FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY user-service/package*.json ./user-service/
COPY restaurant-service/package*.json ./restaurant-service/
COPY delivery-service/package*.json ./delivery-service/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose ports
EXPOSE 3001 3002 3003

# Start the application
CMD ["npm", "start"]