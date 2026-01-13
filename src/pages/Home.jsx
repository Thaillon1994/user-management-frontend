import HeroSection from "../components/HeroSection";
import PropertySection from "../components/PropertySection";
import FloatingCards from "../components/FloatingCards";
import ModernGallery from "../components/ModernGallery";
import "../styles/Homepage.css";
import "../styles/Background.css";

export default function Home() {
  const handleSearch = (searchParams) => {
    console.log('Parâmetros de busca:', searchParams);
    // Aqui você pode implementar a lógica de busca
    // Por exemplo, navegar para uma página de resultados
    // navigate('/buscar', { state: searchParams });
  };

  const handleLogin = () => {
    // Será tratado pelo Layout
  };

  return (
    <div className="homepage">
      <HeroSection onSearch={handleSearch} onLogin={handleLogin} />
      <FloatingCards />
      <ModernGallery />
      <PropertySection />
    </div>
  );
}