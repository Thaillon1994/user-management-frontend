import { useState } from 'react';
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
      
      if (!response.ok) {
        throw new Error('Email ou senha incorretos');
      }
      
      const result = await response.json();
      localStorage.setItem('token', result.accessToken);
      window.location.reload(); // Recarrega para atualizar o estado do usuário
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="search-container">
          <div className="tab-switcher">
            <button 
              className={`tab-button ${activeTab === 'search' ? 'active' : ''}`}
              onClick={() => setActiveTab('search')}
            >
              Buscar Imóveis
            </button>
            <button 
              className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => navigate('/login')}
            >
              Área do Cliente
            </button>
            <button 
              className={`tab-button ${activeTab === 'advertise' ? 'active' : ''}`}
              onClick={() => setActiveTab('advertise')}
            >
              Anunciar Imóvel
            </button>
          </div>

          {activeTab === 'search' ? (
            <>
              <h1 className="hero-title">
                Encontre seu lar ideal<br />
                na Smart Rent Aluguel Consignado
              </h1>
              
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

                <div className="search-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
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
                      </select>
                    </div>
                  </div>
                </div>

                <button type="submit" className="search-button">
                  Buscar imóveis
                </button>
                <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Encontrou um imóvel de interesse? <a href="/register" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '600' }}>Cadastre-se</a> para continuar!
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
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => handleLoginInputChange('password', e.target.value)}
                    required
                  />
                </div>
                
                <button type="submit" className="login-button">
                  Entrar
                </button>
                
                 <div className="login-footer">
                   <span>
                     Não tem conta?{" "}
                     <a href="/register" className="register-link">
                       Cadastre-se gratuitamente
                     </a>
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
              <p className="advertise-description">
                Alcance milhares de pessoas interessadas em alugar ou comprar imóveis
              </p>
               <div className="advertise-actions">
                 <a href="/register" className="btn-advertise-primary" style={{ textDecoration: 'none' }}>
                   Começar anúncio
                 </a>
                 <button className="btn-advertise-secondary">
                   Saiba mais
                 </button>
               </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}