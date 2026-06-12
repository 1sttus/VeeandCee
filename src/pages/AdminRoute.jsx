import { Navigate, useLocation } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const location = useLocation();
  const auth = JSON.parse(localStorage.getItem('adminAuth'));

  // Check for temporary admin session in localStorage
  if (!auth || !auth.authenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}