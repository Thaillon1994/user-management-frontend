import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserFromToken, removeToken } from "../utils/auth";
import Header from "../components/Header";
import "../styles/Homepage.css";

export default function Favorites() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('favorites');
  const [favorites, setFavorites] = useState([]);
  const [lists, setLists] = useState([]);
  const [showCreateList, setShowCreateList] = useState(false);
  const [newListName, setNewListName] = useState('');

  const [loading, setLoading] = useState(true);

  console.log('Favorites component - Current state:', { user, loading, activeTab });

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getUserFromToken();
    console.log('Favorites - Current user:', currentUser);
    if (!currentUser) {
      console.log('Favorites - No user found, setting mock user');
      // Usuário não autenticado
      navigate('/login');
      return;
    }
    setUser(currentUser);
    loadFavorites();
    loadLists();
  }, [navigate]);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      console.log('Loading favorites...');
      // Simulação de dados - substituir com API real
      const mockFavorites = [
        {
          id: 1,
          nome: "Apartamento Cobertura",
          endereco: "Rua das Palmeiras, 123 - Centro",
          valorMensal: 2500,
          imagem: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300",
          quartos: 3,
          suites: 2,
          vagas: 2,
          area: 120,
          dataAdicao: "15/10/2024"
        },
        {
          id: 2,
          nome: "Casa com Piscina",
          endereco: "Condomínio Villa Verde, 45 - Jardins",
          valorMensal: 4500,
          imagem: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300",
          quartos: 4,
          suites: 3,
          vagas: 3,
          area: 280,
          dataAdicao: "20/10/2024"
        }
      ];
      console.log('Setting favorites:', mockFavorites);
      setFavorites(mockFavorites);
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadLists = async () => {
    try {
      console.log('Loading lists...');
      // Simulação de dados - substituir com API real
      const mockLists = [
        {
          id: 1,
          nome: "Imóveis para Verificar",
          descricao: "Imóveis que pretendo visitar na próxima semana",
          propriedades: 5,
          criadaEm: "10/10/2024",
          ultimaModificacao: "22/10/2024"
        },
        {
          id: 2,
          nome: "Opções de Verão",
          descricao: "Imóveis com ar condicionado e piscina",
          propriedades: 3,
          criadaEm: "15/10/2024",
          ultimaModificacao: "20/10/2024"
        }
      ];
      console.log('Setting lists:', mockLists);
      setLists(mockLists);
    } catch (error) {
      console.error('Erro ao carregar listas:', error);
    }
  };

  const handleCreateList = () => {
    if (newListName.trim()) {
      const newList = {
        id: lists.length + 1,
        nome: newListName,
        descricao: "",
        propriedades: 0,
        criadaEm: new Date().toLocaleDateString('pt-BR'),
        ultimaModificacao: new Date().toLocaleDateString('pt-BR')
      };
      setLists([...lists, newList]);
      setNewListName('');
      setShowCreateList(false);
    }
  };

  const handleRemoveFavorite = (propertyId) => {
    setFavorites(favorites.filter(fav => fav.id !== propertyId));
  };

  const handleRemoveList = (listId) => {
    setLists(lists.filter(list => list.id !== listId));
  };

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  console.log('Favorites - Rendering component');
  
  return (
    <div className="homepage">
      <Header user={user} onLogin={() => {}} onLogout={handleLogout} />
      
      <div className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="search-container" style={{ maxWidth: '1200px', width: '100%' }}>
            <h1 className="hero-title">❤️ Favoritos e Listas</h1>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              Organize e acompanhe os imóveis que você mais gostou
            </p>

            {/* Tabs */}
            <div className="tab-switcher">
              <button 
                className={`tab-button ${activeTab === 'favorites' ? 'active' : ''}`}
                onClick={() => setActiveTab('favorites')}
              >
                Meus Favoritos ({favorites.length})
              </button>
              <button 
                className={`tab-button ${activeTab === 'lists' ? 'active' : ''}`}
                onClick={() => setActiveTab('lists')}
              >
                Minhas Listas ({lists.length})
              </button>
            </div>

            {/* Content */}
            {activeTab === 'favorites' ? (
              <div>
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                    <p>🔄 Carregando favoritos...</p>
                  </div>
                ) : favorites.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                    <p>📭 Você ainda não tem imóveis favoritos</p>
                    <Link to="/" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '600' }}>
                      Buscar imóveis
                    </Link>
                  </div>
                ) : (
                  <div className="property-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
                    {favorites.map((property) => (
                      <div key={property.id} className="property-card" style={{ marginBottom: 0 }}>
                        <div className="property-image">
                          <img src={property.imagem} alt={property.nome} />
                          <div className="property-type-tag">Favorito</div>
                        </div>
                        <div className="property-content">
                          <h3 className="property-title">{property.nome}</h3>
                          <p className="property-address">📍 {property.endereco}</p>
                          <div className="property-features">
                            <span className="feature">🛏️ {property.quartos} quartos</span>
                            <span className="feature">🚿 {property.suites} suítes</span>
                            <span className="feature">🚗 {property.vagas} vagas</span>
                            <span className="feature">📐 {property.area}m²</span>
                          </div>
                          <div className="property-price">
                            <span className="price-value">R$ {property.valorMensal.toLocaleString('pt-BR')}</span>
                            <span className="price-period">/mês</span>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                            <button className="btn-advertise-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                              📅 Agendar Visita
                            </button>
                            <button 
                              onClick={() => handleRemoveFavorite(property.id)}
                              style={{ 
                                padding: '0.5rem 1rem', 
                                fontSize: '0.9rem',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: 'var(--border-radius)',
                                cursor: 'pointer'
                              }}
                            >
                              💔 Remover
                            </button>
                          </div>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                            Adicionado em: {property.dataAdicao}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                {/* Create List Button */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <button 
                    onClick={() => setShowCreateList(!showCreateList)}
                    className="btn-advertise-primary"
                    style={{ width: 'auto', padding: '0.75rem 1.5rem' }}
                  >
                    {showCreateList ? '➖ Cancelar' : '➕ Criar Nova Lista'}
                  </button>
                </div>

                {/* Create List Form */}
                {showCreateList && (
                  <div style={{ 
                    background: '#f8f9fa', 
                    padding: '1.5rem', 
                    borderRadius: 'var(--border-radius-lg)', 
                    marginBottom: '2rem' 
                  }}>
                    <div className="form-group">
                      <label>Nome da Lista</label>
                      <input
                        type="text"
                        placeholder="Ex: Imóveis para Verificar"
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        style={{ maxWidth: '400px' }}
                      />
                    </div>
                    <button 
                      onClick={handleCreateList}
                      className="login-button"
                      style={{ width: 'auto', padding: '0.75rem 2rem' }}
                    >
                      Criar Lista
                    </button>
                  </div>
                )}

                {lists.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                    <p>📋 Você ainda não criou nenhuma lista</p>
                    <p style={{ fontSize: '0.9rem' }}>Crie listas para organizar seus imóveis favoritos por categorias</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {lists.map((list) => (
                      <div key={list.id} style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: 'var(--border-radius-lg)',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
                            📋 {list.nome}
                          </h3>
                          {list.descricao && (
                            <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                              {list.descricao}
                            </p>
                          )}
                          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            <span>📊 {list.propriedades} imóveis</span>
                            <span>📅 Criada: {list.criadaEm}</span>
                            <span>✏️ Atualizada: {list.ultimaModificacao}</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn-advertise-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                            Ver Lista
                          </button>
                          <button 
                            onClick={() => handleRemoveList(list.id)}
                            style={{ 
                              padding: '0.5rem 1rem', 
                              fontSize: '0.9rem',
                              backgroundColor: '#dc3545',
                              color: 'white',
                              border: 'none',
                              borderRadius: 'var(--border-radius)',
                              cursor: 'pointer'
                            }}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}