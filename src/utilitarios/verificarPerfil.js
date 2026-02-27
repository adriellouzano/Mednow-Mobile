export function verificarPerfil(usuario) {
  if (!usuario) return false;
  return usuario.perfis?.includes("paciente");
}

export const mensagemAcessoNegado =
  "Acesso restrito. Este aplicativo é exclusivo para o perfil de paciente.";
