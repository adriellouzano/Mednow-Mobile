export function formatarData(dataISO) {
  if (!dataISO) return "—";
  try {
    const data = new Date(dataISO);
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "Data inválida";
  }
}

export function formatarHora(dataISO) {
  if (!dataISO) return "—";
  try {
    const data = new Date(dataISO);
    return data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "Hora inválida";
  }
}
