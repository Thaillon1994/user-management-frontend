import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { userService, imovelService, consignacaoService } from "../services/api";

export default function Home() {
  const [activeTab, setActiveTab] = useState("users");
  const [data, setData] = useState({
    users: [],
    imoveis: [],
    consignacoes: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [activeTab, loadData]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      let result = [];
      switch (activeTab) {
        case "users":
          result = await userService.getAll();
          break;
        case "imoveis":
          result = await imovelService.getAll();
          break;
        case "consignacoes":
          result = await consignacaoService.getAll();
          break;
      }
      setData(prev => ({ ...prev, [activeTab]: result }));
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0 }}>Sistema de Gestão</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/register" style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: '#28a745', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '4px' 
          }}>
            Novo Usuário
          </Link>
          <button 
            onClick={handleLogout}
            style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: '#dc3545', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Sair
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {['users', 'imoveis', 'consignacoes'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: activeTab === tab ? '#007bff' : '#f8f9fa',
              border: activeTab === tab ? 'none' : '1px solid #dee2e6',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {tab === 'users' ? 'Usuários' : tab === 'imoveis' ? 'Imóveis' : 'Consignações'}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div style={{ 
          border: '1px solid #dee2e6', 
          borderRadius: '8px', 
          overflow: 'hidden' 
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                {activeTab === 'users' && (
                  <>
                    <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>ID</th>
                    <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Nome</th>
                    <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Email</th>
                    <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Data</th>
                  </>
                )}
                {activeTab === 'imoveis' && (
                  <>
                    <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>ID</th>
                    <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Nome</th>
                    <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Endereço</th>
                    <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Valor</th>
                  </>
                )}
                {activeTab === 'consignacoes' && (
                  <>
                    <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>ID</th>
                    <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Funcionário</th>
                    <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Empresa</th>
                    <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Valor</th>
                    <th style={{ padding: '1rem', textAlign: 'left', border: '1px solid #dee2e6' }}>Status</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {data[activeTab].map((item) => (
                <tr key={item.id}>
                  {activeTab === 'users' && (
                    <>
                      <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>{item.id}</td>
                      <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>{item.name}</td>
                      <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>{item.email}</td>
                      <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                    </>
                  )}
                  {activeTab === 'imoveis' && (
                    <>
                      <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>{item.id}</td>
                      <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>{item.nome}</td>
                      <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>{item.endereco}</td>
                      <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>
                        R$ {item.valorMensal?.toFixed(2)}
                      </td>
                    </>
                  )}
                  {activeTab === 'consignacoes' && (
                    <>
                      <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>{item.id}</td>
                      <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>{item.nomeFuncionario}</td>
                      <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>{item.empresa}</td>
                      <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>
                        R$ {item.valorSolicitado?.toFixed(2)}
                      </td>
                      <td style={{ padding: '1rem', border: '1px solid #dee2e6' }}>
                        <span style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          backgroundColor: item.status === 'Aprovada' ? '#d4edda' : '#fff3cd',
                          color: item.status === 'Aprovada' ? '#155724' : '#856404'
                        }}>
                          {item.status}
                        </span>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          
          {data[activeTab].length === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#6c757d' }}>
              Nenhum registro encontrado.
            </div>
          )}
        </div>
      )}
    </div>
  );
}