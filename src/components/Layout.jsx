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
      // Usuários mock para demonstração
      const mockUsers = {
        'mock-token-user-123': { name: 'João Silva', email: 'joao@smartrent.com', role: 'User' },
        'mock-token-admin-456': { name: 'Maria Admin', email: 'admin@smartrent.com', role: 'Admin' }
      };
      
      const userData = mockUsers[token];
      if (userData) {
        setUser(userData);
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