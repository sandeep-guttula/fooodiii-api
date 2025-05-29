# Food Delivery System

A comprehensive microservices-based food delivery platform built with Node.js, TypeScript, Express, and Prisma.

## Architecture Overview

The system consists of three main microservices:

- **User Service** (Port 3001) - Authentication, user management, ordering, and ratings
- **Restaurant Service** (Port 3002) - Restaurant management, menu items, and order processing
- **Delivery Service** (Port 3003) - Delivery agent management and order tracking

## Tech Stack

- **Backend**: Node.js, TypeScript, Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens
- **Password Hashing**: bcrypt

## Database Schema
![Architecture Diagram](./fooodiii_data_model.png)

The system uses a shared database schema across all services with the following main entities:

- **User** - Supports multiple roles (user, restaurant_owner, delivery_agent, admin)
- **Restaurant** - Restaurant information and ownership
- **MenuItem** - Menu items for each restaurant
- **Order** - Order management with status tracking
- **OrderItem** - Individual items in an order
- **DeliveryStatusUpdate** - Tracking delivery progress
- **DeliveryAgentAvailability** - Agent availability status
- **Rating** - Reviews for restaurants and delivery agents

## Quick Start

### Prerequisites

- Node.js (v16+)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies for each service:

```bash
# User Service
cd user-service
npm install

# Restaurant Service
cd restaurant-service
npm install

# Delivery Service
cd delivery-service
npm install
```

3. Set up environment variables in each service:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/food_delivery"
JWT_SECRET="your-secret-key"
PORT=3001 # 3002 for restaurant, 3003 for delivery
NODE_ENV=development
```

4. Run database migrations:

```bash
npx prisma migrate dev
```

5. Start all services:

```bash
# Terminal 1 - User Service
cd user-service
npm run dev

# Terminal 2 - Restaurant Service
cd restaurant-service
npm run dev

# Terminal 3 - Delivery Service
cd delivery-service
npm run dev
```

## API Documentation

### Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

### User Service API (Port 3001)

#### Authentication Endpoints

**POST** `/api/auth/signup`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user" // user, restaurant_owner, delivery_agent, admin
}
```

**POST** `/api/auth/login`
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Order Endpoints

**POST** `/api/orders` (Protected - User role)
```json
{
  "restaurantId": "uuid",
  "items": [
    {
      "menuItemId": "uuid",
      "quantity": 2
    }
  ]
}
```

**GET** `/api/orders` (Protected - User role)
- Returns user's order history with restaurant and delivery agent details

#### Restaurant Endpoints

**GET** `/api/restaurants` (Protected)
- Returns all online restaurants with their menu items

#### Rating Endpoints

**POST** `/api/ratings` (Protected - User role)
```json
{
  "orderId": "uuid",
  "ratingType": "restaurant", // restaurant or delivery_agent
  "rating": 5,
  "comment": "Great food!"
}
```

### Restaurant Service API (Port 3002)

#### Restaurant Management

**POST** `/api/restaurants` (Protected - Restaurant Owner)
```json
{
  "name": "Pizza Palace",
  "address": "123 Main St, City"
}
```

**GET** `/api/restaurants/my-restaurants` (Protected - Restaurant Owner)
- Returns owner's restaurants with menu items and order counts

**PUT** `/api/restaurants/:id/status` (Protected - Restaurant Owner/Admin)
```json
{
  "isOnline": true
}
```

#### Menu Management

**POST** `/api/menu` (Protected - Restaurant Owner)
```json
{
  "restaurantId": "uuid",
  "name": "Margherita Pizza",
  "description": "Classic pizza with tomato and mozzarella",
  "price": 12.99,
  "isAvailable": true
}
```

**PUT** `/api/menu/:id` (Protected - Restaurant Owner)
```json
{
  "name": "Updated Pizza Name",
  "price": 13.99,
  "isAvailable": false
}
```

**DELETE** `/api/menu/:id` (Protected - Restaurant Owner/Admin)

**GET** `/api/menu/restaurant/:restaurantId`
- Returns all menu items for a restaurant

