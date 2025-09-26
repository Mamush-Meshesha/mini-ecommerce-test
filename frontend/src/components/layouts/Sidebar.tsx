import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Home, 
  ShoppingBag, 
  ShoppingCart, 
  User, 
  Settings, 
  Users, 
  Package, 
  CreditCard, 
  FileText,
  LogOut,
  Store
} from 'lucide-react';
import type { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { Button } from '../ui';
import { clsx } from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const userNavItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Products', href: '/products', icon: ShoppingBag },
    { name: 'Cart', href: '/cart', icon: ShoppingCart },
    { name: 'Orders', href: '/orders', icon: Package },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const adminNavItems = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: Store },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  ];

  const superAdminNavItems = [
    { name: 'Dashboard', href: '/super-admin', icon: Home },
    { name: 'Products', href: '/super-admin/products', icon: Package },
    { name: 'Categories', href: '/super-admin/categories', icon: Store },
    { name: 'Orders', href: '/super-admin/orders', icon: ShoppingBag },
    { name: 'Users', href: '/super-admin/users', icon: Users },
    { name: 'Payments', href: '/super-admin/payments', icon: CreditCard },
    { name: 'Audit Logs', href: '/super-admin/audit', icon: FileText },
    { name: 'Settings', href: '/super-admin/settings', icon: Settings },
  ];

  const getNavItems = () => {
    switch (user?.role) {
      case 'SUPER_ADMIN':
        return superAdminNavItems;
      case 'ADMIN':
        return adminNavItems;
      default:
        return userNavItems;
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-secondary-600 bg-opacity-75 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={clsx(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 bg-primary-600">
            <h1 className="text-xl font-bold text-white">Mini Ecommerce</h1>
          </div>

          {/* User info */}
          <div className="p-4 border-b border-secondary-200">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {user?.profileImage ? (
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.profileImage}
                    alt={user.name}
                  />
                ) : (
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-600" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-secondary-900 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-secondary-500 truncate">
                  {user?.role?.replace('_', ' ')}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  clsx(
                    'sidebar-link',
                    isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'
                  )
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t border-secondary-200">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-secondary-600 hover:text-secondary-900"
              leftIcon={<LogOut className="w-5 h-5" />}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
