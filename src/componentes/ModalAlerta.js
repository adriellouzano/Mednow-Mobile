import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import cores from "../utilitarios/cores";

export default function ModalAlerta({
  visivel,
  titulo,
  mensagem,
  onConfirmar,
  onFechar,
}) {
  if (!visivel) return null;

  return (
    <Modal transparent animationType="fade" visible={visivel}>
      <View style={estilos.fundo}>
        <View style={estilos.caixa}>
          <Text style={estilos.titulo}>{titulo}</Text>
          <Text style={estilos.mensagem}>{mensagem}</Text>

          <View style={estilos.botoes}>
            <TouchableOpacity
              style={[estilos.botao, { backgroundColor: cores.azul }]}
              onPress={onConfirmar}
            >
              <Text style={estilos.textoBotao}>Confirmar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[estilos.botao, { backgroundColor: "#ccc" }]}
              onPress={onFechar}
            >
              <Text style={[estilos.textoBotao, { color: "#333" }]}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const estilos = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  caixa: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "80%",
    padding: 20,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  mensagem: {
    fontSize: 15,
    color: "#333",
    marginBottom: 20,
  },
  botoes: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  botao: {
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
});
