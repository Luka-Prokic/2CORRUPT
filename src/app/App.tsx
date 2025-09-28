import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import AppNavigator from "../navigation/AppNavigator";
import { useThemeStore } from "../stores/themeStore";
import Colors from "../config/constants/Colors";
import { registerRootComponent } from "expo";

function Main() {
  const { themeName } = useThemeStore();
  const theme = Colors[themeName];

  return (
    <SafeAreaView
      edges={[]}
      style={{ backgroundColor: theme.navBackground, flex: 1 }}
    >
      <AppNavigator />
      <StatusBar
        style={
          ["dark", "preworkout", "Corrupted"].includes(themeName)
            ? "light"
            : "dark"
        }
      />
    </SafeAreaView>
  );
}

export default function App() {
  return <Main />;
}
registerRootComponent(App);
