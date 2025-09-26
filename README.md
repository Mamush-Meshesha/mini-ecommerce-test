# Mini E-commerce Application

A full-stack e-commerce application built with modern technologies, featuring a comprehensive admin panel, user authentication, shopping cart, and order management system.

## 🚀 Live Demo

- **Frontend**: [https://mini-ecommerce-test-alpha.vercel.app](https://mini-ecommerce-test-alpha.vercel.app)
- **Backend API**: Available with Swagger documentation at `/api-docs`
- **Video Demo**: https://share.vidyard.com/watch/iMDsLGcUjiVj9JWJ5yr91M

-- **admin email**: admin@gmail.com

-- **admin password**: Mamush12345678

-- **super admin email**: super@mgmail.com

-- **super admin password**: Mamush12345678


## 📋 Project Overview

This project consists of two main parts:
- **Backend**: RESTful API built with Node.js, Express, TypeScript, and Prisma
- **Frontend**: React application with TypeScript, Redux Toolkit, and Tailwind CSS

## ✨ Key Features

### User Features
- 🔐 **Authentication**: Secure login/register with JWT tokens
- 🛍️ **Product Browsing**: Search, filter, and view products by categories
- 🛒 **Shopping Cart**: Add, update, remove items with stock validation
- 📦 **Order Management**: Place orders and track order history
- 👤 **Profile Management**: Update user profile and preferences

### Admin Features
- 📊 **Dashboard**: Overview of products, orders, and metrics
- 📝 **Product Management**: Full CRUD operations with image upload
- 🏷️ **Category Management**: Create and manage product categories
- 📋 **Order Management**: View and update order statuses
- 👥 **User Management**: View user accounts and activity
- 📈 **Audit Logging**: Track all administrative actions

### Technical Features
- 🔒 **Role-based Access Control**: USER, ADMIN, SUPER_ADMIN permissions
- 🎨 **Modern UI/UX**: Responsive design with Tailwind CSS
- 📱 **Mobile-First**: Optimized for all device sizes
- 🔄 **Real-time Updates**: Redux Saga for async state management
- 🛡️ **Security**: Rate limiting, CORS, helmet protection
- 📚 **API Documentation**: Interactive Swagger/OpenAPI docs

## 🏗️ Architecture

```
mini-ecommerce/
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── middlewares/     # Auth, validation, etc.
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Helper functions
│   │   └── config/          # Configuration files
│   ├── prisma/             # Database schema and migrations
│   └── dist/               # Compiled JavaScript
│
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store and slices
│   │   ├── services/       # API service functions
│   │   └── types/          # TypeScript definitions
│   └── dist/               # Built application
│
└── README.md              # This file
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens
- **File Upload**: Cloudinary integration
- **Documentation**: Swagger/OpenAPI
- **Security**: Helmet, CORS, Rate limiting

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit + Redux Saga
- **Routing**: React Router
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- PostgreSQL database
- Cloudinary account (for file uploads)

### 1. Clone the Repository
```bash
git clone git@github.com:Mamush-Meshesha/mini-ecommerce-test.git
cd mini-ecommerce-test
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database URL and secrets
npm run prisma:migrate
npm run prisma:gen
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your backend API URL
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- API Documentation: http://localhost:3000/api-docs

## 📖 Documentation

- **Backend README**: [./backend/README.md](./backend/README.md)
- **Frontend README**: [./frontend/README.md](./frontend/README.md)

## 🔧 Environment Variables

### Backend (.env)
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/mini_ecommerce"
JWT_SECRET="your-super-secret-jwt-key"
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
PORT=3000
NODE_ENV="development"
```

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME="Mini E-commerce"
VITE_APP_VERSION="1.0.0"
```

## 🚀 Deployment

### Backend Deployment
1. Set up PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Build and deploy to your hosting provider

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to Vercel, Netlify, or similar
3. Configure environment variables for production

## 🔐 User Roles

- **USER**: Browse products, manage cart, place orders
- **ADMIN**: Manage products, categories, and orders
- **SUPER_ADMIN**: All admin permissions + user management

## 🧪 Testing

### Backend
```bash
cd backend
npm run test
npm run type-check
```

### Frontend
```bash
cd frontend
npm run lint
npm run type-check
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the documentation in each module's README
- Review the API documentation at `/api-docs`
- Open an issue on GitHub

## 🎯 IF i had a time i would like to add the following features

- [ ]Payment gateway integration chapa, or santimpay
- [ ] Email notifications for orders
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Mobile app flutter
- [ ] More comprensive rate limiting and extra security

---

