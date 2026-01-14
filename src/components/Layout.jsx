import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ResponsiveHeader from './ResponsiveHeader';
import Footer from './Footer';
import '../styles/PropertyCards.css';
import '../styles/Responsive.css';

export default function Layout() {
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    // Mock login para demonstração
    const token = localStorage.getItem('token');
    if (token) {
      // Primeiro tentar pegar do localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          console.log("✅ Usuário recuperado do localStorage:", userData);
        } catch (error) {
          console.error('Erro ao carregar usuário do localStorage:', error);
        }
      } else {
        console.log("ℹ️ Nenhum usuário encontrado no localStorage");
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <div className="app">
      <ResponsiveHeader user={user} onLogin={handleLogin} onLogout={handleLogout} />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}