import { useState, useEffect, useMemo } from 'react';

export default function PropertySection() {
  const [properties, setProperties] = useState([]);

  // Dados de exemplo para exibir enquanto API não está disponível
  const exampleProperties = useMemo(() => [
    {
      id: 1,
      nome: "Casa Moderna 3 Quartos - Vila Leopoldina",
      endereco: "Rua Corifeu de Azevedo Marques, 2450 - Vila Leopoldina, São Paulo",
      tipo: "Aluguel",
      quartos: 3,
      area: 120,
      vagas: 2,
      valorMensal: 3200,
      imagem: "/src/assets/home-DO80yzNA.png",
      descricao: "Casa moderna com acabamento de altíssima qualidade, perfeita para famílias.",
      caracteristicas: ["3 suítes", "Piscina", "Churrasqueira"],
      condominio: 450,
      iptu: 280
    },
    {
      id: 2,
      nome: "Apartamento 2 Quartos - Tatuapé",
      endereco: "Rua Tuiuti, 820 - Tatuapé, São Paulo",
      tipo: "Aluguel",
      quartos: 2,
      area: 68,
      vagas: 1,
      valorMensal: 2400,
      imagem: "/src/assets/home-DO80yzNA.png",
      descricao: "Apartamento excelente próximo ao metrô Carrão.",
      caracteristicas: ["2 suítes", "Sacada", "Fitness"],
      condominio: 380,
      iptu: 180
    }
  ], []);

  useEffect(() => {
    // Usar dados de exemplo
    setProperties(exampleProperties);
  }, [exampleProperties]);

  return (
    <section className="property-section">
      <div className="container">
        <div className="promotion-banner">
          <h3 className="promotion-title">🔥 Anúncios em Destaque</h3>
          <p className="promotion-text">Imóveis selecionados pela Smart Rent com condições especiais</p>
          <div className="promotion-badges">
            <span className="promotion-badge">Sem Taxa</span>
            <span className="promotion-badge">Documentação Grátis</span>
            <span className="promotion-badge">Visita Imediata</span>
          </div>
        </div>
        
        <h2 className="section-title">Imóveis em destaque</h2>
        <div className="property-grid">
          {properties.map((property) => (
            <div key={property.id} className="property-card">
              <div className="property-image">
                <img src={property.imagem} alt={property.nome} />
                <div className="property-type-tag">Apartamento</div>
              </div>
              <div className="property-content">
                <h3 className="property-title">{property.nome}</h3>
                <p className="property-address">{property.endereco}</p>
                <div className="property-features">
                  {property.caracteristicas.map((feature, index) => (
                    <span key={index} className="feature">{feature}</span>
                  ))}
                </div>
                <div className="property-details">
                  <div className="detail-row">
                    <span className="detail-label">Área</span>
                    <span className="detail-value">{property.area}m²</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Quartos</span>
                    <span className="detail-value">{property.quartos}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Vagas</span>
                    <span className="detail-value">{property.vagas}</span>
                  </div>
                </div>
                <div className="property-price">
                  <span className="price-value">R$ {property.valorMensal.toLocaleString('pt-BR')}</span>
                  <span className="price-period">/mês</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="section-cta">
          <button className="btn-view-more" onClick={() => window.location.href = '/imoveis'}>
            Ver todos os imóveis
          </button>
        </div>
      </div>
    </section>
  );
}