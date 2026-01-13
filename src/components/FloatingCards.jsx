import React from 'react';

export default function FloatingCards() {
  return (
    <div className="timeline-container">
      <div className="timeline-wrapper">
        <div className="timeline-card">
          <div className="timeline-content">
            <div className="timeline-image-container">
              <img src="/src/assets/images/Card 1.jpeg" alt="Card 1" className="timeline-image" />
              <div className="timeline-overlay">
                <span className="timeline-icon">🏠</span>
              </div>
            </div>
            <div className="timeline-info">
              <h3 className="timeline-title">
                Experiência Exclusiva <span className="timeline-badge">Premium</span>
              </h3>
              <p className="timeline-description">
                Os melhores imóveis selecionados para você com acabamento de luxo e localização privilegiada.
              </p>
              <div className="timeline-features">
                <span className="timeline-feature">Luxo</span>
                <span className="timeline-feature">Localização</span>
                <span className="timeline-feature">Exclusividade</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="timeline-card">
          <div className="timeline-content">
            <div className="timeline-image-container">
              <img src="/src/assets/images/Card 2.jpeg" alt="Card 2" className="timeline-image" />
              <div className="timeline-overlay">
                <span className="timeline-icon">🏢</span>
              </div>
            </div>
            <div className="timeline-info">
              <h3 className="timeline-title">
                Apartamentos Modernos <span className="timeline-badge">Popular</span>
              </h3>
              <p className="timeline-description">
                Infraestrutura completa com fácil acesso e design contemporâneo para seu conforto.
              </p>
              <div className="timeline-features">
                <span className="timeline-feature">Moderno</span>
                <span className="timeline-feature">Conforto</span>
                <span className="timeline-feature">Acessibilidade</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="timeline-card">
          <div className="timeline-content">
            <div className="timeline-image-container">
              <img src="/src/assets/images/Card 3.jpeg" alt="Card 3" className="timeline-image" />
              <div className="timeline-overlay">
                <span className="timeline-icon">🌿</span>
              </div>
            </div>
            <div className="timeline-info">
              <h3 className="timeline-title">
                Espaços Sustentáveis <span className="timeline-badge">Ecológico</span>
              </h3>
              <p className="timeline-description">
                Áreas verdes integradas com design sustentável para sua qualidade de vida e bem-estar.
              </p>
              <div className="timeline-features">
                <span className="timeline-feature">Natureza</span>
                <span className="timeline-feature">Sustentável</span>
                <span className="timeline-feature">Qualidade</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="timeline-card">
          <div className="timeline-content">
            <div className="timeline-image-container">
              <img src="/src/assets/images/Card 6.jpeg" alt="Card 6" className="timeline-image" />
              <div className="timeline-overlay">
                <span className="timeline-icon">⭐</span>
              </div>
            </div>
            <div className="timeline-info">
              <h3 className="timeline-title">
                Oportunidade Única <span className="timeline-badge">Destaque</span>
              </h3>
              <p className="timeline-description">
                Localização privilegiada com acabamento premium e investimento garantido.
              </p>
              <div className="timeline-features">
                <span className="timeline-feature">Exclusivo</span>
                <span className="timeline-feature">Oportunidade</span>
                <span className="timeline-feature">Investimento</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}