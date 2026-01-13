import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection({ onSearch }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('search');
  const [propertyType, setPropertyType] = useState('rent');
  const [searchData, setSearchData] = useState({
    city: '',
    neighborhood: '',
    maxPrice: '',
    minRooms: ''
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');

  // Enhanced property data with complete information
  const exampleProperties = useMemo(() => [
    {
      id: 1,
      nome: "Casa de Luxo - Morumbi",
      endereco: "Rua Gonçalves Dias, 2450 - Morumbi, São Paulo",
      tipo: "Aluguel",
      quartos: 4,
      area: 200,
      vagas: 3,
      valorMensal: 4500,
      dataPostagem: "15/01/2024",
      imagem: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?w=800&h=600&fit=crop",
      descricao: "Casa de luxo com acabamento premium, localização nobre em Morumbi. Piscina aquecida, salão de festas, jardim amplo e segurança 24h. Ideal para famílias exigentes.",
      caracteristicas: ["4 suítes", "Piscina aquecida", "Churrasqueira", "Jardim", "Salão de festas", "Segurança 24h", "Garagem p/3 carros"],
      condominio: 850,
      iptu: 420,
      localizacao: {
        bairro: "Morumbi",
        cidade: "São Paulo",
        estado: "SP",
        proximidades: ["Shopping Morumbi", "Parque do Ibirapuera", "Metrô Morumbi"],
        regiao: "Zona Sul"
      },
      status: "Disponível",
      codigo: "LUX001",
      destaque: true
    },
    {
      id: 2,
      nome: "Loft Colonial - Vila Madalena",
      endereco: "Rua Madalena, 180 - Vila Madalena, São Paulo",
      tipo: "Aluguel",
      quartos: 2,
      area: 85,
      vagas: 1,
      valorMensal: 2800,
      dataPostagem: "20/01/2024",
      imagem: "https://images.pexels.com/photos/1063993/pexels-photo-1063993.jpeg?w=800&h=600&fit=crop",
      descricao: "Loft com pé direito duplo e vista panorâmica. Design industrial moderno com tijolos aparentes, sistema de iluminação natural e ambientes integrados.",
      caracteristicas: ["Pé direito duplo", "Alta Pé-direito", "Vista Panorâmica", "Cozinha Americana", "Ar Condicionado", "Armários embutidos"],
      condominio: 420,
      iptu: 210,
      localizacao: {
        bairro: "Vila Madalena",
        cidade: "São Paulo",
        estado: "SP",
        proximidades: ["Metrô Vila Madalena", "Pinacoteca", "Praça Roosevelt"],
        regiao: "Zona Oeste"
      },
      status: "Disponível",
      codigo: "LOFT002",
      destaque: true
    },
    {
      id: 3,
      nome: "Apartamento Triplex - Pinheiros",
      endereco: "Rua dos Pinheiros, 890 - Pinheiros, São Paulo",
      tipo: "Aluguel",
      quartos: 3,
      area: 150,
      vagas: 2,
      valorMensal: 3200,
      dataPostagem: "10/01/2024",
      imagem: "https://images.pexels.com/photos/1648777/pexels-photo-1648777.jpeg?w=800&h=600&fit=crop",
      descricao: "Triplex exclusivo com 3 suítes, varanda gourmet e vista privilegiada. Condomínio com piscina, academia e área de lazer completa.",
      caracteristicas: ["3 suítes", "Varanda Gourmet", "Piscina", "Academia", "Salão de Jogos", "Portaria 24h"],
      condominio: 680,
      iptu: 340,
      localizacao: {
        bairro: "Pinheiros",
        cidade: "São Paulo",
        estado: "SP",
        proximidades: ["Shopping Pinheiros", "Parque Estadual", "Terminal Pinheiros"],
        regiao: "Zona Sul"
      },
      status: "Disponível",
      codigo: "TRI003",
      destaque: true
    },
    {
      id: 4,
      nome: "Flat Esmeralda - Itaim Bibi",
      endereco: "Rua Esmeralda, 450 - Itaim Bibi, São Paulo",
      tipo: "Aluguel",
      quartos: 1,
      area: 42,
      vagas: 0,
      valorMensal: 1800,
      dataPostagem: "05/12/2024",
      imagem: "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?w=800&h=600&fit=crop",
      descricao: "Flat moderno e otimizado para jovens profisionais. Mobiliado planejado, sacada privativa e localização estratégica com fácil acesso à Marginal Pinheiros.",
      caracteristicas: ["Mobiliado Planejado", "Sacada Privativa", "Home Office", "Internet Fibra", "Ar Condicionado"],
      condominio: 380,
      iptu: 180,
      localizacao: {
        bairro: "Itaim Bibi",
        cidade: "São Paulo",
        estado: "SP",
        proximidades: ["Marginal Pinheiros", "Shopping D&D", "Hospital Israelita"],
        regiao: "Zona Sul"
      },
      status: "Disponível",
      codigo: "FLAT004",
      destaque: false
    },
    {
      id: 5,
      nome: "Chácara Repblica - Alto da Boa Vista",
      endereco: "Rua República do Líbano, 2650 - Alto da Boa Vista, São Paulo",
      tipo: "Aluguel",
      quartos: 5,
      area: 350,
      vagas: 4,
      valorMensal: 5500,
      dataPostagem: "01/02/2024",
      imagem: "https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?w=800&h=600&fit=crop",
      descricao: "Chácara com arquitetura histórica preservada, amplos jardins, piscina olímpica e casa de eventos. Perfeita para grandes celebrações e convívios.",
      caracteristicas: ["5 quartos", "2 suítes", "Piscina Olímpica", " Jardins Amplos", "Casa de Eventos", "Churrasqueira Profissional", "Garagem p/4 carros"],
      condominio: 1200,
      iptu: 600,
      localizacao: {
        bairro: "Alto da Boa Vista",
        cidade: "São Paulo",
        estado: "SP",
        proximidades: "Shopping ABC Plaza", "Parque Villa-Lobos", "Campo de Golfe"],
        regiao: "Grande São Paulo"
      },
      status: "Disponível",
      codigo: "CHA005",
      destaque: true
    },
    {
      id: 6,
      nome: "Studio Designer - Higienópolis",
      endereco: "Rua Prudente de Moraes, 400 - Higienópolis, São Paulo",
      tipo: "Aluguel",
      quartos: 1,
      area: 38,
      vagas: 0,
      valorMensal: 1600,
      dataPostagem: "25/12/2023",
      imagem: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?w=800&h=600&fit=crop",
      descricao: "Studio com design premium, totalmente planejado por arquiteto. Acabamento de alto padrão, cozinha com eletrodomésticos e varanda com vista privilegiada.",
      caracteristicas: ["Design por Arquiteto", "Acabamento Premium", "Eletrodomésticos", "Varanda Privativa", "Ar Condicionado", "Armários embutidos"],
      condominio: 290,
      iptu: 145,
      localizacao: {
        bairro: "Higienópolis",
        cidade: "São Paulo",
        estado: "SP",
        proximidades: ["Shopping Higienópolis", "Parque Cecap", "Faculdades"],
        regiao: "Grande São Paulo"
      },
      status: "Disponível",
      codigo: "STD006",
      destaque: false
    }
  ], []);

  useEffect(() => {
    setProperties(exampleProperties);
  }, [exampleProperties]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      ...searchData,
      propertyType,
      maxPrice: searchData.maxPrice ? parseFloat(searchData.maxPrice) : undefined,
      minRooms: searchData.minRooms ? parseInt(searchData.minRooms) : undefined
    });
  };

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  const handleLoginInputChange = (field, value) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
    setLoginError('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoginError('');
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
      });
      
      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('token', result.accessToken);
        window.location.href = '/home';
      } else {
        throw new Error('Email ou senha incorretos');
      }
    } catch (error) {
      setLoginError(error.message || 'Credenciais inválidas');
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="search-container">
          {/* Tab Switcher - Enhanced Design */}
          <div className="tab-switcher">
            <button 
              className={`tab-button ${activeTab === 'search' ? 'active' : ''}`}
              onClick={() => setActiveTab('search')}
            >
              🔍 Buscar Imóveis
            </button>
            <button 
              className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => navigate('/login')}
            >
              🏠 Minha Área
            </button>
            <button 
              className={`tab-button ${activeTab === 'advertise' ? 'active' : ''}`}
              onClick={() => setActiveTab('advertise')}
            >
              📢 Anunciar Imóvel
            </button>
          </div>

          {activeTab === 'search' ? (
            <>
              <div className="property-type-tabs">
                <button 
                  className={`type-tab ${propertyType === 'rent' ? 'active' : ''}`}
                  onClick={() => setPropertyType('rent')}
                >
                  Alugar
                </button>
                <button 
                  className={`type-tab ${propertyType === 'buy' ? 'active' : ''}`}
                  onClick={() => setPropertyType('buy')}
                >
                  Comprar
                </button>
              </div>

              <h1 className="hero-title">
                Encontre seu lar ideal<br />
                na Smart Rent Aluguel Consignado
              </h1>
              
              <form onSubmit={handleSubmit} className="search-form">
                <div className="form-group">
                  <label htmlFor="city">Cidade</label>
                  <div className="input-with-icon">
                    <span className="input-icon">🏙️</span>
                    <input
                      id="city"
                      type="text"
                      placeholder="Busque por cidade"
                      value={searchData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="neighborhood">Bairro</label>
                  <div className="input-with-icon">
                    <span className="input-icon">📍</span>
                    <input
                      id="neighborhood"
                      type="text"
                      placeholder="Busque por bairro"
                      value={searchData.neighborhood}
                      onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                    />
                  </div>
                </div>

                <div className="search-row">
                  <div className="form-group">
                    <label htmlFor="maxPrice">Valor máximo</label>
                    <div className="input-with-icon">
                      <span className="input-icon">💰</span>
                      <input
                        id="maxPrice"
                        type="number"
                        placeholder="Digite o valor máximo"
                        value={searchData.maxPrice}
                        onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                        min="0"
                        step="100"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="minRooms">Quartos</label>
                    <div className="input-with-icon">
                      <span className="input-icon">🛏️</span>
                      <select
                        id="minRooms"
                        value={searchData.minRooms}
                        onChange={(e) => handleInputChange('minRooms', e.target.value)}
                      >
                        <option value="">N° quartos</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">5+</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button type="submit" className="search-button">
                  🔍 Buscar imóveis
                </button>
                
                <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Encontrou um imóvel de interesse? <Link to="/register" style={{ color: 'var(--primary-blue)', textDecoration: 'none', fontWeight: '600' }}>Cadastre-se</Link> para ter acesso exclusivo!
                </p>
              </form>
            </>
          ) : activeTab === 'login' ? (
            <div className="login-content">
              <h1 className="hero-title">
                Acessar sua conta<br />
                na Smart Rent Aluguel Consignado
              </h1>
              <p className="login-description">
                Entre para gerenciar seus imóveis, consignações e acompanhar sua área exclusiva
              </p>
              
              <form onSubmit={handleLoginSubmit} className="login-form">
                {loginError && (
                  <div className="login-error">
                    {loginError}
                  </div>
                )}
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={loginData.email}
                    onChange={(e) => handleLoginInputChange('email', e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="password">Senha</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="•••••••"
                    value={loginData.password}
                    onChange={(e) => handleLoginInputChange('password', e.target.value)}
                    required
                  />
                </div>
                
                <button type="submit" className="search-button">
                  🏠 Acessar minha conta
                </button>
                
                 <div className="login-footer">
                   <span>
                     Não tem conta?{" "}
                     <Link to="/register" className="register-link">
                       Cadastre-se gratuitamente
                     </Link>
                   </span>
                 </div>
              </form>
            </div>
          ) : (
            <div className="advertise-content">
              <h1 className="hero-title">
                Anuncie seu imóvel<br />
                na Smart Rent Aluguel Consignado
              </h1>
              <p className="login-description">
                Alcance milhares de pessoas interessadas em alugar ou comprar imóveis
              </p>
               
              <div className="advertise-actions">
                <button className="search-button">
                  📢 Começar anúncio
                </button>
                <button className="btn-login" style={{ marginLeft: '1rem' }}>
                  📋 Saiba mais
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}