import { useAuth as useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const auth = useAuthContext();
  
  // Check if user has specific role
  const hasRole = (role) => {
    return auth.user?.role === role;
  };

  // Check if user is admin
  const isAdmin = () => {
    return auth.user?.role === 'admin' || auth.user?.role === 'superadmin';
  };

  // Check if user is super admin
  const isSuperAdmin = () => {
    return auth.user?.role === 'superadmin';
  };

  // Check if user is verified
  const isVerified = () => {
    return auth.user?.isVerified === true;
  };

  // Get user full name
  const getFullName = () => {
    return auth.user?.name || 'User';
  };

  // Get user email
  const getUserEmail = () => {
    return auth.user?.email || '';
  };

  // Get user avatar
  const getUserAvatar = () => {
    return auth.user?.image || null;
  };

  return {
    ...auth,
    hasRole,
    isAdmin,
    isSuperAdmin,
    isVerified,
    getFullName,
    getUserEmail,
    getUserAvatar,
  };
};