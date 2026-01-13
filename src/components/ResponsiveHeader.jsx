import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';

export default function Header({ user, onLogin, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    onLogout();
    navigate('/');
  };

  const handleNavigation = (path) => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="header">
      <nav className="header-nav">
        <div className="nav-left">
          <Link to="/" className="logo">
            <img src="/src/assets/logo-simple.svg" alt="Smart Rent Logo" className="logo-image" />
            <span className="logo-text">Smart Rent</span>
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu"
          >
            ☰
          </button>
        </div>
        
        {/* Desktop Menu */}
        <div className="nav-menu">
          <Link to="/buscar" className="nav-link">Alugar</Link>
          <Link to="/comprar" className="nav-link">Comprar</Link>
          <Link to="/anunciar" className="nav-link">Anunciar</Link>
        </div>

        <div className="nav-right">
          {user ? (
            <div className="user-dropdown">
              <button 
                className="user-button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="Menu do usuário"
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
                  <button onClick={() => handleNavigation('/account')} className="dropdown-item">
                    ⚙️ Minha Conta
                  </button>
                  {user.role === 'Admin' && (
                    <>
                      <div style={{ borderTop: '1px solid var(--gray-200)', margin: '0.5rem 0' }}></div>
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
                  <div style={{ borderTop: '1px solid var(--gray-200)', margin: '0.5rem 0' }}></div>
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
              <button onClick={() => handleNavigation('/login')} className="btn-login">
                Entrar
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              <Link to="/buscar" className="mobile-menu-item">Alugar</Link>
              <Link to="/comprar" className="mobile-menu-item">Comprar</Link>
              <Link to="/anunciar" className="mobile-menu-item">Anunciar</Link>
              
              {user ? (
                <>
                  <div style={{ borderTop: '1px solid var(--gray-200)', margin: '0.5rem 0' }}></div>
                  <Link to="/home" className="mobile-menu-item">🏠 Minha Área</Link>
                  <Link to="/favorites" className="mobile-menu-item">❤️ Favoritos</Link>
                  <Link to="/alerts" className="mobile-menu-item">🔔 Alertas</Link>
                  <Link to="/visits" className="mobile-menu-item">📅 Visitas</Link>
                  <Link to="/proposals" className="mobile-menu-item">📄 Propostas</Link>
                  <Link to="/contracts" className="mobile-menu-item">📋 Contratos</Link>
                  <Link to="/account" className="mobile-menu-item">⚙️ Minha Conta</Link>
                  {user.role === 'Admin' && (
                    <>
                      <Link to="/users" className="mobile-menu-item">👥 Gerenciar Usuários</Link>
                      <Link to="/imoveis" className="mobile-menu-item">🏠 Gerenciar Imóveis</Link>
                      <Link to="/consignacoes" className="mobile-menu-item">📋 Gerenciar Consignações</Link>
                      <Link to="/contratos" className="mobile-menu-item">📄 Gerenciar Contratos</Link>
                      <Link to="/boletos" className="mobile-menu-item">💳 Gerenciar Boletos</Link>
                    </>
                  )}
                  <button onClick={handleLogout} className="mobile-menu-item logout">
                    🚪 Sair
                  </button>
                </>
              ) : (
                <>
                  <Link to="/register" className="mobile-menu-item">📝 Cadastrar</Link>
                  <Link to="/login" className="mobile-menu-item">🔐 Entrar</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}