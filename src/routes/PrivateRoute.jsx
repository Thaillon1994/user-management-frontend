import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

export default function PrivateRoute({ children }) {
  const isAuth = isAuthenticated();
  
  console.log('PrivateRoute - isAuth:', isAuth);
  
  if (!isAuth) {
    console.log('PrivateRoute - Redirecting to /');
    return <Navigate to="/" replace />;
  }
  
  console.log('PrivateRoute - Rendering children');
  return children;
}