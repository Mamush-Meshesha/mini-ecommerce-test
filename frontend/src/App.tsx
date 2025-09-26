import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Layout } from './components/layouts';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { HomePage } from './pages/index';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Orders } from './pages/Orders';
import { AdminDashboard, AdminProducts, AdminOrders, AdminCategories, AdminUsers, AdminPayments, AdminAudit } from './pages/admin';
import { useAuth } from './hooks/useAuth';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
        } 
      />
      <Route 
        path="/register" 
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />
        } 
      />
      
      {/* Protected routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/product/:id" 
                  element={
                    <ProtectedRoute>
                      <ProductDetail />
                    </ProtectedRoute>
                  } 
                />
                {/* User routes */}
                <Route path="/products" element={<div>Products Page</div>} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/profile" element={<div>Profile Page</div>} />
                
                {/* Admin routes */}
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute requiredRoles={['ADMIN', 'SUPER_ADMIN']}>
                      <Routes>
                        <Route path="/" element={<AdminDashboard />} />
                        <Route path="/products" element={<AdminProducts />} />
                        <Route path="/categories" element={<AdminCategories />} />
                        <Route path="/orders" element={<AdminOrders />} />
                      </Routes>
                    </ProtectedRoute>
                  }
                />
                
                {/* Super Admin routes */}
                <Route
                  path="/super-admin/*"
                  element={
                    <ProtectedRoute requiredRoles={['SUPER_ADMIN']}>
                      <Routes>
                        <Route path="/" element={<AdminDashboard />} />
                        <Route path="/products" element={<AdminProducts />} />
                        <Route path="/categories" element={<AdminCategories />} />
                        <Route path="/orders" element={<AdminOrders />} />
                        <Route path="/users" element={<AdminUsers />} />
                        <Route path="/payments" element={<AdminPayments />} />
                        <Route path="/audit" element={<AdminAudit />} />
                        <Route path="/settings" element={<div>Super Admin Settings</div>} />
                      </Routes>
                    </ProtectedRoute>
                  }
                />
                
                {/* Catch all */}
                <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-secondary-50">
          <AppRoutes />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
