import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import cores from "../utilitarios/cores";

import {
  solicitarPermissaoNotificacoes,
  configurarCanalAndroid,
  CHANNEL_ID,
} from "../servicos/notificacoes";

export default function TelaConfigAlarme({ route, navigation }) {
  const { prescricao } = route.params;
  const [horario, setHorario] = useState(new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);

  function abrirPicker() {
    setMostrarPicker(true);
  }

  function definirHorario(event, novaHora) {
    setMostrarPicker(false);
    if (novaHora) setHorario(novaHora);
  }

  async function salvarAlarme() {
    try {
      await solicitarPermissaoNotificacoes();
      await configurarCanalAndroid();

      const horas = horario.getHours();
      const minutos = horario.getMinutes();

      const horaFormatada = horario.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const agora = new Date();
      const horarioEscolhido = new Date();
      horarioEscolhido.setHours(horas, minutos, 0, 0);

      if (horarioEscolhido <= agora) {
        Alert.alert(
          "Horário inválido",
          "O horário selecionado já passou hoje. Selecione um horário válido.",
        );
        return;
      }

      const idAlarme = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Lembrete de Medicação",
          body: `Tomar ${prescricao.medicamento} às ${horaFormatada}`,
          sound: "default",
          priority: Notifications.AndroidNotificationPriority.HIGH,
          channelId: CHANNEL_ID,
        },
        trigger: {
          hour: horas,
          minute: minutos,
          repeats: true,
        },
      });

      const alarmesSalvos =
        JSON.parse(await AsyncStorage.getItem("@alarmes")) || [];

      const novoAlarme = {
        id: idAlarme,
        prescricaoId: prescricao.id,
        medicamento: prescricao.medicamento,
        horario: horario.toISOString(),
      };

      await AsyncStorage.setItem(
        "@alarmes",
        JSON.stringify([...alarmesSalvos, novoAlarme]),
      );

      Alert.alert(
        "Alarme configurado",
        `Você será lembrado diariamente às ${horaFormatada}`,
      );

      navigation.goBack();
    } catch (erro) {
      console.log("Erro ao configurar alarme:", erro);
      Alert.alert("Erro", "Não foi possível configurar o alarme.");
    }
  }

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Configurar Alarme</Text>

      <Text style={estilos.texto}>
        Escolha um horário para ser lembrado de tomar{" "}
        <Text style={{ fontWeight: "bold" }}>{prescricao.medicamento}</Text>.
      </Text>

      <TouchableOpacity style={estilos.botao} onPress={abrirPicker}>
        <Text style={estilos.textoBotao}>Selecionar Horário</Text>
      </TouchableOpacity>

      {mostrarPicker && (
        <DateTimePicker
          value={horario}
          mode="time"
          is24Hour
          display="default"
          onChange={definirHorario}
        />
      )}

      <TouchableOpacity
        style={[estilos.botao, { backgroundColor: cores.azul }]}
        onPress={salvarAlarme}
      >
        <Text style={[estilos.textoBotao, { color: "#fff" }]}>
          Salvar Alarme
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  texto: {
    fontSize: 16,
    color: "#333",
    marginBottom: 25,
  },
  botao: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  textoBotao: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
