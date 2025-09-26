import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);
  
  const hasRole = (roles: string | string[]) => {
    if (!auth.user) return false;
    
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    return allowedRoles.includes(auth.user.role);
  };

  const isAdmin = () => hasRole(['ADMIN', 'SUPER_ADMIN']);
  const isSuperAdmin = () => hasRole('SUPER_ADMIN');
  const isUser = () => hasRole('USER');

  return {
    ...auth,
    hasRole,
    isAdmin,
    isSuperAdmin,
    isUser,
  };
};
