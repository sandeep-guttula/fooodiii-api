# Food Delivery App Backend

A microservices-based backend for a food delivery application built with Node.js, TypeScript, Express.js, and PostgreSQL.

## 🏗️ Architecture

This application consists of three microservices:

1. **User Service** (Port 3001) - User authentication, orders, ratings
2. **Restaurant Service** (Port 3002) - Restaurant management, menu, order processing
3. **Delivery Agent Service** (Port 3003) - Delivery management, agent availability

## 🚀 Features

### User Service
- ✅ User registration and authentication
- ✅ Browse online restaurants
- ✅ Place orders from available restaurants
- ✅ View order history
- ✅ Rate restaurants and delivery agents

### Restaurant Service
- ✅ Restaurant registration and management
- ✅ Menu management (CRUD operations)
- ✅ Update restaurant status (online/offline)
- ✅ Accept/reject orders
- ✅ Auto-assign delivery agents
- ✅ View restaurant orders

### Delivery Agent Service
- ✅ Update delivery status
- ✅ Manage availability status
- ✅ View assigned orders
- ✅ View delivery history

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Validation**: express-validator
- **Password Hashing**: bcrypt

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- npm or yarn

## 🔧 Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd food-delivery-backend
```

### 2. Install dependencies for all services
```bash
# Install shared dependencies
cd shared/database && npm install

# Install user service dependencies
cd ../../user-service && npm install

# Install restaurant service dependencies
cd ../restaurant-service && npm install

# Install delivery service dependencies
cd ../delivery-service && npm install
```

### 3. Environment Setup

Create `.env` files in each service directory:

**shared/database/.env**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/food_delivery"
```

**user-service/.env**
```env
PORT=3001
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

**restaurant-service/.env**
```env
PORT=3002
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

**delivery-service/.env**
```env
PORT=3003
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

### 4. Database Setup

```bash
cd shared/database
npx prisma generate
npx prisma db push
```

### 5. Start the services

Open 3 terminal windows and run:

**Terminal 1 - User Service:**
```bash
cd user-service
npm run dev
```

**Terminal 2 - Restaurant Service:**
```bash
cd restaurant-service
npm run dev
```

**Terminal 3 - Delivery Service:**
```bash
cd delivery-service
npm run dev
```

## 📖 API Documentation

### User Service (Port 3001)

#### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - User login

#### Restaurants
- `GET /api/restaurants` - Get all online restaurants

#### Orders
- `POST /api/orders` - Place a new order
- `GET /api/orders` - Get user's order history

#### Ratings
- `POST /api/ratings` - Add rating for restaurant/delivery agent

### Restaurant Service (Port 3002)

#### Restaurant Management
- `POST /api/restaurants` - Add new restaurant
- `GET /api/restaurants/my-restaurants` - Get owner's restaurants
- `PUT /api/restaurants/:id/status` - Update restaurant status

#### Menu Management
- `POST /api/menu` - Add menu item
- `PUT /api/menu/:id` - Update menu item
- `DELETE /api/menu/:id` - Delete menu item
- `GET /api/menu/restaurant/:restaurantId` - Get restaurant menu

#### Order Management
- `GET /api/orders` - Get restaurant orders
- `PUT /api/orders/:orderId/status` - Update order status

### Delivery Service (Port 3003)

#### Order Management
- `GET /api/delivery/orders` - Get assigned orders
- `PUT /api/delivery/orders/:orderId/status` - Update delivery status
- `GET /api/delivery/history` - Get delivery history

#### Availability
- `PUT /api/delivery/availability` - Update agent availability

## 🔐 Authentication

All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## 👥 User Roles

- `user` - Can place orders and rate
- `restaurant_owner` - Can manage restaurants and orders
- `delivery_agent` - Can manage deliveries
- `admin` - Full access (future implementation)

## 📊 Database Schema

### Key Models:
- **User** - User accounts with roles
- **Restaurant** - Restaurant information
- **MenuItem** - Menu items for restaurants
- **Order** - Customer orders
- **OrderItem** - Individual items in orders
- **DeliveryStatusUpdate** - Delivery status tracking
- **DeliveryAgentAvailability** - Agent availability status
- **Rating** - User ratings for restaurants/agents

## 🔄 Order Flow

1. User places order → Order created with status 'placed'
2. Restaurant accepts order → Status changes to 'accepted'
3. System auto-assigns available delivery agent
4. Restaurant prepares order → Status changes to 'preparing'
5. Agent picks up order → Status changes to 'out_for_delivery'
6. Agent delivers order → Status changes to 'delivered'
7. Agent becomes available again

## ✅ Input Validation

All API endpoints include comprehensive input validation:
- Email format validation
- Password strength requirements
- UUID format validation
- Required field validation
- Data type validation
- Range validation for ratings and quantities

## 🚀 Deployment

### Using Docker (Recommended)

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:13
    environment:
      POSTGRES_DB: food_delivery
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  user-service:
    build: ./user-service
    ports:
      - "3001:3001"
    depends_on:
      - postgres
    environment:
      DATABASE_URL: postgresql://postgres:password@postgres:5432/food_delivery

  restaurant-service:
    build: ./restaurant-service
    ports:
      - "3002:3002"
    depends_on:
      - postgres

  delivery-service:
    build: ./delivery-service
    ports:
      - "3003:3003"
    depends_on:
      - postgres

volumes:
  postgres_data:
```

### Heroku Deployment

1. Create separate Heroku apps for each service
2. Add PostgreSQL add-on
3. Set environment variables
4. Deploy each service

## 🧪 Testing

Use the provided Postman collection for testing all endpoints. The collection includes:
- Pre-request scripts for authentication
- Environment variables for different stages
- Comprehensive test cases for all endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues, please create an issue in the GitHub repository.

---

**Note**: This backend fully implements all requirements from the Food Delivery App assignment, including comprehensive input validation, proper error handling, and microservices architecture.