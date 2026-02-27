import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  RefreshControl,
} from "react-native";

import { useAuth } from "../contexto/AuthContext";
import cores from "../utilitarios/cores";
import { useNavigation } from "@react-navigation/native";
import Header from "../componentes/Header";

export default function TelaPrescricoes() {
  const { usuario, prescricoesGlobal, atualizarDados } = useAuth();

  const [refreshing, setRefreshing] = useState(false);
  const [horaAtual, setHoraAtual] = useState("");
  const navigation = useNavigation();

  const onRefresh = async () => {
    setRefreshing(true);
    await atualizarDados();
    setRefreshing(false);
  };

  useEffect(() => {
    const intervalo = setInterval(() => {
      const agora = new Date().toLocaleTimeString("pt-BR", {
        hour12: false,
      });
      setHoraAtual(agora);
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  function calcularHorarios(horarioInicial, frequencia) {
    try {
      const [hora, minuto] = horarioInicial.split(":").map(Number);
      const vezesDia = parseInt(frequencia);
      const intervalo = 24 / vezesDia;

      const result = [];
      for (let i = 0; i < vezesDia; i++) {
        const nova = (hora + i * intervalo) % 24;
        result.push(
          `${String(Math.floor(nova)).padStart(2, "0")}:${String(
            minuto,
          ).padStart(2, "0")}`,
        );
      }
      return result;
    } catch {
      return [];
    }
  }

  const renderItem = ({ item }) => {
    const entregue = !!item?.entrega;
    const alarmes = item?.alarmes || [];

    return (
      <View style={[estilos.cartao, entregue && estilos.cartaoEntregue]}>
        {/* Cabeçalho do cartão */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {/* O ícone de alarme e caixa aparecem sozinhos quando o contexto atualiza */}
          <Text style={[estilos.medicamento, entregue && { color: "#0a6b2a" }]}>
            {item.medicamento} {entregue ? "📦" : ""}{" "}
            {alarmes.length > 0 ? "⏰" : ""}
          </Text>

          <Text style={estilos.hora}>
            {new Date(item.criadoEm).toLocaleDateString("pt-BR")}
          </Text>
        </View>

        {/* Frequência */}
        <Text style={estilos.texto}>Frequência: {item.frequencia ?? "-"}</Text>

        {/* Relógio realtime */}
        <Text style={[estilos.texto, { fontStyle: "italic", marginTop: 4 }]}>
          ⏱ Hora atual: {horaAtual}
        </Text>

        {/* Exibindo detalhes dos alarmes (Vem do Contexto) */}
        {alarmes.length > 0 &&
          alarmes.map((a, idx) => {
            const horarios = calcularHorarios(
              a.horarioInicial,
              a.frequenciaDiaria,
            );

            return (
              <View key={idx} style={{ marginTop: 6 }}>
                <Text
                  style={[
                    estilos.texto,
                    { color: cores.azul, fontWeight: "bold" },
                  ]}
                >
                  ⏰ Alarme Configurado
                </Text>

                {horarios.length > 0 && (
                  <Text style={estilos.texto}>
                    Horários: {horarios.join(", ")}
                  </Text>
                )}
              </View>
            );
          })}

        {/* Entrega (Atualiza sozinho quando o farmacêutico marca) */}
        {entregue && (
          <View style={estilos.boxEntrega}>
            <Text style={{ color: "#065f46", fontWeight: "bold" }}>
              📦 Entregue em:{" "}
              {new Date(
                item.entrega?.dataEntrega || item.criadoEm,
              ).toLocaleDateString("pt-BR")}
            </Text>
          </View>
        )}

        {/* Botão ver detalhes */}
        <TouchableOpacity
          style={estilos.botao}
          onPress={() =>
            navigation.navigate("TelaDetalhesPrescricao", { prescricao: item })
          }
        >
          <Image
            source={require("../../assets/prescricoes.png")}
            style={estilos.footerLogo}
            resizeMode="contain"
          />
          <Text style={estilos.textoBotao}>Ver Prescrição</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={estilos.telaCheia}>
      <Header />

      <View style={estilos.container}>
        <Text style={estilos.titulo}>Suas Prescrições</Text>

        {/* LISTA USA DADOS GLOBAIS AGORA */}
        <FlatList
          data={prescricoesGlobal} // <--- VEM DO AUTHCONTEXT
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <Text style={estilos.vazio}>
              {usuario ? "Nenhuma prescrição encontrada." : "Carregando..."}
            </Text>
          }
        />
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cartao: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cartaoEntregue: {
    backgroundColor: "#f0fdf4",
    borderColor: "#34d399",
    borderWidth: 2,
  },
  medicamento: {
    fontWeight: "bold",
    fontSize: 16,
  },
  hora: {
    fontSize: 13,
    color: "#777",
  },
  texto: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  botao: {
    backgroundColor: "#E6F0FF",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8, // Adicionei um padding vertical para centralizar melhor
  },
  textoBotao: {
    color: cores.azul,
    fontWeight: "bold",
    marginLeft: 8,
  },
  vazio: {
    textAlign: "center",
    color: "#555",
    marginTop: 20,
  },
  footerLogo: {
    width: 25,
    height: 35,
  },
  boxEntrega: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#dcfce7",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#34d399",
  },
});
