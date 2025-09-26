# Mini E-commerce Backend API

A comprehensive e-commerce backend built with Node.js, Express, TypeScript, and Prisma with PostgreSQL.

## Features

- **User Management**: Registration, login, profile management with role-based access (USER, ADMIN, SUPER_ADMIN)
- **Product Management**: Full CRUD operations for products with category support and image upload
- **Category Management**: Product categorization system
- **Shopping Cart**: Add, update, remove items with stock validation
- **Order Management**: Complete order processing with status tracking
- **Payment Processing**: Integrated payment system with order confirmation
- **File Upload**: Cloudinary integration for product images and user avatars
- **Audit Logging**: Track all user actions for compliance
- **API Documentation**: Swagger/OpenAPI documentation available at `/api-docs`
- **Security**: JWT authentication, rate limiting, CORS, helmet protection

## Database Schema

The application uses the following main entities:
- **Users**: Authentication and role management
- **Products**: Product catalog with pricing and inventory
- **Categories**: Product categorization
- **Cart Items**: Shopping cart functionality
- **Payment Requests**: Payment approval workflow
- **Audit Logs**: Action tracking and compliance

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /profile` - Get user profile (authenticated)
- `PUT /profile` - Update user profile (authenticated)

### Products (`/api/products`)
- `GET /` - Get all products (with pagination, search, filtering)
- `GET /:id` - Get single product
- `POST /` - Create product (admin only)
- `PUT /:id` - Update product (admin only)
- `DELETE /:id` - Delete product (admin only)

### Categories (`/api/categories`)
- `GET /` - Get all categories
- `GET /:id` - Get single category with products
- `POST /` - Create category (admin only)
- `PUT /:id` - Update category (admin only)
- `DELETE /:id` - Delete category (admin only)

### Cart (`/api/cart`)
- `GET /` - Get user's cart
- `POST /add` - Add item to cart
- `PUT /item/:id` - Update cart item quantity
- `DELETE /item/:id` - Remove item from cart
- `DELETE /clear` - Clear entire cart

### Orders (`/api/orders`)
- `GET /` - Get user's orders
- `GET /:id` - Get single order
- `POST /` - Create order from cart
- `PUT /:id/status` - Update order status (admin only)

### Payments (`/api/payments`)
- `POST /process` - Process payment for order
- `GET /` - Get payment history (admin only)

### Audit Logs (`/api/audit`)
- `GET /` - Get audit logs (admin only)

## Setup Instructions

1. **Clone and Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and JWT secret
   ```

3. **Database Setup**
   ```bash
   # Generate Prisma client
   npm run prisma:gen
   
   # Run database migrations
   npm run prisma:migrate
   
   # (Optional) Open Prisma Studio to view data
   npm run prisma:studio
   ```

4. **Start the Server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm run build
   npm start
   ```

## Environment Variables

Required environment variables (copy from `.env.example`):

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/mini_ecommerce"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV="development"

# Cloudinary (for file uploads)
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

# CORS Origins (add your frontend URLs)
FRONTEND_URL="http://localhost:5173"
```

## User Roles

- **USER**: Can manage their cart, create payment requests, view their own data
- **ADMIN**: Can manage products/categories, approve/reject payment requests
- **SUPER_ADMIN**: All admin permissions + can confirm approved payment requests

## Security Features

- JWT-based authentication
- Role-based access control
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Helmet security headers
- Input validation and sanitization
- Audit logging for compliance

## Development

The project uses:
- **TypeScript** for type safety
- **Prisma** for database ORM
- **Express** for the web framework
- **bcrypt** for password hashing
- **jsonwebtoken** for authentication
- **helmet** and **cors** for security

## API Documentation

Interactive API documentation is available at `/api-docs` when the server is running. This Swagger UI provides:
- Complete endpoint documentation
- Request/response schemas
- Authentication requirements
- Try-it-out functionality

## API Testing

You can test the API using:
1. **Swagger UI**: Visit `http://localhost:3000/api-docs` for interactive testing
2. **Postman/Insomnia**: Import the OpenAPI spec from `/api-docs`
3. **curl**: Command-line testing

**Authentication Flow:**
1. Register a user: `POST /api/auth/register`
2. Login to get JWT token: `POST /api/auth/login`
3. Include `Authorization: Bearer <token>` header for protected routes

## Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm start           # Start production server

# Database
npm run prisma:gen     # Generate Prisma client
npm run prisma:migrate # Run database migrations
npm run prisma:studio  # Open Prisma Studio
npm run prisma:reset   # Reset database (development only)

# Code Quality
npm run lint          # Run ESLint
npm run type-check    # Run TypeScript compiler check

# Docker
docker build -t mini-ecommerce-backend .                    # Build production image
docker run -p 3000:3000 mini-ecommerce-backend             # Run container
docker-compose up -d                                        # Start with PostgreSQL
docker-compose -f docker-compose.dev.yml up -d             # Development environment
```

## Production Deployment

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Cloudinary account (for file uploads)

### Deployment Steps
1. **Environment Setup**
   ```bash
   NODE_ENV=production
   DATABASE_URL="your-production-database-url"
   JWT_SECRET="secure-random-string"
   ```

2. **Database Migration**
   ```bash
   npm run prisma:migrate
   npm run prisma:gen
   ```

3. **Build and Start**
   ```bash
   npm run build
   npm start
   ```

### Docker Deployment

#### Production with Docker
```bash
# Build the production image
docker build -t mini-ecommerce-backend .

# Run with environment variables
docker run -d \
  --name mini-ecommerce-backend \
  -p 3000:3000 \
  -e DATABASE_URL="your-production-database-url" \
  -e JWT_SECRET="your-secure-jwt-secret" \
  -e CLOUDINARY_CLOUD_NAME="your-cloudinary-name" \
  -e CLOUDINARY_API_KEY="your-api-key" \
  -e CLOUDINARY_API_SECRET="your-api-secret" \
  mini-ecommerce-backend
```

#### Docker Compose (Recommended)
```bash
# Production environment
docker-compose up -d

# Development environment with hot reload
docker-compose -f docker-compose.dev.yml up -d
```

#### Environment Variables for Docker
Create a `.env` file for docker-compose:
```bash
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Recommended Production Setup
- Use Docker with orchestration (Docker Swarm/Kubernetes)
- Set up reverse proxy (nginx/Apache) 
- Enable HTTPS with SSL certificates
- Configure proper logging and monitoring
- Set up database backups
- Use environment-specific configurations
- Implement health checks and auto-restart policies

## Troubleshooting

**Common Issues:**

1. **Database Connection Error**
   - Verify `DATABASE_URL` is correct
   - Ensure PostgreSQL is running
   - Check network connectivity

2. **JWT Token Issues**
   - Verify `JWT_SECRET` is set
   - Check token expiration settings
   - Ensure proper Authorization header format

3. **File Upload Errors**
   - Verify Cloudinary credentials
   - Check file size limits
   - Ensure proper CORS configuration

4. **CORS Issues**
   - Add frontend URL to CORS origins
   - Check credentials and headers configuration
