# Mini E-commerce Frontend

A modern, responsive e-commerce frontend built with React, TypeScript, and Tailwind CSS. Features a comprehensive admin panel, user authentication, shopping cart, and order management.

## Features

### User Features
- **Authentication**: Login, register, and profile management
- **Product Browsing**: Search, filter, and view products with categories
- **Shopping Cart**: Add, update, remove items with real-time stock validation
- **Order Management**: Place orders, view order history, and track status
- **Responsive Design**: Mobile-first approach with modern UI/UX

### Admin Features
- **Dashboard**: Overview of products, orders, and system metrics
- **Product Management**: Full CRUD operations with image upload
- **Category Management**: Create and manage product categories
- **Order Management**: View and update order statuses
- **User Management**: View user accounts and activity

### Technical Features
- **Role-based Access**: USER, ADMIN, SUPER_ADMIN permissions
- **State Management**: Redux Toolkit with Redux Saga for async operations
- **Type Safety**: Full TypeScript implementation
- **Modern UI**: Tailwind CSS with custom components
- **API Integration**: RESTful API communication with error handling

## Tech Stack

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management with Redux Saga for async operations
- **React Router** - Client-side routing
- **Axios** - HTTP client for API communication
- **React Hook Form** - Form handling and validation

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, etc.)
│   └── layout/         # Layout components (Header, Sidebar, etc.)
├── pages/              # Page components
│   ├── admin/          # Admin panel pages
│   ├── auth/           # Authentication pages
│   └── user/           # User pages
├── store/              # Redux store configuration
│   ├── slices/         # Redux slices
│   └── sagas/          # Redux sagas
├── services/           # API service functions
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # Global styles and Tailwind config
```

## Setup Instructions

1. **Clone and Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your backend API URL
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm run preview  # Preview production build
   ```

## Environment Variables

Create a `.env` file in the frontend directory:

```bash
# Backend API URL
VITE_API_URL=http://localhost:3000/api

# App Configuration
VITE_APP_NAME="Mini E-commerce"
VITE_APP_VERSION="1.0.0"
```

## Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## Key Components

### Authentication
- **LoginPage**: User login with form validation
- **RegisterPage**: User registration with role selection
- **ProtectedRoute**: Route protection based on authentication

### User Interface
- **HomePage**: Product listing with search and filters
- **ProductDetail**: Individual product view with add to cart
- **Cart**: Shopping cart management
- **Orders**: Order history and tracking

### Admin Panel
- **AdminDashboard**: Overview and metrics
- **AdminProducts**: Product management with CRUD operations
- **AdminCategories**: Category management
- **AdminOrders**: Order management and status updates

## State Management

The application uses Redux Toolkit with the following slices:
- **authSlice**: User authentication and profile
- **productsSlice**: Product and category management
- **cartSlice**: Shopping cart operations
- **ordersSlice**: Order management

Redux Saga handles async operations like API calls with proper error handling and loading states.

## Styling

The application uses Tailwind CSS with a custom design system:
- **Colors**: Professional blue and gray palette
- **Components**: Reusable UI components with consistent styling
- **Responsive**: Mobile-first responsive design
- **Dark Mode**: Ready for dark mode implementation

## API Integration

All API calls are handled through:
- **Axios instance** with interceptors for authentication
- **Error handling** with user-friendly messages
- **Loading states** for better UX
- **Type safety** with TypeScript interfaces

## Production Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

3. **Configure environment variables** for production API URL

### Environment-specific Configurations
- Set `VITE_API_URL` to your production backend URL
- Configure CORS in backend to allow your frontend domain
- Enable HTTPS for production deployments

## Troubleshooting

**Common Issues:**

1. **API Connection Error**
   - Verify `VITE_API_URL` is correct
   - Check backend server is running
   - Verify CORS configuration

2. **Authentication Issues**
   - Check JWT token storage
   - Verify token expiration handling
   - Ensure proper API headers

3. **Build Errors**
   - Run `npm run type-check` to identify TypeScript errors
   - Check for missing dependencies
   - Verify environment variables are set

4. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check for conflicting CSS classes
   - Verify responsive breakpoints
