import React, { useState } from 'react';

export default function ModernGallery() {
  const [selectedProperty, setSelectedProperty] = useState(null);

  const properties = [
    {
      id: 1,
      title: "Casa Familiar 3 Quartos",
      address: "Jardim São Paulo, São Paulo",
      price: "R$ 2.800/mês",
      area: "120m²",
      rooms: "3",
      type: "casa",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["Piscina", "Churrasqueira", "2 vagas", "Jardim"],
      condominio: 0,
      iptu: 180,
      andar: "Térreo",
      totalAndares: null
    },
    {
      id: 2,
      title: "Apartamento 2 Quartos",
      address: "Moema, São Paulo", 
      price: "R$ 3.200/mês",
      area: "68m²",
      rooms: "2",
      type: "apartamento",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["Sacada", "Vaga coberta", "Fitness", "Playground"],
      condominio: 420,
      iptu: 250,
      andar: 8,
      totalAndares: 15
    },
    {
      id: 3,
      title: "Sobrado com Piscina",
      address: "Alphaville, Barueri",
      price: "R$ 5.500/mês", 
      area: "180m²",
      rooms: "4",
      type: "casa",
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["Piscina aquecida", "4 suítes", "Home office", "Jardim"],
      condominio: 650,
      iptu: 420,
      andar: "Sobrado",
      totalAndares: null
    },
    {
      id: 4,
      title: "Studio Moderno",
      address: "Vila Madalena, São Paulo",
      price: "R$ 2.100/mês",
      area: "42m²", 
      rooms: "1",
      type: "studio",
      image: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["Mobiliado", "Ar condicionado", "Cozinha americana"],
      condominio: 280,
      iptu: 150,
      andar: 5,
      totalAndares: 10
    },
    {
      id: 5,
      title: "Casa de Campo",
      address: "Campo Limpo, São Paulo",
      price: "R$ 4.200/mês",
      area: "200m²",
      rooms: "5", 
      type: "casa",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["Grande quintal", "4 vagas", "Área de serviço", "Churrasqueira"],
      condominio: 0,
      iptu: 320,
      andar: "Térreo",
      totalAndares: null
    },
    {
      id: 6,
      title: "Kitnet Econômica",
      address: "Brás, São Paulo",
      price: "R$ 1.600/mês",
      area: "30m²",
      rooms: "1",
      type: "kitnet", 
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["Cozinha planejada", "Armários embutidos", "Segurança 24h"],
      condominio: 220,
      iptu: 95,
      andar: 4,
      totalAndares: 8
    },
    {
      id: 7,
      title: "Casa em Condomínio",
      address: "Itaquera, São Paulo",
      price: "R$ 2.900/mês",
      area: "140m²",
      rooms: "3",
      type: "casa",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
      features: ["Piscina", "Salão de festas", "3 suítes", "Playground"],
      condominio: 480,
      iptu: 280,
      andar: "Térreo",
      totalAndares: null
    },
    {
      id: 8,
      title: "Apartamento de Luxo",
      address: "Jardins, São Paulo",
      price: "R$ 7.800/mês",
      area: "95m²",
      rooms: "3",
      type: "apartamento",
      image: "https://images.unsplash.com/photo-1600047509357-2dc448579b5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      features: ["3 suítes", "Sacada gourmet", "Concierge", "Fitness"],
      condominio: 850,
      iptu: 520,
      andar: 12,
      totalAndares: 20
    }
  ];

  const getTypeIcon = (type) => {
    const icons = {
      studio: "🏠",
      apartamento: "🏢", 
      casa: "🏘️",
      loft: "🏗️",
      cobertura: "🌟",
      kitnet: "🏠"
    };
    return icons[type] || "🏠";
  };

  const getTypeLabel = (type) => {
    const labels = {
      studio: "Studio",
      apartamento: "Apartamento", 
      casa: "Casa",
      loft: "Loft",
      cobertura: "Cobertura",
      kitnet: "Kitnet"
    };
    return labels[type] || "Imóvel";
  };

  return (
    <div className="modern-gallery-container">
      <div className="gallery-header">
        <h2 className="gallery-title">Descubra seu novo lar</h2>
        <p className="gallery-subtitle">Mais de 8 opções exclusivas esperando por você</p>
      </div>

      <div className="gallery-grid">
        {properties.map((property) => (
          <div 
            key={property.id}
            className={`property-card-regular`}
            onClick={() => setSelectedProperty(property)}
          >
            <div className="property-image-container">
              <img 
                src={property.image} 
                alt={property.title}
                className="property-image"
              />
              <div className="property-overlay">
                <div className="property-type">
                  {getTypeIcon(property.type)} {getTypeLabel(property.type)}
                </div>
                <div className="property-price">{property.price}</div>
              </div>
            </div>
            
            <div className="property-content">
              <h3 className="property-title">{property.title}</h3>
              <p className="property-address">📍 {property.address}</p>
              
              <div className="property-specs">
                <span className="spec-item">📐 {property.area}</span>
                <span className="spec-item">🛏️ {property.rooms} {property.rooms === '1' ? 'quarto' : 'quartos'}</span>
              </div>
              
              <div className="property-details">
                <div className="detail-row">
                  <span className="detail-label">Condomínio:</span>
                  <span className="detail-value">R$ {property.condominio?.toFixed(0).replace('.', ',')}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">IPTU:</span>
                  <span className="detail-value">R$ {property.iptu?.toFixed(0).replace('.', ',')}/ano</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Andar:</span>
                  <span className="detail-value">{property.andar}{property.totalAndares ? `/${property.totalAndares}` : ''}</span>
                </div>
              </div>
              
              <div className="property-price">
                <div className="price-main">
                  <span className="price-value">
                    R$ {parseInt(property.price.replace(/[^\d]/g, '')).toFixed(0).replace('.', ',')}
                  </span>
                  <span className="price-period">/mês</span>
                </div>
                <div className="price-total">
                  Total R$ {(parseInt(property.price.replace(/[^\d]/g, '')) + property.condominio + (property.iptu/12)).toFixed(0).replace('.', ',')}/mês
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProperty && (
        <div className="property-modal" onClick={() => setSelectedProperty(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProperty(null)}>×</button>
            <img src={selectedProperty.image} alt={selectedProperty.title} />
            <div className="modal-info">
              <h2>{selectedProperty.title}</h2>
              <p className="modal-address">📍 {selectedProperty.address}</p>
              <div className="modal-price">{selectedProperty.price}</div>
              <div className="modal-features">
                <div className="modal-spec">📐 {selectedProperty.area}</div>
                <div className="modal-spec">🛏️ {selectedProperty.rooms} {selectedProperty.rooms === '1' ? 'quarto' : 'quartos'}</div>
              </div>
              <div className="modal-details">
                <div className="modal-detail-row">
                  <span className="modal-detail-label">Condomínio:</span>
                  <span className="modal-detail-value">R$ {selectedProperty.condominio?.toFixed(0).replace('.', ',')}</span>
                </div>
                <div className="modal-detail-row">
                  <span className="modal-detail-label">IPTU:</span>
                  <span className="modal-detail-value">R$ {selectedProperty.iptu?.toFixed(0).replace('.', ',')}/ano</span>
                </div>
                <div className="modal-detail-row">
                  <span className="modal-detail-label">Andar:</span>
                  <span className="modal-detail-value">{selectedProperty.andar}{selectedProperty.totalAndares ? `/${selectedProperty.totalAndares}` : ''}</span>
                </div>
              </div>
              <div className="modal-features-list">
                {selectedProperty.features.map((feature, idx) => (
                  <span key={idx} className="modal-feature">{feature}</span>
                ))}
              </div>
              <button className="modal-cta">Agendar visita</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}