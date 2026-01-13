// Mock Data para Demonstração
const mockUsers = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@smartrent.com",
    role: "User",
    token: "mock-token-user-123"
  },
  {
    id: 2,
    name: "Maria Admin",
    email: "admin@smartrent.com", 
    role: "Admin",
    token: "mock-token-admin-456"
  }
];

const mockProperties = [
  {
    id: 1,
    title: "Apartamento 3 quartos - Brooklin",
    type: "Apartamento",
    price: 3500,
    rooms: 3,
    bathrooms: 2,
    parking: 1,
    area: 120,
    address: "Rua das Flores, 123 - Brooklin, SP",
    image: "/src/assets/home-DO80yzNA.png",
    description: "Lindo apartamento com ótima localização"
  },
  {
    id: 2,
    title: "Casa com jardim - Moema",
    type: "Casa",
    price: 5800,
    rooms: 4,
    bathrooms: 3,
    parking: 2,
    area: 200,
    address: "Avenida Brasil, 456 - Moema, SP",
    image: "/src/assets/home-DO80yzNA.png",
    description: "Casa espaçosa com jardim e piscina"
  }
];

export const authService = {
  async login(credentials) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Tentando login com:", credentials.email, credentials.password);
        
        const user = mockUsers.find(u => 
          u.email === credentials.email && credentials.password === "123456"
        );
        
        console.log("Usuário encontrado:", user);
        
        if (user) {
          resolve({
            success: true,
            accessToken: user.token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role
            }
          });
        } else {
          reject(new Error("Email ou senha incorretos. Use: admin@smartrent.com / 123456"));
        }
      }, 1000);
    });
  },

  async register(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Usuário cadastrado com sucesso!"
        });
      }, 1000);
    });
  },

  async getProperties() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProperties);
      }, 500);
    });
  },

  async getUserProfile() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const token = localStorage.getItem('token');
        const user = mockUsers.find(u => u.token === token);
        resolve(user || null);
      }, 500);
    });
  }
};