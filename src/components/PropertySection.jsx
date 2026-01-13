import { useState, useEffect, useMemo } from 'react';
import '../styles/PropertyCards.css';

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
      imagem: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?w=800&h=600&fit=crop",
      descricao: "Casa moderna com acabamento de altíssima qualidade, perfeita para famílias. Localização privilegiada com fácil acesso shopping e escolas.",
      caracteristicas: ["3 suítes", "Piscina", "Churrasqueira", " Jardim", "Garagem p/2 carros"],
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
      imagem: "https://images.pexels.com/photos/1063993/pexels-photo-1063993.jpeg?w=800&h=600&fit=crop",
      descricao: "Apartamento excelente próximo ao metrô Carrão. Recém reformado com móveis planejados e ótima iluminação natural.",
      caracteristicas: ["2 suítes", "Sacada", "Fitness", "Varanda Gourmet", "Portaria 24h"],
      condominio: 380,
      iptu: 180
    },
    {
      id: 3,
      nome: "Studio Mobiliado - Moema",
      endereco: "Avenida Brigadeiro Faria Lima, 3500 - Moema, São Paulo",
      tipo: "Aluguel",
      quartos: 1,
      area: 35,
      vagas: 0,
      valorMensal: 1800,
      imagem: "https://images.pexels.com/photos/1648777/pexels-photo-1648777.jpeg?w=800&h=600&fit=crop",
      descricao: "Studio compacto e totalmente mobiliado, perfeito para solteiros ou casais sem filhos. Próximo ao Shopping Morumbi.",
      caracteristicas: ["Mobiliado", "Cozinha Americana", "Ar Condicionado", "Sacada", "Condomínio com Piscina"],
      condominio: 220,
      iptu: 120
    },
    {
      id: 4,
      nome: "Casa com Piscina - Brooklin",
      endereco: "Rua Albuquerque, 500 - Brooklin, São Paulo",
      tipo: "Aluguel",
      quartos: 4,
      area: 180,
      vagas: 2,
      valorMensal: 4200,
      imagem: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?w=800&h=600&fit=crop",
      descricao: "Casa espaçosa em rua tranquila de Brooklin. Ideal para famílias com crianças. Piscina aquecida e churrasqueira.",
      caracteristicas: ["4 quartos", "3 suítes", "Piscina aquecida", "Churrasqueira", "Jardim", "Garagem"],
      condominio: 520,
      iptu: 320
    },
    {
      id: 5,
      nome: "Cobertura na Vila Mariana",
      endereco: "Rua das Azaleias, 150 - Vila Mariana, São Paulo",
      tipo: "Aluguel",
      quartos: 2,
      area: 55,
      vagas: 1,
      valorMensal: 1500,
      imagem: "https://images.pexels.com/photos/2119713/pexels-photo-2119713.jpeg?w=800&h=600&fit=crop",
      descricao: "Cobertura de altíssima padrão com churrasqueira. Localização estratégica perto do metrô Vila Mariana.",
      caracteristicas: ["Cobertura", "Churrasqueira", "Área de Lazer", "Segurança 24h", "Aceita Pets"],
      condominio: 280,
      iptu: 90
    },
    {
      id: 6,
      nome: "Kitnet no Centro - São Paulo",
      endereco: "Rua Augusta, 1000 - Centro, São Paulo",
      tipo: "Aluguel",
      quartos: 1,
      area: 28,
      vagas: 0,
      valorMensal: 2100,
      imagem: "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?w=800&h=600&fit=crop",
      descricao: "Kitnet compacta no coração de São Paulo. Próximo a tudo: metrô, restaurantes, vida noturna. Ideal para estudantes e jovens profissionais.",
      caracteristicas: ["Mobiliado", "Ar Condicionado", "Internet Fibra", "Portaria 24h", "Localização Central"],
      condominio: 350,
      iptu: 160
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
                <div className="property-type-tag">{property.tipo}</div>
              </div>
              <div className="property-content">
                <div className="property-price">
                  <span className="price-amount">R$ {property.valorMensal.toLocaleString('pt-BR')}</span>
                  <span className="price-period">/mês</span>
                </div>
                <h3 className="property-title">{property.nome}</h3>
                <div className="property-address">
                  <span className="address-icon">📍</span>
                  {property.endereco}
                </div>
                <div className="property-info">
                  <div className="info-item">
                    <span className="info-label">Área útil</span>
                    <span className="info-value">{property.area}m²</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Dormitórios</span>
                    <span className="info-value">{property.quartos}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Vagas garagem</span>
                    <span className="info-value">{property.vagas}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Condomínio</span>
                    <span className="info-value">R$ {property.condominio}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">IPTU</span>
                    <span className="info-value">R$ {property.iptu}</span>
                  </div>
                </div>
                <div className="property-features">
                  {property.caracteristicas.map((feature, index) => (
                    <span key={index} className={`feature-tag ${index < 3 ? 'highlight' : ''}`}>{feature}</span>
                  ))}
                </div>
                <p className="property-description">{property.descricao}</p>
                <button className="property-button" onClick={() => window.location.href = `/property/${property.id}`}>
                  Ver Detalhes
                </button>
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