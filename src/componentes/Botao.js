/**
 * =============================================
 * ARQUIVO: Botao.js
 * TECNOLOGIAS: React Native
 * FINALIDADE: Componente reutilizável para botões do sistema MedNow Mobile.
 * =============================================
 */

import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import cores from "../utilitarios/cores"

/** ==========================================================
 * FRONT-END: Botão padrão com variação de cores e estados
 * ========================================================== */
export default function Botao({ titulo, onPress, cor = cores.azul, desabilitado = false }) {
  return (
    <TouchableOpacity
      style={[estilos.botao, { backgroundColor: desabilitado ? "#ccc" : cor }]}
      onPress={onPress}
      disabled={desabilitado}
    >
      <Text style={estilos.texto}>{titulo}</Text>
    </TouchableOpacity>
  )
}

/** ==========================================================
 * FRONT-END: Estilização visual do botão
 * ========================================================== */
const estilos = StyleSheet.create({
  botao: {
    width: "100%",
    height: 45,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  texto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
})
