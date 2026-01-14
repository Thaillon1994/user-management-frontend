import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Recuperar usuário do localStorage ao montar o componente
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        console.log("✅ Dashboard: Usuário carregado:", userData);
      } catch (error) {
        console.error('❌ Erro ao carregar usuário:', error);
      }
    }
  }, [token, storedUser]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    console.log("🚪 Usuário deslogado do dashboard");
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>👤 Painel Administrativo</h1>
        <div className="user-info">
          <span className="user-icon">👤</span>
          <span className="user-name">{user?.name || 'Administrador'}</span>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Sair
          </button>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <h2>📊 Total de Usuários</h2>
            <div className="stat-number">10</div>
            <div className="stat-label">Ativos</div>
          </div>
          
          <div className="stat-card">
            <h2>🏠 Imóveis Cadastrados</h2>
            <div className="stat-number">25</div>
            <div className="stat-label">Propriedades</div>
          </div>
          
          <div className="stat-card">
            <h2>📋 Visitas Agendadas</h2>
            <div className="stat-number">15</div>
            <div className="stat-label">Visitas Este Mês</div>
          </div>
          
          <div className="stat-card">
            <h2>📄 Propostas Enviadas</h2>
            <div className="stat-number">8</div>
            <div className="stat-label">Propostas</div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-actions">
        <div className="action-card">
          <h3>👥 Gerenciar Usuários</h3>
          <button className="action-button">
            Ir para Usuários
          </button>
        </div>
        
        <div className="action-card">
          <h3>🏠 Gerenciar Imóveis</h3>
          <button className="action-button">
            Ir para Imóveis
          </button>
        </div>
        
        <div className="action-card">
          <h3>📋 Gerenciar Visitas</h3>
          <button className="action-button">
            Ir para Visitas
          </button>
        </div>
        
        <div className="action-card">
          <h3>📄 Gerenciar Propostas</h3>
          <button className="action-button">
            Ir para Propostas
          </button>
        </div>
        
        <div className="action-card">
          <h3>📋 Gerenciar Contratos</h3>
          <button className="action-button">
            Ir para Contratos
          </button>
        </div>
        
        <div className="action-card">
          <h3>💳 Gerenciar Boletos</h3>
          <button className="action-button">
            Ir para Boletos
          </button>
        </div>
      </div>

      <div className="dashboard-footer">
        <p className="dashboard-footer-text">
          <strong>Smart Rent Aluguel Consignado</strong> - Painel Administrativo
        </p>
        <p className="dashboard-footer-subtext">
          Usuário logado: {user?.name || 'Carregando...'}
        </p>
        <p className="dashboard-footer-subtext">
          Status: {user ? 'Online' : 'Offline'}
        </p>
      </div>
    </div>
  );
}