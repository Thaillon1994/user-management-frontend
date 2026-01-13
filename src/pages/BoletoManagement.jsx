import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../services/api';
import { getUserFromToken } from '../utils/auth';
import Header from '../components/Header';
import "../styles/Homepage.css";

const BoletoManagement = () => {
  const [boletos, setBoletos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPagamentoModal, setShowPagamentoModal] = useState(false);
  const [editingBoleto, setEditingBoleto] = useState(null);
  const [pagamentoBoleto, setPagamentoBoleto] = useState(null);
  const [filtro, setFiltro] = useState('todos'); // todos, pendentes, vencidos, pagos
  const [formData, setFormData] = useState({
    contratoId: '',
    dataVencimento: '',
    valor: '',
    observacoes: ''
  });
  const [pagamentoData, setPagamentoData] = useState({
    valorPago: '',
    dataPagamento: new Date().toISOString().split('T')[0],
    observacoes: ''
  });

  useEffect(() => {
    loadBoletos();
  }, [filtro, loadBoletos]);

  const loadBoletos = useCallback(async () => {
    try {
      let url = '/boletos';
      if (filtro === 'pendentes') {
        url += '/pendentes';
      } else if (filtro === 'vencidos') {
        url += '/vencidos';
      }
      
      const response = await apiClient.get(url);
      setBoletos(response.data.data);
      setError("");
    } catch (error) {
      setError("Erro ao carregar boletos");
      console.error('Erro ao carregar boletos:', error);
    } finally {
      setLoading(false);
    }
  }, [filtro]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBoleto) {
        await apiClient.put(`/boletos/${editingBoleto.id}`, formData);
      } else {
        await apiClient.post('/boletos', formData);
      }
      resetForm();
      setShowModal(false);
      loadBoletos();
    } catch (error) {
      console.error('Erro ao salvar boleto:', error);
    }
  };

  const handleEdit = (boleto) => {
    setEditingBoleto(boleto);
    setFormData({
      contratoId: boleto.contratoId,
      dataVencimento: boleto.dataVencimento.split('T')[0],
      valor: boleto.valor,
      observacoes: boleto.observacoes || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este boleto?')) {
      try {
        await apiClient.delete(`/boletos/${id}`);
        loadBoletos();
      } catch (error) {
        console.error('Erro ao excluir boleto:', error);
      }
    }
  };

  const handlePagamento = (boleto) => {
    setPagamentoBoleto(boleto);
    setPagamentoData({
      valorPago: boleto.valor,
      dataPagamento: new Date().toISOString().split('T')[0],
      observacoes: ''
    });
    setShowPagamentoModal(true);
  };

  const registrarPagamento = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post(`/boletos/${pagamentoBoleto.id}/registrar-pagamento`, pagamentoData);
      setShowPagamentoModal(false);
      setPagamentoBoleto(null);
      loadBoletos();
      setError("");
    } catch (error) {
      setError("Erro ao registrar pagamento");
      console.error('Erro ao registrar pagamento:', error);
    }
  };

  const gerarSegundaVia = async (id) => {
    try {
      const response = await apiClient.get(`/boletos/${id}/segunda-via`);
      alert(`Segunda via gerada: ${response.data.data.url}`);
    } catch (error) {
      console.error('Erro ao gerar segunda via:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      contratoId: '',
      dataVencimento: '',
      valor: '',
      observacoes: ''
    });
    setEditingBoleto(null);
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
            <h1 className="hero-title">💳 Gestão de Boletos</h1>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              Admin: {currentUser?.name}
            </p>

            {/* Error Alert */}
            {error && (
              <div className="login-error">
                ⚠️ {error}
              </div>
            )}

            {/* Add Boleto Button */}
            <div style={{ textAlign: "center", marginBottom: "25px" }}>
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(!showModal);
                }}
                className="btn-advertise-primary"
                style={{ width: 'auto', padding: '12px 24px' }}
              >
                {showModal ? "➖ Cancelar" : "➕ Novo Boleto"}
              </button>
            </div>

            {/* Filters */}
            <div style={{ textAlign: "center", marginBottom: "25px", display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
              {['todos', 'pendentes', 'vencidos', 'pagos'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setFiltro(filter)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: filtro === filter ? "var(--primary-color)" : "var(--background-light)",
                    color: filtro === filter ? "white" : "var(--text-primary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--border-radius)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontSize: "0.9rem",
                    fontWeight: "500"
                  }}
                >
                  {filter === 'todos' ? 'Todos' : 
                   filter === 'pendentes' ? 'Pendentes' :
                   filter === 'vencidos' ? 'Vencidos' : 'Pagos'}
                </button>
              ))}
            </div>

            {/* Boleto Form */}
            {showModal && (
              <div className="login-form" style={{ marginBottom: "25px", background: '#f8f9fa', padding: '20px', borderRadius: 'var(--border-radius-lg)' }}>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div className="form-group">
                    <label>ID do Contrato</label>
                    <input
                      type="number"
                      value={formData.contratoId}
                      onChange={(e) => setFormData({...formData, contratoId: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Data de Vencimento</label>
                    <input
                      type="date"
                      value={formData.dataVencimento}
                      onChange={(e) => setFormData({...formData, dataVencimento: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Valor (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.valor}
                      onChange={(e) => setFormData({...formData, valor: e.target.value})}
                      required
                    />
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

            {/* Payment Form */}
            {showPagamentoModal && (
              <div className="login-form" style={{ marginBottom: "25px", background: '#f8f9fa', padding: '20px', borderRadius: 'var(--border-radius-lg)', border: '2px solid var(--secondary-color)' }}>
                <h3 style={{ textAlign: "center", marginBottom: "20px", color: "var(--secondary-color)" }}>Registrar Pagamento</h3>
                <form onSubmit={registrarPagamento} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div className="form-group">
                    <label>Valor Pago (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={pagamentoData.valorPago}
                      onChange={(e) => setPagamentoData({...pagamentoData, valorPago: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Data do Pagamento</label>
                    <input
                      type="date"
                      value={pagamentoData.dataPagamento}
                      onChange={(e) => setPagamentoData({...pagamentoData, dataPagamento: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Observações</label>
                    <textarea
                      rows="2"
                      value={pagamentoData.observacoes}
                      onChange={(e) => setPagamentoData({...pagamentoData, observacoes: e.target.value})}
                    ></textarea>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="button"
                      onClick={() => setShowPagamentoModal(false)}
                      className="btn-advertise-secondary"
                      style={{ flex: 1 }}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="login-button"
                      style={{ flex: 1, backgroundColor: "var(--secondary-color)" }}
                    >
                      {loading ? "💭 Processando..." : "💰 Registrar Pagamento"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Boletos List */}
            <div style={{ maxHeight: "600px", overflowY: "auto", background: 'white', borderRadius: 'var(--border-radius-lg)', padding: '1rem' }}>
              {loading && boletos.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-secondary)" }}>
                  <p>🔄 Carregando boletos...</p>
                </div>
              ) : boletos.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-secondary)" }}>
                  <p>📭 Nenhum boleto encontrado</p>
                </div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead style={{ backgroundColor: "var(--background-light)" }}>
                    <tr>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Nº Boleto</th>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Contrato</th>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Vencimento</th>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Valor</th>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Valor Pago</th>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Status</th>
                      <th style={{ padding: "1rem", textAlign: "center", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {boletos.map((boleto) => (
                      <tr key={boleto.id}>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>{boleto.nossoNumero}</td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>{boleto.numeroContrato || `ID: ${boleto.contratoId}`}</td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>{new Date(boleto.dataVencimento).toLocaleDateString('pt-BR')}</td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>R$ {parseFloat(boleto.valor).toFixed(2)}</td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>
                          {boleto.valorPago > 0 
                            ? `R$ ${parseFloat(boleto.valorPago).toFixed(2)}`
                            : '-'
                          }
                        </td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)" }}>
                          {(() => {
                            const status = boleto.status;
                            let bgColor = '#6c757d';
                            if (status === 'Pago') bgColor = '#28a745';
                            else if (status === 'Pendente') {
                              const vencimento = new Date(boleto.dataVencimento);
                              const hoje = new Date();
                              if (vencimento < hoje) bgColor = '#dc3545';
                              else bgColor = '#ffc107';
                            }
                            else if (status === 'Vencido') bgColor = '#dc3545';
                            else if (status === 'Cancelado') bgColor = '#343a40';
                            
                            return (
                              <span style={{
                                padding: "0.25rem 0.5rem",
                                borderRadius: "var(--border-radius)",
                                backgroundColor: bgColor,
                                color: "white",
                                fontSize: "0.8rem",
                                fontWeight: "bold"
                              }}>
                                {status}
                              </span>
                            );
                          })()}
                        </td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", textAlign: "center" }}>
                          <button
                            onClick={() => handleEdit(boleto)}
                            style={{
                              padding: "6px 12px",
                              backgroundColor: "var(--accent-color)",
                              color: "var(--text-primary)",
                              border: "none",
                              borderRadius: "var(--border-radius)",
                              fontSize: "12px",
                              cursor: "pointer",
                              marginRight: "3px"
                            }}
                            title="Editar"
                          >
                            ✏️
                          </button>
                          {boleto.status !== 'Pago' && (
                            <button
                              onClick={() => handlePagamento(boleto)}
                              style={{
                                padding: "6px 12px",
                                backgroundColor: "var(--secondary-color)",
                                color: "white",
                                border: "none",
                                borderRadius: "var(--border-radius)",
                                fontSize: "12px",
                                cursor: "pointer",
                                marginRight: "3px"
                              }}
                              title="Registrar Pagamento"
                            >
                              💰
                            </button>
                          )}
                          <button
                            onClick={() => gerarSegundaVia(boleto.id)}
                            style={{
                              padding: "6px 12px",
                              backgroundColor: "#17a2b8",
                              color: "white",
                              border: "none",
                              borderRadius: "var(--border-radius)",
                              fontSize: "12px",
                              cursor: "pointer",
                              marginRight: "3px"
                            }}
                            title="Segunda Via"
                          >
                            📄
                          </button>
                          <button
                            onClick={() => handleDelete(boleto.id)}
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
              <Link to="/contratos" className="btn-advertise-primary">
                📋 Gerenciar Contratos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoletoManagement;