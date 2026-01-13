import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { consignacaoService, userService, imovelService } from "../services/api";
import { getUserFromToken } from "../utils/auth";
import homeImage from "../assets/images/home.png";

export default function AdminOnly() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalImoveis: 0,
    totalConsignacoes: 0,
    consignacoesPendentes: 0,
    consignacoesAprovadas: 0,
    consignacoesRejeitadas: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [users, imoveis, consignacoes] = await Promise.all([
        userService.getAll(),
        imovelService.getAll(),
        consignacaoService.getAll()
      ]);

      const consignacoesStats = consignacoes.reduce((acc, consignacao) => {
        switch (consignacao.status) {
          case 'Pendente':
            acc.pendentes++;
            break;
          case 'Aprovada':
            acc.aprovadas++;
            break;
          case 'Rejeitada':
            acc.rejeitadas++;
            break;
        }
        return acc;
      }, { pendentes: 0, aprovadas: 0, rejeitadas: 0 });

      setStats({
        totalUsers: users.length,
        totalImoveis: imoveis.length,
        totalConsignacoes: consignacoes.length,
        consignacoesPendentes: consignacoesStats.pendentes,
        consignacoesAprovadas: consignacoesStats.aprovadas,
        consignacoesRejeitadas: consignacoesStats.rejeitadas
      });
    } catch (err) {
      setError("Erro ao carregar estatísticas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const currentUser = getUserFromToken();

  return (
    <>
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `url(${homeImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: -1,
        filter: "brightness(0.7)"
      }} />
      
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div style={{ 
          maxWidth: "800px", 
          width: "100%",
          margin: "0 20px",
          padding: "40px", 
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(15px)",
          borderRadius: "20px",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
          border: "1px solid rgba(255, 255, 255, 0.2)"
        }}>
          
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <div style={{
              width: "80px",
              height: "80px",
              backgroundColor: "rgba(255, 215, 0, 0.8)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              fontSize: "32px"
            }}>
              🛠️
            </div>
            <h1 style={{ 
              margin: "0 0 15px 0", 
              color: "#FFD700", 
              textShadow: "3px 3px 8px rgba(0,0,0,0.9)",
              fontSize: "32px",
              fontWeight: "bold"
            }}>
              Painel Administrativo
            </h1>
            <p style={{ 
              margin: "0", 
              color: "#F0E68C", 
              textShadow: "2px 2px 6px rgba(0,0,0,0.8)",
              fontSize: "16px"
            }}>
              Bem-vindo, Admin: {currentUser?.name}
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div style={{
              marginBottom: "20px",
              padding: "15px",
              backgroundColor: "rgba(220, 53, 69, 0.2)",
              border: "1px solid rgba(220, 53, 69, 0.5)",
              borderRadius: "10px",
              color: "#FF6B6B",
              textAlign: "center"
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "3rem", color: "white" }}>
              <p style={{ fontSize: "18px" }}>🔄 Carregando estatísticas...</p>
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
                gap: "20px", 
                marginBottom: "40px" 
              }}>
                {/* Total Users */}
                <div style={{
                  padding: "25px",
                  backgroundColor: "rgba(0, 123, 255, 0.2)",
                  border: "1px solid rgba(0, 123, 255, 0.4)",
                  borderRadius: "15px",
                  textAlign: "center",
                  backdropFilter: "blur(5px)"
                }}>
                  <div style={{ fontSize: "48px", marginBottom: "10px" }}>👥</div>
                  <div style={{ 
                    fontSize: "32px", 
                    fontWeight: "bold", 
                    color: "#87CEEB", 
                    marginBottom: "5px" 
                  }}>
                    {stats.totalUsers}
                  </div>
                  <div style={{ color: "#B0E0E6", fontSize: "16px" }}>
                    Total de Usuários
                  </div>
                </div>

                {/* Total Imoveis */}
                <div style={{
                  padding: "25px",
                  backgroundColor: "rgba(255, 193, 7, 0.2)",
                  border: "1px solid rgba(255, 193, 7, 0.4)",
                  borderRadius: "15px",
                  textAlign: "center",
                  backdropFilter: "blur(5px)"
                }}>
                  <div style={{ fontSize: "48px", marginBottom: "10px" }}>🏠</div>
                  <div style={{ 
                    fontSize: "32px", 
                    fontWeight: "bold", 
                    color: "#FFD700", 
                    marginBottom: "5px" 
                  }}>
                    {stats.totalImoveis}
                  </div>
                  <div style={{ color: "#F0E68C", fontSize: "16px" }}>
                    Total de Imóveis
                  </div>
                </div>

                {/* Total Consignacoes */}
                <div style={{
                  padding: "25px",
                  backgroundColor: "rgba(40, 167, 69, 0.2)",
                  border: "1px solid rgba(40, 167, 69, 0.4)",
                  borderRadius: "15px",
                  textAlign: "center",
                  backdropFilter: "blur(5px)"
                }}>
                  <div style={{ fontSize: "48px", marginBottom: "10px" }}>📋</div>
                  <div style={{ 
                    fontSize: "32px", 
                    fontWeight: "bold", 
                    color: "#90EE90", 
                    marginBottom: "5px" 
                  }}>
                    {stats.totalConsignacoes}
                  </div>
                  <div style={{ color: "#98FB98", fontSize: "16px" }}>
                    Total de Consignações
                  </div>
                </div>
              </div>

              {/* Consignacoes Status */}
              <div style={{ marginBottom: "40px" }}>
                <h2 style={{ 
                  textAlign: "center", 
                  color: "#FFD700", 
                  marginBottom: "20px",
                  fontSize: "24px"
                }}>
                  📊 Status das Consignações
                </h2>
                
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
                  gap: "15px" 
                }}>
                  {/* Pendentes */}
                  <div style={{
                    padding: "20px",
                    backgroundColor: "rgba(255, 193, 7, 0.2)",
                    border: "1px solid rgba(255, 193, 7, 0.4)",
                    borderRadius: "12px",
                    textAlign: "center",
                    backdropFilter: "blur(5px)"
                  }}>
                    <div style={{ fontSize: "32px", marginBottom: "8px" }}>⏳</div>
                    <div style={{ 
                      fontSize: "24px", 
                      fontWeight: "bold", 
                      color: "#FFD700", 
                      marginBottom: "5px" 
                    }}>
                      {stats.consignacoesPendentes}
                    </div>
                    <div style={{ color: "#F0E68C", fontSize: "14px" }}>
                      Pendentes
                    </div>
                  </div>

                  {/* Aprovadas */}
                  <div style={{
                    padding: "20px",
                    backgroundColor: "rgba(40, 167, 69, 0.2)",
                    border: "1px solid rgba(40, 167, 69, 0.4)",
                    borderRadius: "12px",
                    textAlign: "center",
                    backdropFilter: "blur(5px)"
                  }}>
                    <div style={{ fontSize: "32px", marginBottom: "8px" }}>✅</div>
                    <div style={{ 
                      fontSize: "24px", 
                      fontWeight: "bold", 
                      color: "#90EE90", 
                      marginBottom: "5px" 
                    }}>
                      {stats.consignacoesAprovadas}
                    </div>
                    <div style={{ color: "#98FB98", fontSize: "14px" }}>
                      Aprovadas
                    </div>
                  </div>

                  {/* Rejeitadas */}
                  <div style={{
                    padding: "20px",
                    backgroundColor: "rgba(220, 53, 69, 0.2)",
                    border: "1px solid rgba(220, 53, 69, 0.4)",
                    borderRadius: "12px",
                    textAlign: "center",
                    backdropFilter: "blur(5px)"
                  }}>
                    <div style={{ fontSize: "32px", marginBottom: "8px" }}>❌</div>
                    <div style={{ 
                      fontSize: "24px", 
                      fontWeight: "bold", 
                      color: "#FF6B6B", 
                      marginBottom: "5px" 
                    }}>
                      {stats.consignacoesRejeitadas}
                    </div>
                    <div style={{ color: "#FFA07A", fontSize: "14px" }}>
                      Rejeitadas
                    </div>
                  </div>
                </div>
              </div>

              {/* Alert for Pending */}
              {stats.consignacoesPendentes > 0 && (
                <div style={{
                  marginBottom: "30px",
                  padding: "20px",
                  backgroundColor: "rgba(255, 193, 7, 0.2)",
                  border: "1px solid rgba(255, 193, 7, 0.4)",
                  borderRadius: "12px",
                  textAlign: "center",
                  backdropFilter: "blur(5px)"
                }}>
                  <p style={{ 
                    margin: "0", 
                    color: "#FFD700", 
                    fontSize: "16px",
                    fontWeight: "600"
                  }}>
                    ⚠️ Você tem {stats.consignacoesPendentes} consignação(ões) pendente(s) de análise!
                  </p>
                </div>
              )}
            </>
          )}

          {/* Quick Actions */}
          <div>
            <h2 style={{ 
              textAlign: "center", 
              color: "#FFD700", 
              marginBottom: "20px",
              fontSize: "24px"
            }}>
              ⚡ Ações Rápidas
            </h2>
            
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
              gap: "15px",
              marginBottom: "30px"
            }}>
              <Link to="/users" style={{
                padding: "20px",
                backgroundColor: "rgba(0, 123, 255, 0.2)",
                border: "1px solid rgba(0, 123, 255, 0.4)",
                borderRadius: "12px",
                textAlign: "center",
                textDecoration: "none",
                color: "#87CEEB",
                backdropFilter: "blur(5px)",
                transition: "all 0.3s ease"
              }}>
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>👥</div>
                <div style={{ fontSize: "16px", fontWeight: "600" }}>
                  Gerenciar Usuários
                </div>
              </Link>

              <Link to="/imoveis" style={{
                padding: "20px",
                backgroundColor: "rgba(255, 193, 7, 0.2)",
                border: "1px solid rgba(255, 193, 7, 0.4)",
                borderRadius: "12px",
                textAlign: "center",
                textDecoration: "none",
                color: "#FFD700",
                backdropFilter: "blur(5px)",
                transition: "all 0.3s ease"
              }}>
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>🏠</div>
                <div style={{ fontSize: "16px", fontWeight: "600" }}>
                  Gerenciar Imóveis
                </div>
              </Link>

              <Link to="/consignacoes" style={{
                padding: "20px",
                backgroundColor: "rgba(40, 167, 69, 0.2)",
                border: "1px solid rgba(40, 167, 69, 0.4)",
                borderRadius: "12px",
                textAlign: "center",
                textDecoration: "none",
                color: "#90EE90",
                backdropFilter: "blur(5px)",
                transition: "all 0.3s ease"
              }}>
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>📋</div>
                <div style={{ fontSize: "16px", fontWeight: "600" }}>
                  Gerenciar Consignações
                </div>
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", gap: "15px", justifyContent: "center", marginTop: "30px" }}>
            <Link to="/home" style={{ 
              padding: "12px 24px", 
              backgroundColor: "rgba(0, 123, 255, 0.8)", 
              color: "white", 
              textDecoration: "none", 
              borderRadius: "25px",
              backdropFilter: "blur(5px)"
            }}>
              🏠 Página Inicial
            </Link>
            <button
              onClick={loadStats}
              style={{
                padding: "12px 24px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "25px",
                fontSize: "16px",
                cursor: "pointer",
                backdropFilter: "blur(5px)"
              }}
            >
              🔄 Atualizar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}