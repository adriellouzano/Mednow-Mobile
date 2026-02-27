import axios from "axios";

const api = axios.create({
  baseURL: "https://mednow-one.vercel.app/",
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "Erro na requisição API:",
      error.response?.data || error.message,
    );
    return Promise.reject(error);
  },
);

export async function loginAPI(cpf, senha) {
  const cpfLimpo = String(cpf).replace(/[^\d]/g, "");
  return api.post("/api/usuarios/login", { cpf: cpfLimpo, senha });
}

export async function listarPrescricoesAPI(pacienteId, token) {
  return api.get(`/api/prescricoes/listar`, {
    params: { pacienteId },
    headers: { Authorization: `Bearer ${token}` },
  });
}

export default api;
