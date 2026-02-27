export function formatarCpf(valor) {
  if (!valor) return "";

  valor = valor.replace(/[^\d]/g, "");

  valor = valor.slice(0, 11);

  if (valor.length <= 3) return valor;
  if (valor.length <= 6) return `${valor.slice(0, 3)}.${valor.slice(3)}`;
  if (valor.length <= 9)
    return `${valor.slice(0, 3)}.${valor.slice(3, 6)}.${valor.slice(6)}`;
  return `${valor.slice(0, 3)}.${valor.slice(3, 6)}.${valor.slice(6, 9)}-${valor.slice(9, 11)}`;
}
