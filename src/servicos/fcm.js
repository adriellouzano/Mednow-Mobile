import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

/**
 * Registra permissões e obtém o token FCM REAL do dispositivo
 */
export async function registrarTokenFCM() {
  try {
    // Permissão
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status: novoStatus } = await Notifications.requestPermissionsAsync();
      if (novoStatus !== "granted") {
        console.log("🔕 Sem permissão para notificações");
        return null;
      }
    }

    if (!Device.isDevice) {
      console.log("⚠️ FCM funciona apenas em dispositivo físico.");
      return null;
    }

    // TOKEN FCM REAL
    const pushToken = await Notifications.getDevicePushTokenAsync();
    console.log("🔥 TOKEN FCM REAL:", pushToken.data);

    return pushToken.data;

  } catch (e) {
    console.log("Erro ao registrar FCM:", e);
    return null;
  }
}
