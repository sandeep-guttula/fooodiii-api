FROM node:18-alpine

WORKDIR /app

# Copy root-level package files
COPY package*.json ./

# Copy individual service package files
COPY user-service/package*.json ./user-service/
COPY restaurant-service/package*.json ./restaurant-service/
COPY delivery-service/package*.json ./delivery-service/

# ✅ Copy shared prisma schema BEFORE npm ci
COPY shared ./shared

# Install dependencies (this will run `postinstall` which includes prisma generate)
RUN npm ci

# Now copy the full source code (takes advantage of Docker cache)
COPY . .

# Build the application
RUN npm run build

# Expose service ports
EXPOSE 3001 3002 3003

# Default command
CMD ["npm", "start"]
