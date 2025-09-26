# Mini E-commerce Backend API

A comprehensive e-commerce backend built with Node.js, Express, TypeScript, and Prisma with PostgreSQL.

## Features

- **User Management**: Registration, login, profile management with role-based access (USER, ADMIN, SUPER_ADMIN)
- **Product Management**: Full CRUD operations for products with category support
- **Category Management**: Product categorization system
- **Shopping Cart**: Add, update, remove items with stock validation
- **Payment Requests**: Multi-level approval workflow (Admin → Super Admin)
- **Audit Logging**: Track all user actions for compliance
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

### Payment Requests (`/api/payments`)
- `GET /` - Get payment requests (filtered by user role)
- `GET /:id` - Get single payment request
- `POST /` - Create payment request
- `PUT /:id/approve` - Approve payment request (admin)
- `PUT /:id/reject` - Reject payment request (admin)
- `PUT /:id/confirm` - Confirm payment request (super admin)

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

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT token signing
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

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

## API Testing

You can test the API using tools like Postman or curl. Make sure to:
1. Register a user or create admin users
2. Login to get JWT token
3. Include `Authorization: Bearer <token>` header for protected routes

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a secure `JWT_SECRET`
3. Configure proper database connection
4. Set up reverse proxy (nginx)
5. Enable HTTPS
6. Configure proper logging and monitoring
