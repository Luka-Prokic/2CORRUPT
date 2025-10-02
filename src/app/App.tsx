import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import AppNavigator from "../navigation/AppNavigator";
import { useThemeStore } from "../stores/themeStore";
import { registerRootComponent } from "expo";

function Main() {
  const { theme, themeName } = useThemeStore();

  return (
    <SafeAreaView
      edges={[]}
      style={{ backgroundColor: theme.navBackground, flex: 1 }}
    >
      <StatusBar
        style={
          ["dark", "preworkout", "Corrupted"].includes(themeName)
            ? "light"
            : "dark"
        }
      />
      <AppNavigator />
    </SafeAreaView>
  );
}

export default function App() {
  return <Main />;
}
registerRootComponent(App);
