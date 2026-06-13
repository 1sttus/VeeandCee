import { Navigate, useLocation } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const location = useLocation();
  let auth = null;
  try {
    auth = JSON.parse(localStorage.getItem('adminAuth'));
  } catch (e) {
    console.error("Failed to parse adminAuth from localStorage:", e);
    // auth remains null, triggering redirect
  }

  // Check for temporary admin session in localStorage
  if (!auth || !auth.authenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}