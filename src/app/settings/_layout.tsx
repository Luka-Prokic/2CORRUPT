import { Stack } from "expo-router";
import { useSettingsStore } from "../../stores/settingsStore";

export default function Layout() {
  const { theme, themeMode } = useSettingsStore();

  return (
    <Stack
      screenOptions={{
        title: null,
        headerTintColor: theme.tint,
        headerTitleStyle: { color: theme.text },
        headerBlurEffect: themeMode,
        headerTransparent: true,
        contentStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Stack.Screen name="main" />
      <Stack.Screen name="workout" />
      <Stack.Screen name="goals" />
      <Stack.Screen name="units" />
    </Stack>
  );
}
