import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../services/api';
import { getUserFromToken } from '../utils/auth';
import Header from '../components/Header';
import "../styles/Homepage.css";

const ContratoManagement = () => {
  const [contratos, setContratos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingContrato, setEditingContrato] = useState(null);
  const [formData, setFormData] = useState({
    numeroContrato: '',
    clienteId: '',
    imovelId: '',
    dataInicio: '',
    dataFim: '',
    valorAluguel: '',
    valorCondominio: '',
    valorIPTU: '',
    observacoes: '',
    status: 'Ativo'
  });

  useEffect(() => {
    loadContratos();
  }, []);

  const loadContratos = async () => {
    try {
      const response = await apiClient.get('/contratos');
      setContratos(response.data.data);
      setError("");
    } catch (error) {
      setError("Erro ao carregar contratos");
      console.error('Erro ao carregar contratos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingContrato) {
        await apiClient.put(`/contratos/${editingContrato.id}`, formData);
      } else {
        await apiClient.post('/contratos', formData);
      }
      resetForm();
      setShowModal(false);
      loadContratos();
    } catch (error) {
      console.error('Erro ao salvar contrato:', error);
    }
  };

  const handleEdit = (contrato) => {
    setEditingContrato(contrato);
    setFormData({
      numeroContrato: contrato.numeroContrato,
      clienteId: contrato.clienteId,
      imovelId: contrato.imovelId,
      dataInicio: contrato.dataInicio.split('T')[0],
      dataFim: contrato.dataFim.split('T')[0],
      valorAluguel: contrato.valorAluguel,
      valorCondominio: contrato.valorCondominio,
      valorIPTU: contrato.valorIPTU,
      observacoes: contrato.observacoes || '',
      status: contrato.status
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este contrato?')) {
      try {
        await apiClient.delete(`/contratos/${id}`);
        loadContratos();
      } catch (error) {
        console.error('Erro ao excluir contrato:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      numeroContrato: '',
      clienteId: '',
      imovelId: '',
      dataInicio: '',
      dataFim: '',
      valorAluguel: '',
      valorCondominio: '',
      valorIPTU: '',
      observacoes: '',
      status: 'Ativo'
    });
    setEditingContrato(null);
  };

  const gerarBoletos = async (id) => {
    try {
      await apiClient.post(`/contratos/${id}/gerar-boletos`, {
        quantidadeMeses: 1,
        dataPrimeiroVencimento: new Date().toISOString().split('T')[0]
      });
      alert('Boletos gerados com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar boletos:', error);
    }
  };

  const currentUser = getUserFromToken();

  if (loading) return <div className="text-center mt-5">Carregando...</div>;

  return (
    <div className="homepage">
      <Header user={currentUser} onLogin={() => {}} onLogout={() => {}} />
      
      <div className="hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="search-container">
            <h1 className="hero-title">📋 Gestão de Contratos</h1>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              Admin: {currentUser?.name}
            </p>

            {/* Error Alert */}
            {error && (
              <div className="login-error">
                ⚠️ {error}
              </div>
            )}

            {/* Add Contract Button */}
            <div style={{ textAlign: "center", marginBottom: "25px" }}>
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(!showModal);
                }}
                className="btn-advertise-primary"
                style={{ width: 'auto', padding: '12px 24px' }}
              >
                {showModal ? "➖ Cancelar" : "➕ Novo Contrato"}
              </button>
            </div>

            {/* Contract Form */}
            {showModal && (
              <div className="login-form" style={{ marginBottom: "25px", background: '#f8f9fa', padding: '20px', borderRadius: 'var(--border-radius-lg)' }}>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div className="search-row">
                    <div className="form-group">
                      <label>Número do Contrato</label>
                      <input
                        type="text"
                        value={formData.numeroContrato}
                        onChange={(e) => setFormData({...formData, numeroContrato: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                      >
                        <option value="Ativo">Ativo</option>
                        <option value="Encerrado">Encerrado</option>
                        <option value="Suspenso">Suspenso</option>
                      </select>
                    </div>
                  </div>
                  <div className="search-row">
                    <div className="form-group">
                      <label>Cliente ID</label>
                      <input
                        type="number"
                        value={formData.clienteId}
                        onChange={(e) => setFormData({...formData, clienteId: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Imóvel ID</label>
                      <input
                        type="number"
                        value={formData.imovelId}
                        onChange={(e) => setFormData({...formData, imovelId: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="search-row">
                    <div className="form-group">
                      <label>Data de Início</label>
                      <input
                        type="date"
                        value={formData.dataInicio}
                        onChange={(e) => setFormData({...formData, dataInicio: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Data de Fim</label>
                      <input
                        type="date"
                        value={formData.dataFim}
                        onChange={(e) => setFormData({...formData, dataFim: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="search-row">
                    <div className="form-group">
                      <label>Valor Aluguel</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.valorAluguel}
                        onChange={(e) => setFormData({...formData, valorAluguel: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Valor Condomínio</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.valorCondominio}
                        onChange={(e) => setFormData({...formData, valorCondominio: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Valor IPTU</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.valorIPTU}
                        onChange={(e) => setFormData({...formData, valorIPTU: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Observações</label>
                    <textarea
                      rows="3"
                      value={formData.observacoes}
                      onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="login-button"
                  >
                    {loading ? "💭 Salvando..." : "💾 Salvar"}
                  </button>
                </form>
              </div>
            )}

            {/* Contracts List */}
            <div style={{ maxHeight: "600px", overflowY: "auto", background: 'white', borderRadius: 'var(--border-radius-lg)', padding: '1rem' }}>
              {loading && contratos.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-secondary)" }}>
                  <p>🔄 Carregando contratos...</p>
                </div>
              ) : contratos.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-secondary)" }}>
                  <p>📭 Nenhum contrato encontrado</p>
                </div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead style={{ backgroundColor: "var(--background-light)" }}>
                    <tr>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Nº Contrato</th>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Cliente</th>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Imóvel</th>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Valor Aluguel</th>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Status</th>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Início</th>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Fim</th>
                      <th style={{ padding: "1rem", textAlign: "center", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contratos.map((contrato) => (
                      <tr key={contrato.id}>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>{contrato.numeroContrato}</td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>{contrato.cliente?.nome || `ID: ${contrato.clienteId}`}</td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>{contrato.imovel?.endereco || `ID: ${contrato.imovelId}`}</td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>R$ {parseFloat(contrato.valorAluguel).toFixed(2)}</td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)" }}>
                          <span style={{
                            padding: "0.25rem 0.5rem",
                            borderRadius: "var(--border-radius)",
                            backgroundColor: contrato.status === 'Ativo' ? 'var(--secondary-color)' : '#dc3545',
                            color: "white",
                            fontSize: "0.8rem",
                            fontWeight: "bold"
                          }}>
                            {contrato.status}
                          </span>
                        </td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>
                          {new Date(contrato.dataInicio).toLocaleDateString('pt-BR')}
                        </td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>
                          {new Date(contrato.dataFim).toLocaleDateString('pt-BR')}
                        </td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", textAlign: "center" }}>
                          <button
                            onClick={() => handleEdit(contrato)}
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
                            title="Editar"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => gerarBoletos(contrato.id)}
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
                            title="Gerar Boletos"
                          >
                            📄
                          </button>
                          <button
                            onClick={() => handleDelete(contrato.id)}
                            style={{
                              padding: "6px 12px",
                              backgroundColor: "#dc3545",
                              color: "white",
                              border: "none",
                              borderRadius: "var(--border-radius)",
                              fontSize: "12px",
                              cursor: "pointer"
                            }}
                            title="Excluir"
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
              <Link to="/boletos" className="btn-advertise-primary">
                💳 Gerenciar Boletos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContratoManagement;