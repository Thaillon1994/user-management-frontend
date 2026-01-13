import { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../services/api";
import Header from "../components/Header";
import "../styles/Homepage.css";
import "../styles/Background.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function validatePasswordsMatch() {
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return false;
    }
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    // Validação client-side das senhas
    if (!validatePasswordsMatch()) {
      return;
    }
    
    setLoading(true);

    try {
      await authService.register({ 
        name, 
        email, 
        password,
        confirmPassword // Enviando para validação server-side também
      });
      setSuccess("Usuário cadastrado com sucesso!");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      if (err.response?.status === 400) {
        const errorMessage = err.response?.data?.message || "Dados inválidos. Verifique os campos.";
        setError(errorMessage);
      } else {
        setError("Erro ao cadastrar usuário.");
      }
    } finally {
      setLoading(false);
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
            <div className="login-content" style={{ maxWidth: '450px' }}>
              <h1 className="hero-title">
                Cadastre-se na<br />
                Smart Rent Aluguel Consignado
              </h1>
              <p className="login-description">
                Junte-se à nossa família e tenha acesso exclusivo aos melhores imóveis
              </p>
              
              <form onSubmit={handleSubmit} className="login-form">
                {error && (
                  <div className="login-error">
                    {error}
                  </div>
                )}

                {success && (
                  <div style={{
                    background: 'rgba(40, 167, 69, 0.1)',
                    border: '1px solid rgba(40, 167, 69, 0.3)',
                    color: 'var(--secondary-color)',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--border-radius)',
                    marginBottom: '1.5rem',
                    fontSize: '0.9rem',
                    textAlign: 'center'
                  }}>
                    ✅ {success}
                  </div>
                )}
                
                <div className="form-group">
                  <label htmlFor="name">Nome Completo</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    minLength="3"
                  />
                </div>
                
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
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      // Limpa erro de senhas diferentes ao digitar
                      if (error === "As senhas não coincidem.") {
                        setError("");
                      }
                    }}
                    required
                    minLength="6"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmar Senha</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Digite a senha novamente"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      // Limpa erro de senhas diferentes ao digitar
                      if (error === "As senhas não coincidem.") {
                        setError("");
                      }
                    }}
                    required
                    minLength="6"
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={loading}
                  className="login-button"
                >
                  {loading ? "Cadastrando..." : "Cadastrar"}
                </button>
                
                <div className="login-footer">
                  <span>
                    Já tem conta?{" "}
                    <Link to="/login" className="register-link">
                      Faça login
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