import { useState } from "react";
import { authService } from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await authService.register({ name, email, password });
      window.location.href = "/login";
    } catch (err) {
      setError(err.message || "Erro ao criar usuário");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '100px auto', 
      padding: '2rem',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      borderRadius: '8px'
    }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2 style={{ textAlign: 'center', margin: '0 0 1rem 0' }}>Cadastro</h2>

        <div>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength="3"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>

        {error && (
          <p style={{ 
            color: 'red', 
            margin: '0',
            textAlign: 'center',
            fontSize: '0.9rem'
          }}>
            {error}
          </p>
        )}

        <button 
          type="submit"
          disabled={loading}
          style={{
            padding: '0.75rem',
            backgroundColor: loading ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <p style={{ textAlign: 'center', margin: '1rem 0 0 0' }}>
          Já tem conta? <a href="/login" style={{ color: '#007bff' }}>Faça login</a>
        </p>
      </form>
    </div>
  );
}