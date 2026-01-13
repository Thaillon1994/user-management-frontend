import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styles/DemoBanner.css';

export default function Layout() {
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    // Lógica de login será implementada aqui
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUser({
          name: decodedToken.name || 'Usuário',
          email: decodedToken.email || 'usuario@exemplo.com',
          role: decodedToken.role || 'User'
        });
      } catch (error) {
        console.error('Erro ao decodificar token:', error);
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <div className="app">
      {/* Banner Fixo de Demonstração */}
      <div className="demo-top-banner">
        <div className="demo-top-content">
          ⚠️ <strong>AMBIENTE DE DEMONSTRAÇÃO</strong> | Sistema para apresentação comercial | Dados fictícios | Não use informações reais
        </div>
      </div>
      <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}