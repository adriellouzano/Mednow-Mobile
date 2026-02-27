import React, { useState } from "react";
import { formatarCpf } from "../utilitarios/formatarCpf";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { useAuth } from "../contexto/AuthContext";
import cores from "../utilitarios/cores";
import Header from "../componentes/Header";

export default function TelaLogin() {
  const { login } = useAuth();
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function autenticar() {
    if (!cpf || !senha) {
      Alert.alert("Campos obrigatórios", "Preencha CPF e Senha.");
      return;
    }

    try {
      setCarregando(true);
      await login(cpf, senha);
      Alert.alert("Bem-vindo!", "Login realizado com sucesso.");
    } catch (erro) {
      Alert.alert("Erro", erro.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={estilos.container}>
      <Header />
      <View style={estilos.formContainer}>
        <View
          style={{
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text style={estilos.titulo}>
            Faça seu <Text style={{ color: cores.azul }}>Login</Text>
          </Text>

          <TextInput
            style={estilos.input}
            placeholder="Insira seu CPF"
            value={cpf}
            onChangeText={(v) => setCpf(formatarCpf(v))}
            keyboardType="numeric"
            maxLength={14}
          />

          <TextInput
            style={estilos.input}
            placeholder="Insira sua Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <TouchableOpacity
            style={[estilos.botao, carregando && { backgroundColor: "#ccc" }]}
            onPress={autenticar}
            disabled={carregando}
          >
            <Text style={estilos.textoBotao}>
              {carregando ? "Entrando..." : "Entrar"}
            </Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("../../assets/logo2.png")}
          style={estilos.footerLogo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  formContainer: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 25,
    width: "100%",
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitulo: {
    fontSize: 16,
    alignItems: "start",
    color: "#666",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  botao: {
    width: "100%",
    height: 45,
    backgroundColor: cores.azul,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  footerLogo: {
    width: 140,
    height: 90,
    marginTop: 40,
    opacity: 0.8,
  },
});
