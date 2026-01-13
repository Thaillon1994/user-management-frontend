import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserFromToken, removeToken } from "../utils/auth";
import Header from "../components/Header";
import "../styles/Homepage.css";

export default function Proposals() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');
  const [proposals, setProposals] = useState([]);
  const [showCreateProposal, setShowCreateProposal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newProposal, setNewProposal] = useState({
    propertyId: '',
    propertyName: '',
    propertyAddress: '',
    proposedValue: '',
    contractTerm: '12',
    startDate: '',
    observations: '',
    status: 'pendente',
    contactPhone: '',
    contactEmail: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getUserFromToken();
    console.log('Proposals - Current user:', currentUser);
    if (!currentUser) {
      console.log('Proposals - No user found, redirecting to login');
      navigate('/login');
      return;
    }
    setUser(currentUser);
    loadProposals();
  }, []);

  const loadProposals = async () => {
    setLoading(true);
    try {
      console.log('Loading proposals...');
      // Simulação de dados - substituir com API real
      const mockProposals = [
        {
          id: 1,
          propertyId: 1,
          propertyName: "Apartamento Cobertura",
          propertyAddress: "Rua das Palmeiras, 123 - Centro",
          propertyImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200",
          proposedValue: "2400",
          originalValue: "2500",
          contractTerm: "12",
          startDate: "01/11/2024",
          contactPhone: "(11) 99999-8888",
          contactEmail: "joao.silva@email.com",
          observations: "Proposta com desconto por pagamento adiantado",
          status: "pendente",
          submittedDate: "25/10/2024",
          ownerName: "Maria Oliveira",
          ownerPhone: "(11) 99999-7777",
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
          proposedValue: "4300",
          originalValue: "4500",
          contractTerm: "24",
          startDate: "15/11/2024",
          contactPhone: "(11) 99999-8888",
          contactEmail: "carlos.santos@email.com",
          observations: "Contrato de longo prazo, propriedade para empresa",
          status: "aceita",
          submittedDate: "20/10/2024",
          ownerName: "José Costa",
          ownerPhone: "(11) 99999-6666",
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
          proposedValue: "1100",
          originalValue: "1200",
          contractTerm: "6",
          startDate: "01/12/2024",
          contactPhone: "(11) 99999-8888",
          contactEmail: "ana.martins@email.com",
          observations: "Estudante, necessita de contrato curto",
          status: "recusada",
          submittedDate: "18/10/2024",
          ownerName: "Roberto Silva",
          ownerPhone: "(11) 99999-5555",
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
          proposedValue: "750",
          originalValue: "800",
          contractTerm: "12",
          startDate: "01/11/2024",
          contactPhone: "(11) 99999-8888",
          contactEmail: "pedro.fernandes@email.com",
          observations: "",
          status: "negociacao",
          submittedDate: "22/10/2024",
          ownerName: "Fernanda Lima",
          ownerPhone: "(11) 99999-4444",
          propertyType: "Kitnet",
          area: "25m²",
          rooms: "1 quarto"
        }
      ];
      console.log('Setting proposals:', mockProposals);
      setProposals(mockProposals);
    } catch (error) {
      console.error('Erro ao carregar propostas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProposal = () => {
    if (newProposal.propertyName && newProposal.proposedValue && newProposal.startDate) {
      const proposal = {
        id: proposals.length + 1,
        ...newProposal,
        propertyImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200",
        originalValue: "2500",
        submittedDate: new Date().toLocaleDateString('pt-BR'),
        ownerName: "Proprietário a definir",
        ownerPhone: "(11) 99999-8888",
        propertyType: "Imóvel",
        area: "-",
        rooms: "-"
      };
      setProposals([...proposals, proposal]);
      setNewProposal({
        propertyId: '',
        propertyName: '',
        propertyAddress: '',
        proposedValue: '',
        contractTerm: '12',
        startDate: '',
        observations: '',
        status: 'pendente',
        contactPhone: '',
        contactEmail: ''
      });
      setShowCreateProposal(false);
    }
  };




  const handleDeleteProposal = (proposalId) => {
    if (window.confirm("Tem certeza que deseja cancelar esta proposta?")) {
      setProposals(proposals.filter(proposal => proposal.id !== proposalId));
    }
  };

  const handleEditProposal = (proposal) => {
    setNewProposal(proposal);
    setShowCreateProposal(true);
  };

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendente': return 'rgba(255, 193, 7, 0.2)';
      case 'aceita': return 'rgba(40, 167, 69, 0.2)';
      case 'recusada': return 'rgba(220, 53, 69, 0.2)';
      case 'negociacao': return 'rgba(0, 123, 255, 0.2)';
      default: return 'rgba(108, 117, 125, 0.2)';
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'pendente': return '#FFD700';
      case 'aceita': return '#90EE90';
      case 'recusada': return '#FF6B6B';
      case 'negociacao': return '#87CEEB';
      default: return '#ADB5BD';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pendente': return '⏳ Pendente';
      case 'aceita': return '✅ Aceita';
      case 'recusada': return '❌ Recusada';
      case 'negociacao': return '🤝 Em Negociação';
      default: return status;
    }
  };

  const pendingProposals = proposals.filter(proposal => proposal.status === 'pendente' || proposal.status === 'negociacao');
  const acceptedProposals = proposals.filter(proposal => proposal.status === 'aceita');
  const rejectedProposals = proposals.filter(proposal => proposal.status === 'recusada');

  return (
    <div className="homepage">
      <Header user={user} onLogin={() => {}} onLogout={handleLogout} />
      
      <div className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="search-container" style={{ maxWidth: '1200px', width: '100%' }}>
            <h1 className="hero-title">📄 Propostas Enviadas</h1>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              Acompanhe o status das suas propostas de aluguel
            </p>

            {/* Tabs */}
            <div className="tab-switcher">
              <button 
                className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveTab('pending')}
              >
                Em Andamento ({pendingProposals.length})
              </button>
              <button 
                className={`tab-button ${activeTab === 'accepted' ? 'active' : ''}`}
                onClick={() => setActiveTab('accepted')}
              >
                Aceitas ({acceptedProposals.length})
              </button>
              <button 
                className={`tab-button ${activeTab === 'rejected' ? 'active' : ''}`}
                onClick={() => setActiveTab('rejected')}
              >
                Recusadas ({rejectedProposals.length})
              </button>
            </div>

            {/* Create Proposal Button */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <button 
                onClick={() => {
                  setNewProposal({
                    propertyId: '',
                    propertyName: '',
                    propertyAddress: '',
                    proposedValue: '',
                    contractTerm: '12',
                    startDate: '',
                    observations: '',
                    status: 'pendente',
                    contactPhone: '',
                    contactEmail: ''
                  });
                  setShowCreateProposal(!showCreateProposal);
                }}
                className="btn-advertise-primary"
                style={{ width: 'auto', padding: '0.75rem 1.5rem' }}
              >
                {showCreateProposal ? '➖ Cancelar' : '➕ Enviar Nova Proposta'}
              </button>
            </div>

            {/* Create Proposal Form */}
            {showCreateProposal && (
              <div style={{ 
                background: '#f8f9fa', 
                padding: '1.5rem', 
                borderRadius: 'var(--border-radius-lg)', 
                marginBottom: '2rem' 
              }}>
                <form onSubmit={(e) => { e.preventDefault(); handleCreateProposal(); }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label>Nome do Imóvel</label>
                      <input
                        type="text"
                        placeholder="Ex: Apartamento Cobertura"
                        value={newProposal.propertyName}
                        onChange={(e) => setNewProposal({...newProposal, propertyName: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Endereço</label>
                      <input
                        type="text"
                        placeholder="Rua, número, bairro"
                        value={newProposal.propertyAddress}
                        onChange={(e) => setNewProposal({...newProposal, propertyAddress: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Valor Proposto (R$/mês)</label>
                      <input
                        type="number"
                        placeholder="Ex: 2500"
                        value={newProposal.proposedValue}
                        onChange={(e) => setNewProposal({...newProposal, proposedValue: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Prazo do Contrato (meses)</label>
                      <select
                        value={newProposal.contractTerm}
                        onChange={(e) => setNewProposal({...newProposal, contractTerm: e.target.value})}
                      >
                        <option value="6">6 meses</option>
                        <option value="12">12 meses</option>
                        <option value="18">18 meses</option>
                        <option value="24">24 meses</option>
                        <option value="36">36 meses</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Data de Início</label>
                      <input
                        type="date"
                        value={newProposal.startDate}
                        onChange={(e) => setNewProposal({...newProposal, startDate: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Telefone de Contato</label>
                      <input
                        type="tel"
                        placeholder="(00) 00000-0000"
                        value={newProposal.contactPhone}
                        onChange={(e) => setNewProposal({...newProposal, contactPhone: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email de Contato</label>
                      <input
                        type="email"
                        placeholder="seu@email.com"
                        value={newProposal.contactEmail}
                        onChange={(e) => setNewProposal({...newProposal, contactEmail: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group" style={{ marginTop: '1rem' }}>
                    <label>Observações</label>
                    <textarea
                      placeholder="Informações adicionais sobre a proposta..."
                      value={newProposal.observations}
                      onChange={(e) => setNewProposal({...newProposal, observations: e.target.value})}
                      rows="3"
                      style={{ resize: 'vertical' }}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="login-button"
                    style={{ width: 'auto', padding: '0.75rem 2rem', marginTop: '1rem' }}
                  >
                    Enviar Proposta
                  </button>
                </form>
              </div>
            )}

            {/* Content */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                <p>🔄 Carregando propostas...</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {(activeTab === 'pending' ? pendingProposals : activeTab === 'accepted' ? acceptedProposals : rejectedProposals).length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                    <p>📭 {activeTab === 'pending' ? 'Nenhuma proposta em andamento' : activeTab === 'accepted' ? 'Nenhuma proposta aceita' : 'Nenhuma proposta recusada'}</p>
                    <p style={{ fontSize: '0.9rem' }}>
                      {activeTab === 'pending' 
                        ? 'Envie uma proposta para iniciar a negociação' 
                        : 'Suas propostas aparecerão aqui quando forem respondidas'
                      }
                    </p>
                  </div>
                ) : (
                  (activeTab === 'pending' ? pendingProposals : activeTab === 'accepted' ? acceptedProposals : rejectedProposals).map((proposal) => (
                    <div key={proposal.id} style={{
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
                          src={proposal.propertyImage} 
                          alt={proposal.propertyName}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>

                      {/* Proposal Info */}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                          <div>
                            <h3 style={{ margin: '0', color: 'var(--text-primary)' }}>
                              🏠 {proposal.propertyName}
                            </h3>
                            <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                              📍 {proposal.propertyAddress}
                            </p>
                          </div>
                          <span style={{
                            padding: '0.25rem 0.5rem',
                            borderRadius: 'var(--border-radius)',
                            backgroundColor: getStatusColor(proposal.status),
                            color: getStatusTextColor(proposal.status),
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                          }}>
                            {getStatusText(proposal.status)}
                          </span>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                          <span>💰 Proposta: R$ {Number(proposal.proposedValue).toLocaleString('pt-BR')}</span>
                          <span>🏷️ Original: R$ {Number(proposal.originalValue).toLocaleString('pt-BR')}</span>
                          <span>📅 {proposal.contractTerm} meses</span>
                          <span>🚪 Início: {proposal.startDate}</span>
                          <span>📐 {proposal.area}</span>
                          <span>🛏️ {proposal.rooms}</span>
                        </div>

                        {proposal.observations && (
                          <p style={{ 
                            margin: '0.5rem 0', 
                            padding: '0.5rem', 
                            background: '#f8f9fa', 
                            borderRadius: 'var(--border-radius)', 
                            fontSize: '0.85rem',
                            color: 'var(--text-secondary)'
                          }}>
                            📝 {proposal.observations}
                          </p>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            <span>👤 {proposal.ownerName}</span>
                            <span>📞 {proposal.ownerPhone}</span>
                            <span>📅 Enviada: {proposal.submittedDate}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {proposal.status === 'pendente' && (
                          <>
                            <button
                              onClick={() => handleEditProposal(proposal)}
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
                              onClick={() => handleDeleteProposal(proposal.id)}
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
                        {proposal.status === 'negociacao' && (
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                            🤝 Em negociação
                          </div>
                        )}
                        {proposal.status === 'aceita' && (
                          <button
                            className="btn-advertise-primary"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                          >
                            📋 Contrato
                          </button>
                        )}
                        {proposal.status === 'recusada' && (
                          <button
                            onClick={() => handleCreateProposal()}
                            className="btn-advertise-secondary"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                          >
                            🔄 Nova Proposta
                          </button>
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