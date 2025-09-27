import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppNavigator from "../navigation/AppNavigator";
import { ThemeProvider, useTheme } from "../config/ThemeContext";

function Main() {
  const { theme, themeName } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <AppNavigator />
      <StatusBar style={themeName === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
