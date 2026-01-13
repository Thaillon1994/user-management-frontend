import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserFromToken, removeToken } from "../utils/auth";
import Header from "../components/Header";
import "../styles/Homepage.css";

export default function Visits() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('scheduled');
  const [visits, setVisits] = useState([]);
  const [showCreateVisit, setShowCreateVisit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newVisit, setNewVisit] = useState({
    propertyId: '',
    propertyName: '',
    propertyAddress: '',
    visitDate: '',
    visitTime: '10:00',
    duration: '30',
    visitType: 'presencial',
    contactPhone: '',
    contactEmail: '',
    observations: '',
    status: 'agendada'
  });

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getUserFromToken();
    console.log('Visits - Current user:', currentUser);
    if (!currentUser) {
      console.log('Visits - No user found, redirecting to login');
      navigate('/login');
      return;
    }
    setUser(currentUser);
    loadVisits();
  }, []);

  const loadVisits = async () => {
    setLoading(true);
    try {
      console.log('Loading visits...');
      // Simulação de dados - substituir com API real
      const mockVisits = [
        {
          id: 1,
          propertyId: 1,
          propertyName: "Apartamento Cobertura",
          propertyAddress: "Rua das Palmeiras, 123 - Centro",
          propertyImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200",
          visitDate: "26/10/2024",
          visitTime: "14:00",
          duration: "30",
          visitType: "presencial",
          contactPhone: "(11) 99999-8888",
          contactEmail: "imobiliaria@exemplo.com",
          observations: "Levar documento de identidade e comprovante de renda",
          status: "agendada",
          requestedDate: "20/10/2024",
          agentName: "João Silva",
          agentPhone: "(11) 99999-7777",
          price: "2.500",
          propertyType: "Apartamento",
          area: "120m²",
          rooms: "3 quartos, 2 suítes"
        },
        {
          id: 2,
          propertyId: 2,
          propertyName: "Casa com Piscina",
          propertyAddress: "Condomínio Villa Verde, 45 - Jardins",
          propertyImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=200",
          visitDate: "28/10/2024",
          visitTime: "10:00",
          duration: "45",
          visitType: "presencial",
          contactPhone: "(11) 99999-8888",
          contactEmail: "imobiliaria@exemplo.com",
          observations: "Portão azul, tocar interfone 102",
          status: "confirmada",
          requestedDate: "18/10/2024",
          agentName: "Maria Santos",
          agentPhone: "(11) 99999-6666",
          price: "4.500",
          propertyType: "Casa",
          area: "280m²",
          rooms: "4 quartos, 3 suítes"
        },
        {
          id: 3,
          propertyId: 3,
          propertyName: "Studio Compacto",
          propertyAddress: "Avenida Paulista, 2000 - Bela Vista",
          propertyImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200",
          visitDate: "22/10/2024",
          visitTime: "16:00",
          duration: "30",
          visitType: "online",
          contactPhone: "(11) 99999-8888",
          contactEmail: "imobiliaria@exemplo.com",
          observations: "Videochamada via Google Meet",
          status: "realizada",
          requestedDate: "15/10/2024",
          agentName: "Pedro Costa",
          agentPhone: "(11) 99999-5555",
          price: "1.200",
          propertyType: "Studio",
          area: "45m²",
          rooms: "1 quarto"
        },
        {
          id: 4,
          propertyId: 4,
          propertyName: "Kitnet Moderna",
          propertyAddress: "Rua Augusta, 1500 - Consolação",
          propertyImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=200",
          visitDate: "25/10/2024",
          visitTime: "11:00",
          duration: "30",
          visitType: "presencial",
          contactPhone: "(11) 99999-8888",
          contactEmail: "imobiliaria@exemplo.com",
          observations: "",
          status: "cancelada",
          requestedDate: "10/10/2024",
          agentName: "Ana Oliveira",
          agentPhone: "(11) 99999-4444",
          price: "800",
          propertyType: "Kitnet",
          area: "25m²",
          rooms: "1 quarto"
        }
      ];
      console.log('Setting visits:', mockVisits);
      setVisits(mockVisits);
    } catch (error) {
      console.error('Erro ao carregar visitas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVisit = () => {
    if (newVisit.propertyName && newVisit.visitDate && newVisit.visitTime) {
      const visit = {
        id: visits.length + 1,
        ...newVisit,
        propertyImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200",
        requestedDate: new Date().toLocaleDateString('pt-BR'),
        agentName: "Corretor(a) a definir",
        agentPhone: "(11) 99999-8888",
        propertyType: "Imóvel",
        area: "-",
        rooms: "-"
      };
      setVisits([...visits, visit]);
      setNewVisit({
        propertyId: '',
        propertyName: '',
        propertyAddress: '',
        visitDate: '',
        visitTime: '10:00',
        duration: '30',
        visitType: 'presencial',
        contactPhone: '',
        contactEmail: '',
        observations: '',
        status: 'agendada'
      });
      setShowCreateVisit(false);
    }
  };

  const handleUpdateStatus = (visitId, newStatus) => {
    setVisits(visits.map(visit => 
      visit.id === visitId 
        ? { ...visit, status: newStatus }
        : visit
    ));
  };

  const handleDeleteVisit = (visitId) => {
    if (window.confirm("Tem certeza que deseja cancelar esta visita?")) {
      setVisits(visits.filter(visit => visit.id !== visitId));
    }
  };

  const handleEditVisit = (visit) => {
    setNewVisit(visit);
    setShowCreateVisit(true);
  };

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'agendada': return 'rgba(255, 193, 7, 0.2)';
      case 'confirmada': return 'rgba(40, 167, 69, 0.2)';
      case 'realizada': return 'rgba(0, 123, 255, 0.2)';
      case 'cancelada': return 'rgba(220, 53, 69, 0.2)';
      default: return 'rgba(108, 117, 125, 0.2)';
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'agendada': return '#FFD700';
      case 'confirmada': return '#90EE90';
      case 'realizada': return '#87CEEB';
      case 'cancelada': return '#FF6B6B';
      default: return '#ADB5BD';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'agendada': return '📅 Agendada';
      case 'confirmada': return '✅ Confirmada';
      case 'realizada': return '✅ Realizada';
      case 'cancelada': return '❌ Cancelada';
      default: return status;
    }
  };

  const scheduledVisits = visits.filter(visit => visit.status === 'agendada' || visit.status === 'confirmada');
  const pastVisits = visits.filter(visit => visit.status === 'realizada');
  const cancelledVisits = visits.filter(visit => visit.status === 'cancelada');

  return (
    <div className="homepage">
      <Header user={user} onLogin={() => {}} onLogout={handleLogout} />
      
      <div className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="search-container" style={{ maxWidth: '1200px', width: '100%' }}>
            <h1 className="hero-title">📅 Visitas Agendadas</h1>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              Gerencie suas visitas presenciais e online aos imóveis de interesse
            </p>

            {/* Tabs */}
            <div className="tab-switcher">
              <button 
                className={`tab-button ${activeTab === 'scheduled' ? 'active' : ''}`}
                onClick={() => setActiveTab('scheduled')}
              >
                Agendadas ({scheduledVisits.length})
              </button>
              <button 
                className={`tab-button ${activeTab === 'past' ? 'active' : ''}`}
                onClick={() => setActiveTab('past')}
              >
                Realizadas ({pastVisits.length})
              </button>
              <button 
                className={`tab-button ${activeTab === 'cancelled' ? 'active' : ''}`}
                onClick={() => setActiveTab('cancelled')}
              >
                Canceladas ({cancelledVisits.length})
              </button>
            </div>

            {/* Create Visit Button */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <button 
                onClick={() => {
                  setNewVisit({
                    propertyId: '',
                    propertyName: '',
                    propertyAddress: '',
                    visitDate: '',
                    visitTime: '10:00',
                    duration: '30',
                    visitType: 'presencial',
                    contactPhone: '',
                    contactEmail: '',
                    observations: '',
                    status: 'agendada'
                  });
                  setShowCreateVisit(!showCreateVisit);
                }}
                className="btn-advertise-primary"
                style={{ width: 'auto', padding: '0.75rem 1.5rem' }}
              >
                {showCreateVisit ? '➖ Cancelar' : '➕ Agendar Nova Visita'}
              </button>
            </div>

            {/* Create Visit Form */}
            {showCreateVisit && (
              <div style={{ 
                background: '#f8f9fa', 
                padding: '1.5rem', 
                borderRadius: 'var(--border-radius-lg)', 
                marginBottom: '2rem' 
              }}>
                <form onSubmit={(e) => { e.preventDefault(); handleCreateVisit(); }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label>Nome do Imóvel</label>
                      <input
                        type="text"
                        placeholder="Ex: Apartamento Cobertura"
                        value={newVisit.propertyName}
                        onChange={(e) => setNewVisit({...newVisit, propertyName: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Endereço</label>
                      <input
                        type="text"
                        placeholder="Rua, número, bairro"
                        value={newVisit.propertyAddress}
                        onChange={(e) => setNewVisit({...newVisit, propertyAddress: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Data da Visita</label>
                      <input
                        type="date"
                        value={newVisit.visitDate}
                        onChange={(e) => setNewVisit({...newVisit, visitDate: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Horário</label>
                      <input
                        type="time"
                        value={newVisit.visitTime}
                        onChange={(e) => setNewVisit({...newVisit, visitTime: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Duração (minutos)</label>
                      <select
                        value={newVisit.duration}
                        onChange={(e) => setNewVisit({...newVisit, duration: e.target.value})}
                      >
                        <option value="15">15 minutos</option>
                        <option value="30">30 minutos</option>
                        <option value="45">45 minutos</option>
                        <option value="60">1 hora</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Tipo de Visita</label>
                      <select
                        value={newVisit.visitType}
                        onChange={(e) => setNewVisit({...newVisit, visitType: e.target.value})}
                      >
                        <option value="presencial">Presencial</option>
                        <option value="online">Online/Videochamada</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Telefone de Contato</label>
                      <input
                        type="tel"
                        placeholder="(00) 00000-0000"
                        value={newVisit.contactPhone}
                        onChange={(e) => setNewVisit({...newVisit, contactPhone: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email de Contato</label>
                      <input
                        type="email"
                        placeholder="seu@email.com"
                        value={newVisit.contactEmail}
                        onChange={(e) => setNewVisit({...newVisit, contactEmail: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group" style={{ marginTop: '1rem' }}>
                    <label>Observações</label>
                    <textarea
                      placeholder="Informações adicionais sobre a visita..."
                      value={newVisit.observations}
                      onChange={(e) => setNewVisit({...newVisit, observations: e.target.value})}
                      rows="3"
                      style={{ resize: 'vertical' }}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="login-button"
                    style={{ width: 'auto', padding: '0.75rem 2rem', marginTop: '1rem' }}
                  >
                    Agendar Visita
                  </button>
                </form>
              </div>
            )}

            {/* Content */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                <p>🔄 Carregando visitas...</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {(activeTab === 'scheduled' ? scheduledVisits : activeTab === 'past' ? pastVisits : cancelledVisits).length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                    <p>📭 {activeTab === 'scheduled' ? 'Nenhuma visita agendada' : activeTab === 'past' ? 'Nenhuma visita realizada' : 'Nenhuma visita cancelada'}</p>
                    <p style={{ fontSize: '0.9rem' }}>
                      {activeTab === 'scheduled' 
                        ? 'Agende uma visita para conhecer pessoalmente os imóveis' 
                        : 'Suas visitas aparecerão aqui quando forem realizadas ou canceladas'
                      }
                    </p>
                  </div>
                ) : (
                  (activeTab === 'scheduled' ? scheduledVisits : activeTab === 'past' ? pastVisits : cancelledVisits).map((visit) => (
                    <div key={visit.id} style={{
                      background: 'white',
                      padding: '1.5rem',
                      borderRadius: 'var(--border-radius-lg)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      gap: '1.5rem'
                    }}>
                      {/* Property Image */}
                      <div style={{
                        width: '120px',
                        height: '100px',
                        borderRadius: 'var(--border-radius)',
                        overflow: 'hidden',
                        flexShrink: 0
                      }}>
                        <img 
                          src={visit.propertyImage} 
                          alt={visit.propertyName}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>

                      {/* Visit Info */}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                          <div>
                            <h3 style={{ margin: '0', color: 'var(--text-primary)' }}>
                              🏠 {visit.propertyName}
                            </h3>
                            <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                              📍 {visit.propertyAddress}
                            </p>
                          </div>
                          <span style={{
                            padding: '0.25rem 0.5rem',
                            borderRadius: 'var(--border-radius)',
                            backgroundColor: getStatusColor(visit.status),
                            color: getStatusTextColor(visit.status),
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                          }}>
                            {getStatusText(visit.status)}
                          </span>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                          <span>📅 {visit.visitDate}</span>
                          <span>🕐 {visit.visitTime}</span>
                          <span>⏱️ {visit.duration} min</span>
                          <span>📹 {visit.visitType === 'presencial' ? 'Presencial' : 'Online'}</span>
                          <span>💰 R$ {visit.price}</span>
                          <span>📐 {visit.area}</span>
                          <span>🛏️ {visit.rooms}</span>
                        </div>

                        {visit.observations && (
                          <p style={{ 
                            margin: '0.5rem 0', 
                            padding: '0.5rem', 
                            background: '#f8f9fa', 
                            borderRadius: 'var(--border-radius)', 
                            fontSize: '0.85rem',
                            color: 'var(--text-secondary)'
                          }}>
                            📝 {visit.observations}
                          </p>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            <span>👤 {visit.agentName}</span>
                            <span>📞 {visit.agentPhone}</span>
                            <span>📅 Solicitada: {visit.requestedDate}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {visit.status === 'agendada' && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(visit.id, 'confirmada')}
                              className="btn-advertise-secondary"
                              style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                            >
                              ✅ Confirmar
                            </button>
                            <button
                              onClick={() => handleEditVisit(visit)}
                              style={{
                                padding: '0.5rem 1rem',
                                fontSize: '0.8rem',
                                backgroundColor: 'var(--accent-color)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 'var(--border-radius)',
                                cursor: 'pointer'
                              }}
                            >
                              ✏️ Editar
                            </button>
                            <button
                              onClick={() => handleDeleteVisit(visit.id)}
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
                              ❌ Cancelar
                            </button>
                          </>
                        )}
                        {visit.status === 'confirmada' && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(visit.id, 'realizada')}
                              className="btn-advertise-primary"
                              style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                            >
                              ✅ Realizada
                            </button>
                            <button
                              onClick={() => handleEditVisit(visit)}
                              style={{
                                padding: '0.5rem 1rem',
                                fontSize: '0.8rem',
                                backgroundColor: 'var(--accent-color)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 'var(--border-radius)',
                                cursor: 'pointer'
                              }}
                            >
                              ✏️ Editar
                            </button>
                          </>
                        )}
                        {visit.status === 'realizada' && (
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                            Visita concluída
                          </div>
                        )}
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