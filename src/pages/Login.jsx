import { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../services/api";
import Header from "../components/Header";
import "../styles/Homepage.css";
import "../styles/Background.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await authService.login({ email, password });
      localStorage.setItem("token", result.accessToken);
      window.location.href = "/home";
    } catch (err) {
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