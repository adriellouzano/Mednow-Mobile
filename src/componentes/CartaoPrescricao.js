import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import cores from "../utilitarios/cores";

export default function CartaoPrescricao({
  medicamento,
  data,
  frequencia,
  entregue = false,
  alarme = false,
  onVer,
  onConfigurarAlarme,
}) {
  return (
    <View style={[estilos.container, entregue && estilos.entregue]}>
      <View style={estilos.linha}>
        <Text style={estilos.medicamento}>{medicamento}</Text>
        <Text style={estilos.data}>{data}</Text>
      </View>

      <Text style={estilos.texto}>Frequência: {frequencia}</Text>
      {alarme && <Text style={estilos.alarme}>⏰ Alarme configurado</Text>}
      {entregue && (
        <Text style={estilos.entregueTexto}>📦 Entregue na farmácia</Text>
      )}

      <View style={estilos.acoes}>
        <TouchableOpacity
          style={[estilos.botao, { backgroundColor: cores.azul }]}
          onPress={onVer}
        >
          <Text style={estilos.textoBotao}>Ver</Text>
        </TouchableOpacity>

        {onConfigurarAlarme && (
          <TouchableOpacity
            style={[estilos.botao, { backgroundColor: "#E6F0FF" }]}
            onPress={onConfigurarAlarme}
          >
            <Text style={[estilos.textoBotao, { color: cores.azul }]}>
              Alarme
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 1,
  },
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  medicamento: {
    fontSize: 16,
    fontWeight: "bold",
  },
  data: {
    fontSize: 13,
    color: "#777",
  },
  texto: {
    fontSize: 14,
    color: "#555",
  },
  alarme: {
    color: cores.azul,
    marginTop: 4,
    fontWeight: "500",
  },
  entregueTexto: {
    color: "green",
    marginTop: 4,
    fontWeight: "500",
  },
  acoes: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    gap: 8,
  },
  botao: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
  entregue: {
    borderColor: "green",
    backgroundColor: "#F5FFF5",
  },
});
