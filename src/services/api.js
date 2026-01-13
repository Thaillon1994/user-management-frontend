import axios from 'axios';

const API_URL = 'http://localhost:5044/api';

// Configurar axios para incluir token em todas as requisições
const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para incluir token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const apiClient = api;

// Services específicos
export const authService = {
  login: async ({ email, password }) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async ({ name, email, password, confirmPassword }) => {
    const response = await api.post('/users', { name, email, password, confirmPassword });
    return response.data;
  }
};

export const userService = {
  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  }
};

export const imovelService = {
  getAll: async () => {
    const response = await api.get('/imoveis');
    return response.data;
  },

  create: async (imovel) => {
    const response = await api.post('/imoveis', imovel);
    return response.data;
  },

  update: async (id, imovel) => {
    const response = await api.put(`/imoveis/${id}`, imovel);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/imoveis/${id}`);
    return response.data;
  }
};

export const consignacaoService = {
  getAll: async () => {
    const response = await api.get('/consignacoes');
    return response.data;
  },

  create: async (consignacao) => {
    const response = await api.post('/consignacoes', consignacao);
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await api.put(`/consignacoes/${id}/status`, status);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/consignacoes/${id}`);
    return response.data;
  }
};

export const contratoService = {
  getAll: async () => {
    const response = await api.get('/contratos');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/contratos/${id}`);
    return response.data;
  },

  create: async (contrato) => {
    const response = await api.post('/contratos', contrato);
    return response.data;
  },

  update: async (id, contrato) => {
    const response = await api.put(`/contratos/${id}`, contrato);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/contratos/${id}`);
    return response.data;
  },

  gerarBoletos: async (id, dados) => {
    const response = await api.post(`/contratos/${id}/gerar-boletos`, dados);
    return response.data;
  },

  getBoletos: async (id) => {
    const response = await api.get(`/contratos/${id}/boletos`);
    return response.data;
  }
};

export const boletoService = {
  getAll: async () => {
    const response = await api.get('/boletos');
    return response.data;
  },

  getPendentes: async () => {
    const response = await api.get('/boletos/pendentes');
    return response.data;
  },

  getVencidos: async () => {
    const response = await api.get('/boletos/vencidos');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/boletos/${id}`);
    return response.data;
  },

  create: async (boleto) => {
    const response = await api.post('/boletos', boleto);
    return response.data;
  },

  update: async (id, boleto) => {
    const response = await api.put(`/boletos/${id}`, boleto);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/boletos/${id}`);
    return response.data;
  },

  registrarPagamento: async (id, pagamento) => {
    const response = await api.post(`/boletos/${id}/registrar-pagamento`, pagamento);
    return response.data;
  },

  gerarSegundaVia: async (id) => {
    const response = await api.get(`/boletos/${id}/segunda-via`);
    return response.data;
  }
};