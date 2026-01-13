import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer-smartrent">
      <div className="container">
        {/* Marca de Demonstração */}
        <div className="demo-banner">
          <div className="demo-badge">
            ⚠️ <strong>SITE DEMONSTRAÇÃO</strong> - Versão para apresentação ao cliente | Dados fictícios | Não usar para produção
          </div>
        </div>
        {/* Logo e Descrição */}
        <div className="footer-brand-smartrent">
          <div className="footer-logo-smartrent">
            <img src="/src/assets/logo-simple.svg" alt="Smart Rent Logo" className="footer-logo-image-smartrent" />
          </div>
          <p className="footer-description-smartrent">
            Plataforma completa de gestão imobiliária para aluguel consignado. Tecnologia e segurança para seu negócio.
          </p>
          <div className="footer-social-smartrent">
            <a href="#" className="social-link">Facebook</a>
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">LinkedIn</a>
          </div>
        </div>

        {/* Links principais - estilo Smart Rent */}
        <div className="footer-links-grid-smartrent">
          {/* Alugar */}
          <div className="footer-column-smartrent">
            <h4 className="footer-title-smartrent">Alugar</h4>
            <ul className="footer-links-list-smartrent">
              <li><Link to="/alugar/apartamento" className="footer-link-smartrent">Apartamentos para alugar</Link></li>
              <li><Link to="/alugar/casa" className="footer-link-smartrent">Casas para alugar</Link></li>
              <li><Link to="/alugar/studio" className="footer-link-smartrent">Studios e kitnets para alugar</Link></li>
              <li><Link to="/alugar/condominio" className="footer-link-smartrent">Casas em condomínio para alugar</Link></li>
              <li><Link to="/alugar/todos" className="footer-link-smartrent">Todos os imóveis para alugar</Link></li>
            </ul>
          </div>

          {/* Comprar */}
          <div className="footer-column-smartrent">
            <h4 className="footer-title-smartrent">Comprar</h4>
            <ul className="footer-links-list-smartrent">
              <li><Link to="/comprar/apartamento" className="footer-link-smartrent">Apartamentos para comprar</Link></li>
              <li><Link to="/comprar/casa" className="footer-link-smartrent">Casas para comprar</Link></li>
              <li><Link to="/comprar/studio" className="footer-link-smartrent">Studios e kitnets para comprar</Link></li>
              <li><Link to="/comprar/casa-condominio" className="footer-link-smartrent">Casas em condomínio para comprar</Link></li>
              <li><Link to="/comprar/todos" className="footer-link-smartrent">Todos os imóveis para comprar</Link></li>
            </ul>
          </div>

          {/* Anunciar */}
          <div className="footer-column-smartrent">
            <h4 className="footer-title-smartrent">Anunciar</h4>
            <ul className="footer-links-list-smartrent">
              <li><Link to="/anunciar/alugar" className="footer-link-smartrent">Alugar meu imóvel</Link></li>
              <li><Link to="/anunciar/vender" className="footer-link-smartrent">Vender meu imóvel</Link></li>
              <li><Link to="/calculadora-aluguel" className="footer-link-smartrent">Calculadora de aluguel</Link></li>
              <li><Link to="/calculadora-venda" className="footer-link-smartrent">Calculadora de venda</Link></li>
              <li><Link to="/area-proprietario" className="footer-link-smartrent">Área do proprietário</Link></li>
            </ul>
          </div>

          {/* Links Úteis */}
          <div className="footer-column-smartrent">
            <h4 className="footer-title-smartrent">Links Úteis</h4>
            <ul className="footer-links-list-smartrent">
              <li><Link to="/guias" className="footer-link-smartrent">Guias</Link></li>
              <li><Link to="/dados-indices" className="footer-link-smartrent">Dados e índices</Link></li>
              <li><Link to="/calculadora-igpm" className="footer-link-smartrent">Calculadora IGPM</Link></li>
              <li><Link to="/contrato-aluguel" className="footer-link-smartrent">Contrato de aluguel</Link></li>
              <li><Link to="/escritura-imovel" className="footer-link-smartrent">Escritura do imóvel</Link></li>
            </ul>
          </div>

          {/* Institucional */}
          <div className="footer-column-smartrent">
            <h4 className="footer-title-smartrent">Institucional</h4>
            <ul className="footer-links-list-smartrent">
              <li><Link to="/sobre" className="footer-link-smartrent">Sobre o Smart Rent</Link></li>
              <li><Link to="/regioes-atendidas" className="footer-link-smartrent">Regiões Atendidas</Link></li>
              <li><Link to="/ajuda" className="footer-link-smartrent">Central de Ajuda</Link></li>
              <li><Link to="/prevencao-fraude" className="footer-link-smartrent">Prevenção à fraude</Link></li>
              <li><Link to="/compliance" className="footer-link-smartrent">Compliance</Link></li>
            </ul>
          </div>
        </div>

        {/* Buscas populares - estilo Smart Rent */}
        <div className="footer-popular-searches-smartrent">
          <h3 className="popular-title-smartrent">Buscas mais populares</h3>
          <div className="popular-links-smartrent">
            <Link to="/buscar?apartamento=venda&diadema" className="popular-link-smartrent">Apartamento à venda Diadema</Link>
            <Link to="/buscar?apartamento=venda&taboao" className="popular-link-smartrent">Apartamento à venda Taboão da Serra</Link>
            <Link to="/buscar?apartamento=barato&saopaulo" className="popular-link-smartrent">Apartamento barato em São Paulo</Link>
            <Link to="/buscar?apartamento=barato&rio" className="popular-link-smartrent">Apartamento barato no Rio de Janeiro</Link>
            <Link to="/buscar?apartamento=alugar&curitiba" className="popular-link-smartrent">Apartamento para alugar em Curitiba</Link>
            <Link to="/buscar?apartamento=alugar&goiania" className="popular-link-smartrent">Apartamento para alugar em Goiânia</Link>
            <Link to="/buscar?apartamento=alugar&salvador" className="popular-link-smartrent">Apartamento para alugar em Salvador</Link>
            <Link to="/buscar?apartamento=alugar&santos" className="popular-link-smartrent">Apartamento para alugar Santos</Link>
            <Link to="/buscar?apartamento=alugar&florianopolis" className="popular-link-smartrent">Apartamento para alugar Florianópolis</Link>
            <Link to="/buscar?apartamento=alugar&niteroi" className="popular-link-smartrent">Apartamento para alugar Niterói</Link>
            <Link to="/buscar?apartamento=alugar&metro&saopaulo" className="popular-link-smartrent">Apartamento para alugar próximo ao metrô em São Paulo</Link>
            <Link to="/buscar?apartamento=alugar&metro&rio" className="popular-link-smartrent">Apartamento para alugar próximo ao metrô no Rio de Janeiro</Link>
            <Link to="/buscar?casa=venda&barueri" className="popular-link-smartrent">Casas à venda em Barueri</Link>
            <Link to="/buscar?casa=venda&jundiai" className="popular-link-smartrent">Casas à venda em Jundiaí</Link>
            <Link to="/buscar?casa=alugar&cotia" className="popular-link-smartrent">Casas para alugar em Cotia</Link>
            <Link to="/buscar?casa=alugar&saogoncalo" className="popular-link-smartrent">Casas para alugar em São Gonçalo</Link>
          </div>
        </div>

        {/* Links legais */}
        <div className="footer-legal-smartrent">
          <div className="legal-links-smartrent">
            <Link to="/privacidade" className="legal-link-smartrent">Aviso de privacidade</Link>
            <span className="separator">•</span>
            <Link to="/termos" className="legal-link-smartrent">Termos e condições de uso</Link>
            <span className="separator">•</span>
            <Link to="/cookies" className="legal-link-smartrent">Política de Cookies</Link>
            <span className="separator">•</span>
            <Link to="/manual" className="legal-link-smartrent">Manual do usuário</Link>
          </div>
          <div className="copyright-smartrent">
            <p>© 2024 Smart Rent Aluguel Consignado. Todos os direitos reservados.</p>
            <p className="creci">CRECI-SP J24.344 | CRECI-MG J5851 | <Link to="/outros-creci">Ver outros</Link></p>
          </div>
        </div>
      </div>
    </footer>
  );
}