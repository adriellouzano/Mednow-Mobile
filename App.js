import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";

import TelaLogin from "./src/telas/TelaLogin";
import TelaInicial from "./src/telas/TelaInicial";
import TelaPrescricoes from "./src/telas/TelaPrescricoes";
import TelaDetalhesPrescricao from "./src/telas/TelaDetalhesPrescricao";
import TelaConfigAlarme from "./src/telas/TelaConfigAlarme";
import TelaCarregamento from "./src/telas/TelaCarregamento";

import { AuthProvider, useAuth } from "./src/contexto/AuthContext";

import "./src/servicos/notificacoes";

import {
  solicitarPermissaoNotificacoes,
  configurarCanalAndroid,
} from "./src/servicos/notificacoes";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AbaSair({ navigation }) {
  const { logout } = useAuth();

  React.useEffect(() => {
    Alert.alert(
      "Sair",
      "Deseja realmente sair?",
      [
        {
          text: "Cancelar",
          style: "cancel",
          onPress: () => navigation.goBack(),
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: () => logout(navigation),
        },
      ],
      { cancelable: false },
    );
  }, []);

  return null;
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#007BFF",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Início") iconName = "home-outline";
          else if (route.name === "Prescrições") iconName = "clipboard-outline";
          else if (route.name === "Sair") iconName = "exit-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Início" component={TelaInicial} />
      <Tab.Screen name="Prescrições" component={TelaPrescricoes} />
      <Tab.Screen name="Sair" component={AbaSair} />
    </Tab.Navigator>
  );
}

function Rotas() {
  const { usuario, carregando } = useAuth();

  if (carregando) return <TelaCarregamento />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {usuario ? (
        <>
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen
            name="TelaDetalhesPrescricao"
            component={TelaDetalhesPrescricao}
          />
          <Stack.Screen name="ConfigAlarme" component={TelaConfigAlarme} />
        </>
      ) : (
        <Stack.Screen name="Login" component={TelaLogin} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    async function inicializar() {
      await solicitarPermissaoNotificacoes();
      await configurarCanalAndroid();
    }

    inicializar();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Rotas />
      </NavigationContainer>
    </AuthProvider>
  );
}