#### Order Management

**GET** `/api/orders` (Protected - Restaurant Owner)
- Returns all orders for owner's restaurants

**PUT** `/api/orders/:orderId/status` (Protected - Restaurant Owner)
```json
{
  "status": "accepted" // placed, accepted, rejected, preparing, out_for_delivery, delivered, cancelled
}
```

### Delivery Service API (Port 3003)

#### Order Management

**GET** `/api/delivery/orders` (Protected - Delivery Agent)
- Returns assigned orders for the delivery agent

**PUT** `/api/delivery/orders/:orderId/status` (Protected - Delivery Agent)
```json
{
  "status": "picked_up" // assigned, picked_up, delivered
}
```

#### Availability Management

**PUT** `/api/delivery/availability` (Protected - Delivery Agent)
```json
{
  "isAvailable": true
}
```

#### Delivery History

**GET** `/api/delivery/history` (Protected - Delivery Agent)
- Returns completed deliveries with ratings

### Health Check Endpoints

**GET** `/api/health` (Available on all services)
- Returns service health status

## Order Flow

1. **User places order** → Creates order with "placed" status
2. **Restaurant accepts/rejects** → Updates status to "accepted" or "rejected"
3. **Auto-assignment** → When accepted, system assigns available delivery agent
4. **Restaurant prepares** → Updates status to "preparing"
5. **Delivery pickup** → Agent updates to "picked_up", order status becomes "out_for_delivery"
6. **Delivery complete** → Agent updates to "delivered", order status becomes "delivered"
7. **Agent availability** → Agent becomes available again automatically

## Error Handling

All endpoints return standardized error responses:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Role-Based Access Control

- **User**: Can place orders, view restaurants, add ratings
- **Restaurant Owner**: Can manage restaurants, menu items, and process orders
- **Delivery Agent**: Can update delivery status and availability
- **Admin**: Has elevated permissions for system management

## Data Models

### Order Status Flow
```
placed → accepted → preparing → out_for_delivery → delivered
       ↘ rejected
```

### Delivery Status Flow
```
assigned → picked_up → delivered
```

## Features

- User registration and authentication
- Multi-role support (customers, restaurant owners, delivery agents)
- Restaurant and menu management
- Order placement and tracking
- Automatic delivery agent assignment
- Real-time order status updates
- Rating and review system
- Delivery history tracking


## Sample Credentials
### User Credentials
```json
{
  "email": "user1@fooodiii.com",
  "password": "StrongP@ssw0rd!"
}

- "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmYmFhOTY4LTQ5ZTYtNDBiYi05ZDI2LTMxNmEwYzZiZmQwZiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQ4NTE0NzM5LCJleHAiOjE3NDkxMTk1Mzl9.pLvRJi40dN_WNN4qRrZVXaSZ5L_xERE1fGjPtz2WCAM"

```

### Restaurant Owner Credentials
```json
{
  "email": "restaurant.owner1@fooodiii.com",
  "password": "StrongP@ssw0rd!"
}
- "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg4MGQ3MDc0LTBkY2QtNDc5Ny1hNjY4LWI5MjlkZGJkMWMzYSIsInJvbGUiOiJyZXN0YXVyYW50X293bmVyIiwiaWF0IjoxNzQ4NTE0NzkyLCJleHAiOjE3NDkxMTk1OTJ9.IqsVNfvZq0keQwPhL12B0CnbR6X08EMmUYBgE2x8Ecs"

```

### Delivery Agent Credentials
```json
{
  "email": "delivery_agent1@fooodiii.com",
  "password": "StrongP@ssw0rd!"
}
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg1MmYyZWI0LWQyODItNGI3My05YjFiLTY2ZTVmYzQ5ZjkwZCIsInJvbGUiOiJkZWxpdmVyeV9hZ2VudCIsImlhdCI6MTc0ODUxNDY4OCwiZXhwIjoxNzQ5MTE5NDg4fQ.0oQyS1Znw-cjT58IVf2tfaW4YdBK5Af-ocDWWxKJhLY"
```