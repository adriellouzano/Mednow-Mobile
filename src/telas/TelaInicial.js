import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useAuth } from "../contexto/AuthContext";
import cores from "../utilitarios/cores";
import Header from "../componentes/Header";

import {
  solicitarPermissaoNotificacoes,
  configurarCanalAndroid,
} from "../servicos/notificacoes";

export default function TelaInicial() {
  const { usuario } = useAuth();

  return (
    <View style={estilos.telaCheia}>
      <Header />

      <View style={estilos.containerConteudo}>
        <View style={{ alignItems: "center", width: "100%" }}>
          {usuario && (
            <View style={estilos.cartaoUsuario}>
              <View style={estilos.esferaIcone}>
                <Image
                  source={require("../../assets/user.png")}
                  style={estilos.iconImage}
                />
              </View>

              <View style={estilos.textoContainer}>
                <Text style={estilos.nome}>{usuario.nome}</Text>
                <Text style={estilos.perfil}>Paciente</Text>
              </View>
            </View>
          )}

          <Text style={estilos.titulo}>
            Bem-vindo ao <Text style={{ color: cores.azul }}>MedNow</Text>!
          </Text>

          <Text style={estilos.texto}>
            Acesse suas prescrições através do menu abaixo e veja os alarmes
            configurados e entregas registradas.
          </Text>
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
  telaCheia: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerConteudo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 25,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
  },
  cartaoUsuario: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 25,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  esferaIcone: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#C7EAFF",
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: 26,
    height: 26,
  },
  textoContainer: {
    marginLeft: 12,
  },
  nome: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  perfil: {
    fontSize: 14,
    color: "#666",
  },
  texto: {
    textAlign: "center",
    fontSize: 22,
    color: "#555",
  },
  footerLogo: {
    width: 120,
    height: 90,
    marginTop: 40,
    opacity: 0.8,
  },
});
