import { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../services/mockApi";
import Header from "../components/Header";
import "../styles/Homepage.css";
import "../styles/Background.css";
import "../styles/DemoCredentials.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    
    try {
      console.log("🔐 Iniciando tentativa de login...");
      console.log("Email:", email);
      console.log("Senha:", password);
      
      const result = await authService.login({ email, password });
      
      console.log("✅ Login response:", result);
      
      if (result.success) {
        console.log("🎉 Login bem sucedido! Usuário:", result.user.name, "ID:", result.user.id);
        console.log("🔑 Token:", result.accessToken);
        console.log("👤 Role:", result.user.role);
        
        localStorage.setItem("token", result.accessToken);
        localStorage.setItem("user", JSON.stringify(result.user));
        
        // Limpar qualquer estado anterior
        localStorage.removeItem("user_state");
        localStorage.removeItem("last_redirect_attempt");
        
        console.log("🔄 Redirecionando para dashboard...");
        
        // Redirecionamento imediato
        window.location.replace("/home");
      } else {
        console.error("❌ Falha no login!");
        console.error("💥 Credencial:", email);
        console.error("💥 Tentativas restantes:", localStorage.getItem("login_attempts") || "0");
        
        // Incrementar contador de tentativas
        const attempts = parseInt(localStorage.getItem("login_attempts") || "0") + 1;
        localStorage.setItem("login_attempts", attempts.toString());
        
        if (attempts > 3) {
          console.warn("🚫 Muitas tentativas. Por favor, aguarde 30 minutos.");
          setError("Muitas tentativas. Por favor, aguarde 30 minutos.");
          return;
        }
        
        setError("Email ou senha incorretos.");
      }
    } catch (err) {
      console.error("💥 Erro no login:", err);
      setError(err.message || "Credenciais inválidas");
    }
  }

  return (
    <div className="homepage">
      <Header user={null} onLogin={() => {}} onLogout={() => {}} />
      
      <div className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="search-container">
            <div className="login-content">
              <h1 className="hero-title">
                Acessar sua conta<br />
                na Smart Rent Aluguel Consignado
              </h1>
              <p className="login-description">
                Entre para gerenciar seus imóveis, consignações e acompanhar sua área exclusiva
              </p>
              
               <form onSubmit={handleSubmit} className="login-form">
                 <div className="demo-credentials">
                   <strong>🔐 DADOS DEMONSTRAÇÃO:</strong><br/>
                   Email: <code>admin@smartrent.com</code><br/>
                   Senha: <code>123456</code>
                 </div>
                 
                 {error && (
                   <div className="login-error">
                     {error}
                   </div>
                 )}
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="password">Senha</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <button type="submit" className="login-button">
                  Entrar
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
          </div>
        </div>
      </div>
    </div>
  );
}