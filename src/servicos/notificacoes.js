import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CHANNEL_ID = "mednow-alarmes";

const CHAVE_AGENDADOS = "@mednow:alarmesAgendados";

export async function configurarCanalAndroid() {
  try {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: "Alarmes de Medicação",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default",
      vibrationPattern: [0, 250, 250, 250],
      enableVibrate: true,
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    });
  } catch (e) {
    console.log("Erro configurar canal:", e);
  }
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function solicitarPermissaoNotificacoes() {
  try {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("🔕 Sem permissão para notificações");
      return false;
    }

    await configurarCanalAndroid();
    return true;
  } catch (e) {
    console.log("Erro permissão:", e);
    return false;
  }
}

export function converterHoraMinuto(h) {
  try {
    if (!h || typeof h !== "string") return { hour: 0, minute: 0 };

    const [hh, mm] = h.split(":").map(Number);
    return {
      hour: isNaN(hh) ? 0 : hh,
      minute: isNaN(mm) ? 0 : mm,
    };
  } catch {
    return { hour: 0, minute: 0 };
  }
}

export function gerarHorariosDiarios(horarioInicial, frequencia) {
  try {
    const base = converterHoraMinuto(horarioInicial);
    const vezes = parseInt(frequencia);

    if (!vezes || vezes <= 0) return [];

    const intervalo = 24 / vezes;
    const horarios = [];

    for (let i = 0; i < vezes; i++) {
      const nova = (base.hour + i * intervalo) % 24;
      horarios.push(
        `${String(Math.floor(nova)).padStart(2, "0")}:${String(
          base.minute,
        ).padStart(2, "0")}`,
      );
    }

    return horarios;
  } catch {
    return [];
  }
}

export async function cancelarTodosAlarmes() {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log("⛔ Notificações canceladas pelo sistema");
  } catch (e) {
    console.log("Erro cancelar:", e);
  }
}

export async function testarNotificacaoRapida() {
  await solicitarPermissaoNotificacoes();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Teste MedNow",
      body: "Se você está vendo isso, as notificações funcionam!",
      sound: "default",
      channelId: CHANNEL_ID,
    },
    trigger: null,
  });
}
