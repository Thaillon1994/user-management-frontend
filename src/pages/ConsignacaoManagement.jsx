import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { consignacaoService } from "../services/api";
import { getUserFromToken } from "../utils/auth";
import Header from "../components/Header";
import "../styles/Homepage.css";

export default function ConsignacaoManagement() {
  const [consignacoes, setConsignacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nomeFuncionario: "",
    cpf: "",
    empresa: "",
    cnpjEmpresa: "",
    valorSolicitado: "",
    quantidadeParcelas: ""
  });

  useEffect(() => {
    loadConsignacoes();
  }, []);

  const loadConsignacoes = async () => {
    try {
      const data = await consignacaoService.getAll();
      setConsignacoes(data);
      setError("");
    } catch (err) {
      setError("Erro ao carregar consignações");
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
      await consignacaoService.create({
        ...formData,
        valorSolicitado: parseFloat(formData.valorSolicitado),
        quantidadeParcelas: parseInt(formData.quantidadeParcelas)
      });
      
      setFormData({
        nomeFuncionario: "",
        cpf: "",
        empresa: "",
        cnpjEmpresa: "",
        valorSolicitado: "",
        quantidadeParcelas: ""
      });
      setShowForm(false);
      await loadConsignacoes();
    } catch (err) {
      setError("Erro ao salvar consignação");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setLoading(true);
    try {
      await consignacaoService.updateStatus(id, { status: newStatus });
      await loadConsignacoes();
    } catch (err) {
      setError("Erro ao atualizar status");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta consignação?")) return;

    setLoading(true);
    try {
      await consignacaoService.delete(id);
      await loadConsignacoes();
    } catch (err) {
      setError("Erro ao excluir consignação");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pendente': return 'rgba(255, 193, 7, 0.3)';
      case 'Aprovada': return 'rgba(40, 167, 69, 0.3)';
      case 'Rejeitada': return 'rgba(220, 53, 69, 0.3)';
      default: return 'rgba(108, 117, 125, 0.3)';
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'Pendente': return '#FFD700';
      case 'Aprovada': return '#90EE90';
      case 'Rejeitada': return '#FF6B6B';
      default: return '#ADB5BD';
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatCPF = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
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
            <h1 className="hero-title">📋 Gestão de Consignações</h1>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              Admin: {currentUser?.name}
            </p>

            {/* Error Alert */}
            {error && (
              <div className="login-error">
                ⚠️ {error}
              </div>
            )}

            {/* Add Consignacao Button */}
            <div style={{ textAlign: "center", marginBottom: "25px" }}>
              <button
                onClick={() => {
                  setFormData({
                    nomeFuncionario: "",
                    cpf: "",
                    empresa: "",
                    cnpjEmpresa: "",
                    valorSolicitado: "",
                    quantidadeParcelas: ""
                  });
                  setShowForm(!showForm);
                }}
                className="btn-advertise-primary"
                style={{ width: 'auto', padding: '12px 24px' }}
              >
                {showForm ? "➖ Cancelar" : "➕ Nova Consignação"}
              </button>
            </div>

            {/* Consignacao Form */}
            {showForm && (
              <div className="login-form" style={{ marginBottom: "25px", background: '#f8f9fa', padding: '20px', borderRadius: 'var(--border-radius-lg)' }}>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                    <div className="form-group">
                      <label>Nome do Funcionário</label>
                      <input
                        type="text"
                        placeholder="Nome completo"
                        value={formData.nomeFuncionario}
                        onChange={(e) => setFormData({...formData, nomeFuncionario: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>CPF</label>
                      <input
                        type="text"
                        placeholder="000.000.000-00"
                        value={formData.cpf}
                        onChange={(e) => setFormData({...formData, cpf: e.target.value.replace(/\D/g, '')})}
                        required
                        maxLength="11"
                      />
                    </div>
                    <div className="form-group">
                      <label>Empresa</label>
                      <input
                        type="text"
                        placeholder="Nome da empresa"
                        value={formData.empresa}
                        onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>CNPJ da Empresa</label>
                      <input
                        type="text"
                        placeholder="00.000.000/0000-00"
                        value={formData.cnpjEmpresa}
                        onChange={(e) => setFormData({...formData, cnpjEmpresa: e.target.value.replace(/\D/g, '')})}
                        required
                        maxLength="14"
                      />
                    </div>
                    <div className="form-group">
                      <label>Valor Solicitado (R$)</label>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={formData.valorSolicitado}
                        onChange={(e) => setFormData({...formData, valorSolicitado: e.target.value})}
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="form-group">
                      <label>Quantidade de Parcelas</label>
                      <input
                        type="number"
                        placeholder="1 a 120"
                        value={formData.quantidadeParcelas}
                        onChange={(e) => setFormData({...formData, quantidadeParcelas: e.target.value})}
                        required
                        min="1"
                        max="120"
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: "center", marginTop: "15px" }}>
                    <button
                      type="submit"
                      disabled={loading}
                      className="login-button"
                      style={{ width: 'auto', padding: '12px 24px' }}
                    >
                      {loading ? "💭 Salvando..." : "💾 Salvar"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Consignacoes List */}
            <div style={{ maxHeight: "500px", overflowY: "auto", background: 'white', borderRadius: 'var(--border-radius-lg)', padding: '1rem' }}>
              {loading && consignacoes.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-secondary)" }}>
                  <p>🔄 Carregando consignações...</p>
                </div>
              ) : consignacoes.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-secondary)" }}>
                  <p>📭 Nenhuma consignação encontrada</p>
                </div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead style={{ backgroundColor: "var(--background-light)" }}>
                    <tr>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>ID</th>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Funcionário</th>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>CPF</th>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Empresa</th>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Valor</th>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Parcelas</th>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Status</th>
                      <th style={{ padding: "1rem", textAlign: "center", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consignacoes.map((consignacao) => (
                      <tr key={consignacao.id}>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>{consignacao.id}</td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>{consignacao.nomeFuncionario}</td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>{formatCPF(consignacao.cpf)}</td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>{consignacao.empresa}</td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>{formatCurrency(consignacao.valorSolicitado)}</td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>{consignacao.quantidadeParcelas}</td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)" }}>
                          <span style={{
                            padding: "0.25rem 0.5rem",
                            borderRadius: "var(--border-radius)",
                            backgroundColor: getStatusColor(consignacao.status),
                            color: getStatusTextColor(consignacao.status),
                            fontSize: "0.8rem",
                            fontWeight: "bold"
                          }}>
                            {consignacao.status}
                          </span>
                        </td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", textAlign: "center" }}>
                          {consignacao.status === 'Pendente' && (
                            <>
                              <button
                                onClick={() => handleStatusChange(consignacao.id, 'Aprovada')}
                                style={{
                                  padding: "6px 12px",
                                  backgroundColor: "var(--secondary-color)",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "var(--border-radius)",
                                  fontSize: "12px",
                                  cursor: "pointer",
                                  marginRight: "5px"
                                }}
                              >
                                ✅
                              </button>
                              <button
                                onClick={() => handleStatusChange(consignacao.id, 'Rejeitada')}
                                style={{
                                  padding: "6px 12px",
                                  backgroundColor: "#dc3545",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "var(--border-radius)",
                                  fontSize: "12px",
                                  cursor: "pointer",
                                  marginRight: "5px"
                                }}
                              >
                                ❌
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDelete(consignacao.id)}
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