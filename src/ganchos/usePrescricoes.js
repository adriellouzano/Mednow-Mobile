import { useState, useEffect } from "react";
import api from "../servicos/api";

export default function usePrescricoes(pacienteId) {
  const [prescricoes, setPrescricoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  async function carregarPrescricoes() {
    try {
      setCarregando(true);
      const resposta = await api.post("/api/prescricoes/listar", {
        pacienteId,
      });
      setPrescricoes(resposta.data);
      setErro(null);
    } catch (e) {
      console.error("Erro ao carregar prescrições:", e);
      setErro("Não foi possível carregar as prescrições.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (pacienteId) carregarPrescricoes();
  }, [pacienteId]);

  return { prescricoes, carregando, erro, recarregar: carregarPrescricoes };
}
