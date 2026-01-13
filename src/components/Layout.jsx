import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styles/PropertyCards.css';

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
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Erro ao carregar usuário do localStorage:', error);
        }
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <div className="app">
      <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}