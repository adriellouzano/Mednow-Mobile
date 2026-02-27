import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Header from "../componentes/Header";
import cores from "../utilitarios/cores";
import { FontAwesome } from "@expo/vector-icons";

export default function TelaDetalhesPrescricao() {
  const route = useRoute();
  const navigation = useNavigation();
  const { prescricao } = route.params;

  const formatarData = (data) => {
    try {
      return new Date(data).toLocaleDateString("pt-BR");
    } catch {
      return "Data inválida";
    }
  };

  function calcularHorarios(horarioInicial, frequencia) {
    try {
      const [hora, minuto] = horarioInicial.split(":").map(Number);
      const vezesDia = parseInt(frequencia);
      const intervalo = 24 / vezesDia;

      const result = [];
      for (let i = 0; i < vezesDia; i++) {
        const novaHora = (hora + i * intervalo) % 24;
        result.push(
          `${String(Math.floor(novaHora)).padStart(2, "0")}:${String(
            minuto,
          ).padStart(2, "0")}`,
        );
      }
      return result;
    } catch {
      return [];
    }
  }

  return (
    <View style={estilos.telaCheia}>
      <Header />

      <View style={estilos.container}>
        <Text style={estilos.titulo}>Detalhes da Prescrição</Text>

        <View style={estilos.cartao}>
          {/* MÉDICO */}
          <Text style={estilos.linha}>
            <Text style={estilos.label}>Nome do Médico: </Text>
            <Text style={estilos.inf}>{prescricao.medico?.nome || "—"}</Text>
          </Text>

          {/* MEDICAMENTO */}
          <Text style={estilos.linha}>
            <Text style={estilos.label}>Medicamento: </Text>
            <Text style={estilos.inf}>{prescricao.medicamento}</Text>
          </Text>

          {/* DOSAGEM */}
          <Text style={estilos.linha}>
            <Text style={estilos.label}>Dosagem: </Text>
            <Text style={estilos.inf}>{prescricao.dosagem || "—"}</Text>
          </Text>

          {/* FREQUÊNCIA */}
          <Text style={estilos.linha}>
            <Text style={estilos.label}>Frequência: </Text>
            <Text style={estilos.inf}>{prescricao.frequencia || "—"}</Text>
          </Text>

          {/* DURAÇÃO */}
          <Text style={estilos.linha}>
            <Text style={estilos.label}>Duração: </Text>
            <Text style={estilos.inf}>{prescricao.duracao || "—"}</Text>
          </Text>

          {/* TIPO */}
          <Text style={estilos.linha}>
            <Text style={estilos.label}>Tipo de Medicamento: </Text>
            <Text style={estilos.inf}>{prescricao.tipoMedicamento || "—"}</Text>
          </Text>

          {/* DATA */}
          <Text style={estilos.linha}>
            <Text style={estilos.label}>Data da Prescrição: </Text>
            <Text style={estilos.inf}>{formatarData(prescricao.criadoEm)}</Text>
          </Text>

          {/* OBSERVAÇÕES */}
          <Text style={estilos.linha}>
            <Text style={estilos.label}>Observações: </Text>
            {prescricao.observacoes || "—"}
          </Text>

          {/* ALARMES */}
          {(prescricao.alarmes?.length ?? 0) > 0 && (
            <>
              <Text style={[estilos.label, { marginTop: -5 }]}>
                Notificações:
              </Text>

              {prescricao.alarmes.map((a, idx) => {
                const horarios = calcularHorarios(
                  a.horarioInicial,
                  a.frequenciaDiaria,
                );

                return (
                  <View key={idx} style={{ marginTop: 6 }}>
                    <Text style={{ fontSize: 15, color: cores.azul }}>
                      ⏰ Notificação configurada: {a.horarioInicial}
                    </Text>

                    {horarios.length > 0 && (
                      <Text style={{ fontSize: 15 }}>
                        Horários diários:{" "}
                        <Text style={{ fontWeight: "bold" }}>
                          {horarios.join(", ")}
                        </Text>
                      </Text>
                    )}

                    <Text style={{ fontSize: 15, color: "#555" }}>
                      Frequência: {a.frequenciaDiaria}x ao dia
                    </Text>
                  </View>
                );
              })}
            </>
          )}

          {/* ENTREGA */}
          {prescricao.entrega && (
            <View
              style={{
                backgroundColor: "#ecfdf5",
                borderColor: "#34d399",
                borderWidth: 2,
                padding: 10,
                borderRadius: 8,
                marginTop: 10,
              }}
            >
              <Text
                style={{ color: "#065f46", fontSize: 15, fontWeight: "bold" }}
              >
                📦 Entregue em:{" "}
                {formatarData(
                  prescricao.entrega.dataEntrega || prescricao.criadoEm,
                )}
              </Text>
            </View>
          )}
        </View>

        {/* BOTÃO VOLTAR */}
        <TouchableOpacity
          style={estilos.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="arrow-left" size={16} color={cores.azul} />
          <Text style={estilos.textoBotaoVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  telaCheia: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cartao: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  linha: {
    fontSize: 16,
    color: "#333",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 4,
    marginBottom: 12,
  },
  label: {
    fontWeight: "bold",
    color: "#555",
  },
  botaoVoltar: {
    backgroundColor: "#E6F0FF",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  textoBotaoVoltar: {
    color: cores.azul,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
