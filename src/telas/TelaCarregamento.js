/**
 * =============================================
 * ARQUIVO: TelaCarregamento.js
 * TECNOLOGIAS: React Native, ActivityIndicator
 * FINALIDADE: Exibir tela de carregamento enquanto dados do usuário são processados.
 * =============================================
 */

import React from "react"
import { View, Text, ActivityIndicator, StyleSheet } from "react-native"
import cores from "../utilitarios/cores"

/** ==========================================================
 * FRONT-END: Tela exibida durante carregamentos (autenticação, dados, etc.)
 * ========================================================== */
export default function TelaCarregamento() {
  return (
    <View style={estilos.container}>
      <ActivityIndicator size="large" color={cores.azul} />
      <Text style={estilos.texto}>Carregando dados...</Text>
    </View>
  )
}

/** ==========================================================
 * FRONT-END: Estilização visual
 * ========================================================== */
const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  texto: {
    marginTop: 15,
    fontSize: 16,
    color: "#555",
  },
})
