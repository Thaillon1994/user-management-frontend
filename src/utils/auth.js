import { jwtDecode } from 'jwt-decode';

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || decoded.nameid,
      name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || decoded.name,
      email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || decoded.email,
      role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || decoded.role,
      exp: decoded.exp
    };
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
};

export const isTokenExpired = () => {
  const user = getUserFromToken();
  if (!user || !user.exp) return true;
  
  const currentTime = Date.now() / 1000;
  return user.exp < currentTime;
};

export const isAdmin = () => {
  const user = getUserFromToken();
  return user?.role === 'Admin';
};

export const isAuthenticated = () => {
  const token = getToken();
  return token && !isTokenExpired();
};