import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userService } from "../services/api";
import { getUserFromToken } from "../utils/auth";
import Header from "../components/Header";
import "../styles/Homepage.css";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User"
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await userService.getAll();
      setUsers(data);
      setError("");
    } catch (err) {
      setError("Erro ao carregar usuários");
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
      if (editingUser) {
        // TODO: Implementar atualização
        setError("Função de editar ainda não implementada");
      } else {
        // Criar novo usuário (via endpoint de registro)
        await userService.register(formData);
        setFormData({ name: "", email: "", password: "", role: "User" });
        setShowForm(false);
        await loadUsers();
      }
    } catch (err) {
      setError("Erro ao salvar usuário");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role
    });
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) return;

    setLoading(true);
    try {
      // TODO: Implementar exclusão
      setError("Função de excluir ainda não implementada");
    } catch {
      setError("Erro ao excluir usuário");
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
            <h1 className="hero-title">👥 Gestão de Usuários</h1>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              Admin: {currentUser?.name}
            </p>

            {/* Error Alert */}
            {error && (
              <div className="login-error">
                ⚠️ {error}
              </div>
            )}

            {/* Add User Button */}
            <div style={{ textAlign: "center", marginBottom: "25px" }}>
              <button
                onClick={() => {
                  setEditingUser(null);
                  setFormData({ name: "", email: "", password: "", role: "User" });
                  setShowForm(!showForm);
                }}
                className="btn-advertise-primary"
                style={{ width: 'auto', padding: '12px 24px' }}
              >
                {showForm ? "➖ Cancelar" : "➕ Novo Usuário"}
              </button>
            </div>

            {/* User Form */}
            {showForm && (
              <div className="login-form" style={{ marginBottom: "25px", background: '#f8f9fa', padding: '20px', borderRadius: 'var(--border-radius-lg)' }}>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div className="form-group">
                    <label>Nome</label>
                    <input
                      type="text"
                      placeholder="Nome completo"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="email@exemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Senha</label>
                    <input
                      type="password"
                      placeholder={editingUser ? "Nova senha (deixe em branco para manter)" : "Senha"}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required={!editingUser}
                    />
                  </div>
                  <div className="form-group">
                    <label>Tipo de Usuário</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option value="User">Usuário</option>
                      <option value="Admin">Administrador</option>
                    </select>
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

            {/* Users List */}
            <div style={{ maxHeight: "400px", overflowY: "auto", background: 'white', borderRadius: 'var(--border-radius-lg)', padding: '1rem' }}>
              {loading && users.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-secondary)" }}>
                  <p>🔄 Carregando usuários...</p>
                </div>
              ) : users.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-secondary)" }}>
                  <p>📭 Nenhum usuário encontrado</p>
                </div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead style={{ backgroundColor: "var(--background-light)" }}>
                    <tr>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>ID</th>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Nome</th>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Email</th>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Perfil</th>
                      <th style={{ padding: "1rem", textAlign: "left", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Data</th>
                      <th style={{ padding: "1rem", textAlign: "center", borderBottom: "2px solid var(--border-color)", color: "var(--text-primary)" }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>{user.id}</td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>{user.name}</td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>{user.email}</td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)" }}>
                          <span style={{
                            padding: "0.25rem 0.5rem",
                            borderRadius: "var(--border-radius)",
                            backgroundColor: user.role === 'Admin' ? 'var(--secondary-color)' : 'var(--primary-color)',
                            color: "white",
                            fontSize: "0.8rem",
                            fontWeight: "bold"
                          }}>
                            {user.role}
                          </span>
                        </td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", color: "var(--text-primary)" }}>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: "1rem", borderBottom: "1px solid var(--border-color)", textAlign: "center" }}>
                          <button
                            onClick={() => handleEdit(user)}
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
                            onClick={() => handleDelete(user.id)}
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