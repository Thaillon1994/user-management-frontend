import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';

export default function Header({ user, onLogin, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    onLogout();
    navigate('/');
  };

  const handleNavigation = (path) => {
    setDropdownOpen(false);
    navigate(path);
  };

  return (
    <header className="header">
      <nav className="header-nav">
        <div className="nav-left">
          <Link to="/" className="logo">
            <img src="/src/assets/logo-simple.svg" alt="Smart Rent Logo" className="logo-image" 
                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aXPSZzIHN2eCBlPSIvd0l3biIgeG1vbi8vd0l3biIgeG1vbiIgPSJodHRwOi8vMjAwL3N2ZyIgeG1vbiIgZmlsbHRcPSJodHRwOi8vMjAwLzIwMCAiZmlsbD0iI2h0dHBzOi8vdjIwMCIiIHJ4IHNjb25maWcuZmllbHRjPSIodHRwOi8vMjAwL2U0MDFjM0UzQzRjODk3MDFjOTUzIHJ4IHNjb25maWcuZmllbHRqL2UwMDAxMDFjM0UzQzRjODkzMDAxNWY2YzIgeG1vbiIgZmlsbD0jI2h0dHBzOi8vMjAwL2UwMDFjM0UzQzRjODkzMDAxNWY2YzIiIHJ5IHNjb25maWcuZmllbHRqLzIwMDFjM0UzQzRjODkzMDAxMmYxYzIgeG1vbiIgZmlsbD0iI2h0dHBzOi8vMjAwL2UwMDFjM0UzQzRjODkzMDAxMmYxYzIiIHJ5IHNjb25maWcuZmllbHRqLzIwMDFjM0UzQzRjODkzMDAxNjAyNzIzIiBzdHJva2U9InJlc3RhbGF0ZSIgaW50ZWdyYWJsZSIgeG5pdCBqdXN0aWZpY2FkIiAvPj4nCiAgICA8PHBhdGggeD0iTjAgMTAgTDFlMCAxMCBMIDFlMCAxMCBaIHJ4IHNjb25maWcuZmllbHRqLzIwMDFjM0UzQzRjODkzMDAxNjAyNzIzIiBzdHJva2U9InJlc3RhbGF0ZSIgeG5pdCBqdXN0aWZpY2FkIiAvPj4nCiAgICA8PHJlY3QgY3g9IjE3NSB4IEwMTAgWCAxMCAxMCA4eiBzdHJva2U9InJlc3RhbGF0ZSIgeG5pdCBqdXN0aWZpY2FkIiAvPj4nCiAgICA8L3N2Zz4+CiAgICAgICA8PHBhdGggZD0iMTEwIDEwIEwxMCAyMCA1MCBMIDEwIEwxMCAxMCBaIHN0cm9rZT0iI2h0dHBzOi8vMjAwLzEwMDFjM0UzQzRjODkzMDAxNWY2YzIiIHJ5IHNjb25maWcuZmllbHRxLzEwMDFjM0UzQzRjODkzMDAxNWY2YzIiIHJ5IHNjb25maWcuZmllbHRxLzEwMDFjM0UzQzRjODkzMDAxNjAyNzIzIiBzdHJva2U9InJlc3RhbGF0ZSIgeG5pdCBqdXN0aWZpY2FkIiAvPj4nCiAgICA8PC9zdmc+' />" />
            <span className="logo-text">Smart Rent</span>
          </Link>
          
          <div className="nav-menu">
            <Link to="/buscar" className="nav-link">Alugar</Link>
            <Link to="/comprar" className="nav-link">Comprar</Link>
            <Link to="/anunciar" className="nav-link">Anunciar</Link>
          </div>
        </div>

        <div className="nav-right">
          {user ? (
            <div className="user-dropdown">
              <button 
                className="user-button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="user-icon">👤</span>
                <span className="user-name">{user.name}</span>
                <span className="dropdown-arrow">▼</span>
              </button>
              
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={() => handleNavigation('/home')} className="dropdown-item">
                    🏠 Minha Área
                  </button>
                  <button onClick={() => handleNavigation('/favorites')} className="dropdown-item">
                    ❤️ Favoritos e Listas
                  </button>
                  <button onClick={() => handleNavigation('/alerts')} className="dropdown-item">
                    🔔 Alertas Criados
                  </button>
                  <button onClick={() => handleNavigation('/visits')} className="dropdown-item">
                    📅 Visitas Agendadas
                  </button>
                  <button onClick={() => handleNavigation('/proposals')} className="dropdown-item">
                    📄 Propostas Enviadas
                  </button>
                  <button onClick={() => handleNavigation('/contracts')} className="dropdown-item">
                    📋 Contratos e Boletos
                  </button>
                  <button onClick={() => handleNavigation('/pricing')} className="dropdown-item">
                    💰 Área Preço
                  </button>
                  <button onClick={() => handleNavigation('/account')} className="dropdown-item">
                    ⚙️ Minha Conta
                  </button>
                  {user.role === 'Admin' && (
                    <>
                      <div style={{ borderTop: '1px solid var(--border-color)', margin: '0.5rem 0' }}></div>
                      <button onClick={() => handleNavigation('/users')} className="dropdown-item">
                        👥 Gerenciar Usuários
                      </button>
                      <button onClick={() => handleNavigation('/imoveis')} className="dropdown-item">
                        🏠 Gerenciar Imóveis
                      </button>
                      <button onClick={() => handleNavigation('/consignacoes')} className="dropdown-item">
                        📋 Gerenciar Consignações
                      </button>
                      <button onClick={() => handleNavigation('/contratos')} className="dropdown-item">
                        📄 Gerenciar Contratos
                      </button>
                      <button onClick={() => handleNavigation('/boletos')} className="dropdown-item">
                        💳 Gerenciar Boletos
                      </button>
                    </>
                  )}
                  <div style={{ borderTop: '1px solid var(--border-color)', margin: '0.5rem 0' }}></div>
                  <button onClick={handleLogout} className="dropdown-item logout">
                    🚪 Sair da Conta
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/register" className="btn-register">
                Cadastrar
              </Link>
              <Link to="/login" className="btn-login">
                Entrar
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}