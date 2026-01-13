import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { imovelService } from "../services/api";
import { getUserFromToken } from "../utils/auth";
import Header from "../components/Header";
import "../styles/Homepage.css";

export default function ImovelManagement() {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingImovel, setEditingImovel] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    valorMensal: ""
  });

  useEffect(() => {
    loadImoveis();
  }, []);

  const loadImoveis = async () => {
    try {
      const data = await imovelService.getAll();
      setImoveis(data);
      setError("");
    } catch (err) {
      setError("Erro ao carregar imóveis");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (editingImovel) {
        await imovelService.update(editingImovel.id, formData);
        setEditingImovel(null);
      } else {
        await imovelService.create(formData);
      }
      
      setFormData({ nome: "", endereco: "", valorMensal: "" });
      setShowForm(false);
      await loadImoveis();
    } catch (err) {
      setError("Erro ao salvar imóvel");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (imovel) => {
    setEditingImovel(imovel);
    setFormData({
      nome: imovel.nome,
      endereco: imovel.endereco,
      valorMensal: imovel.valorMensal
    });
    setShowForm(true);
  };

  const handleDelete = async (imovelId) => {
    if (!window.confirm("Tem certeza que deseja excluir este imóvel?")) return;

    setLoading(true);
    try {
      await imovelService.delete(imovelId);
      await loadImoveis();
    } catch {
      setError("Erro ao excluir imóvel");
    } finally {
      setLoading(false);
    }
  };

  const currentUser = getUserFromToken();

  return (
    <div className="homepage">
      <Header user={currentUser} onLogin={() => {}} onLogout={() => {}} />
      
      <div className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="search-container">
            <h1 className="hero-title">🏘️ Gestão de Imóveis</h1>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              Admin: {currentUser?.name}
            </p>

            {/* Error Alert */}
            {error && (
              <div className="login-error">
                ⚠️ {error}
              </div>
            )}

            {/* Add Imovel Button */}
            <div style={{ textAlign: "center", marginBottom: "25px" }}>
              <button
                onClick={() => {
                  setEditingImovel(null);
                  setFormData({ nome: "", endereco: "", valorMensal: "" });
                  setShowForm(!showForm);
                }}
                className="btn-advertise-primary"
                style={{ width: 'auto', padding: '12px 24px' }}
              >
                {showForm ? "➖ Cancelar" : "🏠 Novo Imóvel"}
              </button>
            </div>

            {/* Imovel Form */}
            {showForm && (
              <div className="login-form" style={{ marginBottom: "25px", background: '#f8f9fa', padding: '20px', borderRadius: 'var(--border-radius-lg)' }}>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div className="form-group">
                    <label>Nome do Imóvel</label>
                    <input
                      type="text"
                      placeholder="Ex: Apartamento 2 quartos"
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      required
                      minLength="3"
                    />
                  </div>
                  <div className="form-group">
                    <label>Endereço Completo</label>
                    <input
                      type="text"
                      placeholder="Rua, número, bairro, cidade"
                      value={formData.endereco}
                      onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                      required
                      minLength="5"
                    />
                  </div>
                  <div className="form-group">
                    <label>Valor Mensal (R$)</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={formData.valorMensal}
                      onChange={(e) => setFormData({...formData, valorMensal: e.target.value})}
                      required
                      min="0.01"
                      step="0.01"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="login-button"
                  >
                    {loading ? "💭 Salvando..." : "💾 Salvar Imóvel"}
                  </button>
                </form>
              </div>
            )}

            {/* Imoveis List */}
            <div style={{ maxHeight: "400px", overflowY: "auto", background: 'white', borderRadius: 'var(--border-radius-lg)', padding: '1rem' }}>
              {loading && imoveis.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-secondary)" }}>
                  <p>🔄 Carregando imóveis...</p>
                </div>
              ) : imoveis.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-secondary)" }}>
                  <p>🏠 Nenhum imóvel cadastrado</p>
                </div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead style={{ backgroundColor: "var(--background-light)" }}>
                    <tr>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>ID</th>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Nome</th>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Endereço</th>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Valor Mensal</th>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Data Cadastro</th>
                      <th style={{ padding: "1rem", textAlign: "center", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {imoveis.map((imovel) => (
                      <tr key={imovel.id}>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>{imovel.id}</td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>{imovel.nome}</td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>{imovel.endereco}</td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>
                          R$ {Number(imovel.valorMensal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>
                          {new Date(imovel.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", textAlign: "center" }}>
                          <button
                            onClick={() => handleEdit(imovel)}
                            style={{
                              padding: "6px 12px",
                              backgroundColor: "var(--accent-color)",
                              color: "var(--text-primary)",
                              border: "none",
                              borderRadius: "var(--border-radius)",
                              fontSize: "12px",
                              cursor: "pointer",
                              marginRight: "5px"
                            }}
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(imovel.id)}
                            style={{
                              padding: "6px 12px",
                              backgroundColor: "#dc3545",
                              color: "white",
                              border: "none",
                              borderRadius: "var(--border-radius)",
                              fontSize: "12px",
                              cursor: "pointer"
                            }}
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Navigation */}
            <div style={{ display: "flex", gap: "15px", justifyContent: "center", marginTop: "25px" }}>
              <Link to="/home" className="btn-advertise-secondary">
                🏠 Voltar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}