import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginAPI, listarPrescricoesAPI } from "../servicos/api";
import * as Notifications from "expo-notifications";

import {
  solicitarPermissaoNotificacoes,
  configurarCanalAndroid,
} from "../servicos/notificacoes";

import { registrarTokenFCM } from "../servicos/fcm";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [prescricoesGlobal, setPrescricoesGlobal] = useState([]);

  const isLoggedOut = useRef(false);

  useEffect(() => {
    async function carregarSessao() {
      try {
        const dadosSalvos = await AsyncStorage.getItem("@sessao");
        if (dadosSalvos) {
          const sessao = JSON.parse(dadosSalvos);
          setUsuario(sessao.usuario);
          setToken(sessao.token);
        }
      } catch (e) {
        console.log("Erro load sessao:", e);
      } finally {
        setCarregando(false);
      }
    }
    carregarSessao();
  }, []);

  async function login(cpf, senha) {
    try {
      isLoggedOut.current = false;

      const resposta = await loginAPI(cpf, senha);
      const dados = resposta.data;

      const perfis = dados?.usuario?.perfis?.map((p) => p.tipo || p);
      if (!perfis?.includes("paciente")) {
        throw new Error("Acesso permitido apenas para pacientes.");
      }

      const sessao = { usuario: dados.usuario, token: dados.token };
      await AsyncStorage.setItem("@sessao", JSON.stringify(sessao));

      setUsuario(dados.usuario);
      setToken(dados.token);

      const tokenFCM = await registrarTokenFCM();

      if (tokenFCM) {
        try {
          console.log("📡 Enviando tokenFCM para o backend…");

          await fetch(
            "https://mednow-one.vercel.app/api/notificacoes/entregar",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${dados.token}`,
              },
              body: JSON.stringify({
                usuarioId: dados.usuario.id,
                tokenFCM: tokenFCM,
              }),
            },
          );

          console.log("🔥 tokenFCM salvo no backend:", tokenFCM);
        } catch (erro) {
          console.log("Erro ao salvar tokenFCM no backend:", erro);
        }
      } else {
        console.log("⚠️ Nenhum token FCM obtido");
      }

      return dados;
    } catch (erro) {
      throw new Error(erro.response?.data?.error || "Erro ao autenticar.");
    }
  }

  async function logout() {
    try {
      isLoggedOut.current = true;

      await Notifications.cancelAllScheduledNotificationsAsync();

      await AsyncStorage.removeItem("@sessao");
      const keys = await AsyncStorage.getAllKeys();
      const alarmKeys = keys.filter((k) => k.startsWith("@mednow:alarmes"));
      if (alarmKeys.length > 0) await AsyncStorage.multiRemove(alarmKeys);

      setUsuario(null);
      setToken(null);
      setPrescricoesGlobal([]);
    } catch (e) {
      console.log("Erro logout:", e);
    }
  }

  async function atualizarPrescricoes() {
    try {
      if (!usuario || !token) return;

      const resp = await listarPrescricoesAPI(usuario.id, token);
      setPrescricoesGlobal(resp.data?.prescricoes || []);
    } catch (e) {
      console.log("Erro ao listar prescrições:", e);
    }
  }

  useEffect(() => {
    if (!usuario || !token) return;

    async function iniciar() {
      await solicitarPermissaoNotificacoes();
      await configurarCanalAndroid();
      atualizarPrescricoes();
    }

    iniciar();
  }, [usuario, token]);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        carregando,
        login,
        logout,
        prescricoesGlobal,
        atualizarDados: atualizarPrescricoes,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
