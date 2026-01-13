import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserFromToken, removeToken } from "../utils/auth";
import Header from "../components/Header";
import "../styles/Homepage.css";

export default function Alerts() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('active');
  const [alerts, setAlerts] = useState([]);
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newAlert, setNewAlert] = useState({
    nome: '',
    tipo: 'aluguel',
    cidade: '',
    bairro: '',
    precoMin: '',
    precoMax: '',
    quartosMin: '',
    frequencia: 'diaria',
    ativo: true
  });

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getUserFromToken();
    console.log('Alerts - Current user:', currentUser);
    if (!currentUser) {
      console.log('Alerts - No user found, redirecting to login');
      navigate('/login');
      return;
    }
    setUser(currentUser);
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    setLoading(true);
    try {
      console.log('Loading alerts...');
      // Simulação de dados - substituir com API real
      const mockAlerts = [
        {
          id: 1,
          nome: "Apartamento 2 quartos Centro",
          tipo: "aluguel",
          cidade: "São Paulo",
          bairro: "Centro",
          precoMin: 1500,
          precoMax: 2500,
          quartosMin: 2,
          frequencia: "diaria",
          ativo: true,
          criadoEm: "10/10/2024",
          ultimaNotificacao: "25/10/2024",
          correspondenciasEncontradas: 8,
          emailNotificacao: "usuario@email.com"
        },
        {
          id: 2,
          nome: "Casa com piscina",
          tipo: "venda",
          cidade: "São Paulo",
          bairro: "Moema",
          precoMin: 500000,
          precoMax: 800000,
          quartosMin: 3,
          frequencia: "semanal",
          ativo: true,
          criadoEm: "15/10/2024",
          ultimaNotificacao: "24/10/2024",
          correspondenciasEncontradas: 3,
          emailNotificacao: "usuario@email.com"
        },
        {
          id: 3,
          nome: "Studio para estudante",
          tipo: "aluguel",
          cidade: "São Paulo",
          bairro: "Pinheiros",
          precoMin: 800,
          precoMax: 1500,
          quartosMin: 1,
          frequencia: "diaria",
          ativo: false,
          criadoEm: "05/10/2024",
          ultimaNotificacao: "18/10/2024",
          correspondenciasEncontradas: 12,
          emailNotificacao: "usuario@email.com"
        }
      ];
      console.log('Setting alerts:', mockAlerts);
      setAlerts(mockAlerts);
    } catch (error) {
      console.error('Erro ao carregar alertas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAlert = () => {
    if (newAlert.nome.trim()) {
      const alert = {
        id: alerts.length + 1,
        ...newAlert,
        criadoEm: new Date().toLocaleDateString('pt-BR'),
        ultimaNotificacao: null,
        correspondenciasEncontradas: 0
      };
      setAlerts([...alerts, alert]);
      setNewAlert({
        nome: '',
        tipo: 'aluguel',
        cidade: '',
        bairro: '',
        precoMin: '',
        precoMax: '',
        quartosMin: '',
        frequencia: 'diaria',
        ativo: true
      });
      setShowCreateAlert(false);
    }
  };

  const handleToggleAlert = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, ativo: !alert.ativo }
        : alert
    ));
  };

  const handleDeleteAlert = (alertId) => {
    if (window.confirm("Tem certeza que deseja excluir este alerta?")) {
      setAlerts(alerts.filter(alert => alert.id !== alertId));
    }
  };

  const handleEditAlert = (alert) => {
    setNewAlert(alert);
    setShowCreateAlert(true);
  };

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  const activeAlerts = alerts.filter(alert => alert.ativo);
  const inactiveAlerts = alerts.filter(alert => !alert.ativo);

  const formatCurrency = (value) => {
    if (!value) return '-';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="homepage">
      <Header user={user} onLogin={() => {}} onLogout={handleLogout} />
      
      <div className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="search-container" style={{ maxWidth: '1200px', width: '100%' }}>
            <h1 className="hero-title">🔔 Alertas Criados</h1>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              Receba notificações sobre novos imóveis que correspondem aos seus critérios
            </p>

            {/* Tabs */}
            <div className="tab-switcher">
              <button 
                className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
                onClick={() => setActiveTab('active')}
              >
                Ativos ({activeAlerts.length})
              </button>
              <button 
                className={`tab-button ${activeTab === 'inactive' ? 'active' : ''}`}
                onClick={() => setActiveTab('inactive')}
              >
                Inativos ({inactiveAlerts.length})
              </button>
            </div>

            {/* Create Alert Button */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <button 
                onClick={() => {
                  setNewAlert({
                    nome: '',
                    tipo: 'aluguel',
                    cidade: '',
                    bairro: '',
                    precoMin: '',
                    precoMax: '',
                    quartosMin: '',
                    frequencia: 'diaria',
                    ativo: true
                  });
                  setShowCreateAlert(!showCreateAlert);
                }}
                className="btn-advertise-primary"
                style={{ width: 'auto', padding: '0.75rem 1.5rem' }}
              >
                {showCreateAlert ? '➖ Cancelar' : '➕ Criar Novo Alerta'}
              </button>
            </div>

            {/* Create Alert Form */}
            {showCreateAlert && (
              <div style={{ 
                background: '#f8f9fa', 
                padding: '1.5rem', 
                borderRadius: 'var(--border-radius-lg)', 
                marginBottom: '2rem' 
              }}>
                <form onSubmit={(e) => { e.preventDefault(); handleCreateAlert(); }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label>Nome do Alerta</label>
                      <input
                        type="text"
                        placeholder="Ex: Apartamento 2 quartos Centro"
                        value={newAlert.nome}
                        onChange={(e) => setNewAlert({...newAlert, nome: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Tipo</label>
                      <select
                        value={newAlert.tipo}
                        onChange={(e) => setNewAlert({...newAlert, tipo: e.target.value})}
                      >
                        <option value="aluguel">Aluguel</option>
                        <option value="venda">Venda</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Cidade</label>
                      <input
                        type="text"
                        placeholder="Ex: São Paulo"
                        value={newAlert.cidade}
                        onChange={(e) => setNewAlert({...newAlert, cidade: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Bairro</label>
                      <input
                        type="text"
                        placeholder="Ex: Centro"
                        value={newAlert.bairro}
                        onChange={(e) => setNewAlert({...newAlert, bairro: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Preço Mínimo</label>
                      <input
                        type="number"
                        placeholder="0,00"
                        value={newAlert.precoMin}
                        onChange={(e) => setNewAlert({...newAlert, precoMin: e.target.value})}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="form-group">
                      <label>Preço Máximo</label>
                      <input
                        type="number"
                        placeholder="0,00"
                        value={newAlert.precoMax}
                        onChange={(e) => setNewAlert({...newAlert, precoMax: e.target.value})}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="form-group">
                      <label>Quartos Mínimos</label>
                      <select
                        value={newAlert.quartosMin}
                        onChange={(e) => setNewAlert({...newAlert, quartosMin: e.target.value})}
                      >
                        <option value="">Qualquer</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Frequência</label>
                      <select
                        value={newAlert.frequencia}
                        onChange={(e) => setNewAlert({...newAlert, frequencia: e.target.value})}
                      >
                        <option value="diaria">Diária</option>
                        <option value="semanal">Semanal</option>
                        <option value="quinzenal">Quinzenal</option>
                        <option value="mensal">Mensal</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input
                        type="checkbox"
                        checked={newAlert.ativo}
                        onChange={(e) => setNewAlert({...newAlert, ativo: e.target.checked})}
                      />
                      Ativo
                    </label>
                  </div>
                  <button 
                    type="submit"
                    className="login-button"
                    style={{ width: 'auto', padding: '0.75rem 2rem', marginTop: '1rem' }}
                  >
                    Criar Alerta
                  </button>
                </form>
              </div>
            )}

            {/* Content */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                <p>🔄 Carregando alertas...</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {(activeTab === 'active' ? activeAlerts : inactiveAlerts).length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                    <p>📭 {activeTab === 'active' ? 'Nenhum alerta ativo' : 'Nenhum alerta inativo'}</p>
                    <p style={{ fontSize: '0.9rem' }}>
                      {activeTab === 'active' 
                        ? 'Crie um novo alerta para receber notificações sobre imóveis' 
                        : 'Alertas inativos não enviam notificações'
                      }
                    </p>
                  </div>
                ) : (
                  (activeTab === 'active' ? activeAlerts : inactiveAlerts).map((alert) => (
                    <div key={alert.id} style={{
                      background: 'white',
                      padding: '1.5rem',
                      borderRadius: 'var(--border-radius-lg)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                          <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>
                            🔔 {alert.nome}
                          </h3>
                          <span style={{
                            padding: '0.25rem 0.5rem',
                            borderRadius: 'var(--border-radius)',
                            backgroundColor: alert.ativo ? 'rgba(40, 167, 69, 0.2)' : 'rgba(220, 53, 69, 0.2)',
                            color: alert.ativo ? 'var(--secondary-color)' : '#dc3545',
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                          }}>
                            {alert.ativo ? '✅ Ativo' : '⏸️ Inativo'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                          <span>🏠 {alert.tipo === 'aluguel' ? 'Aluguel' : 'Venda'}</span>
                          <span>📍 {alert.cidade} - {alert.bairro || 'Todos'}</span>
                          <span>💰 {formatCurrency(alert.precoMin)} - {formatCurrency(alert.precoMax)}</span>
                          <span>🛏️ {alert.quartosMin ? `${alert.quartosMin}+ quartos` : 'Qualquer'}</span>
                          <span>⏰ {alert.frequencia}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                          <span>📅 Criado: {alert.criadoEm}</span>
                          {alert.ultimaNotificacao && (
                            <span>📬 Última notificação: {alert.ultimaNotificacao}</span>
                          )}
                          <span>🎯 Correspondências: {alert.correspondenciasEncontradas}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          📧 Notificações enviadas para: {alert.emailNotificacao}
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleToggleAlert(alert.id)}
                          style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.8rem',
                            backgroundColor: alert.ativo ? '#ffc107' : 'var(--secondary-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--border-radius)',
                            cursor: 'pointer'
                          }}
                        >
                          {alert.ativo ? '⏸️ Pausar' : '▶️ Ativar'}
                        </button>
                        <button
                          onClick={() => handleEditAlert(alert)}
                          className="btn-advertise-secondary"
                          style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                        >
                          ✏️ Editar
                        </button>
                        <button
                          onClick={() => handleDeleteAlert(alert.id)}
                          style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.8rem',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--border-radius)',
                            cursor: 'pointer'
                          }}
                        >
                          🗑️ Excluir
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}