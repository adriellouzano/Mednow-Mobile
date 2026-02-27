import AsyncStorage from "@react-native-async-storage/async-storage";

export async function salvarDados(chave, valor) {
  try {
    await AsyncStorage.setItem(chave, JSON.stringify(valor));
  } catch (erro) {
    console.log("Erro ao salvar dados:", erro);
  }
}

export async function carregarDados(chave) {
  try {
    const valor = await AsyncStorage.getItem(chave);
    return valor ? JSON.parse(valor) : null;
  } catch (erro) {
    console.log("Erro ao carregar dados:", erro);
    return null;
  }
}

export async function removerDados(chave) {
  try {
    await AsyncStorage.removeItem(chave);
  } catch (erro) {
    console.log("Erro ao remover dados:", erro);
  }
}

/** ==========================================================
 * FRONT-END: Limpa todo o armazenamento local (logout forçado)
 * ========================================================== */
export async function limparTudo() {
  try {
    await AsyncStorage.clear();
  } catch (erro) {
    console.log("Erro ao limpar armazenamento:", erro);
  }
}
