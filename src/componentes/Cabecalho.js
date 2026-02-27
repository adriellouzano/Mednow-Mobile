/**
 * =============================================
 * ARQUIVO: Cabecalho.js
 * TECNOLOGIAS: React Native
 * FINALIDADE: Exibir o título da tela e botão de logout.
 * =============================================
 */

import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useAuth } from "../contexto/AuthContext"
import { Ionicons } from "@expo/vector-icons"
import cores from "../utilitarios/cores"

/** ==========================================================
 * FRONT-END: Cabeçalho genérico usado nas telas principais
 * ========================================================== */
export default function Cabecalho({ titulo }) {
  const { logout } = useAuth()

  /** ==========================================================
   * FRONT-END: Botão de logout
   * ========================================================== */
  function sair() {
    logout()
  }

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>{titulo}</Text>
      <TouchableOpacity style={estilos.botaoSair} onPress={sair}>
        <Ionicons name="exit-outline" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

/** ==========================================================
 * FRONT-END: Estilização visual do cabeçalho
 * ========================================================== */
const estilos = StyleSheet.create({
  container: {
    width: "100%",
    height: 55,
    backgroundColor: cores.azul,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    elevation: 2,
  },
  titulo: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  botaoSair: {
    padding: 5,
  },
})
