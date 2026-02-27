import React from "react";
import { SafeAreaView, Image, StyleSheet } from "react-native";

export default function Header() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/logo1.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D8ECFF",
    height: 120,
    alignItems: "start",
    justifyContent: "center",
    paddingVertical: 0,
    borderBottomWidth: 0,
  },
  logo: {
    position: "relative",
    width: 150,
    height: 200,
    bottom: -30,
    left: 20,
  },
});
