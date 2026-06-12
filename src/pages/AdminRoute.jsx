import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  // For production, check for a specific role or admin email
  // Mocking: allowing access if user is logged in
  const isAdmin = user && (user.email === 'admin@veeandcee.com' || user.isAdmin);

  if (!user || !isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}