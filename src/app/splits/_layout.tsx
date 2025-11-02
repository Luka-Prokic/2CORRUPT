import { Stack } from "expo-router";
import { useSettingsStore } from "../../stores/settingsStore";

export default function Layout() {
  const { theme, themeMode } = useSettingsStore();

  return (
    <Stack
      screenOptions={{
        title: null,
        headerBackButtonDisplayMode: "minimal",
        headerTintColor: theme.tint,
        headerTitleStyle: { color: theme.text },
        headerBlurEffect: themeMode,
        headerTransparent: true,
        contentStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Stack.Screen name="list" />
      <Stack.Screen name="[splitId]" />
      <Stack.Screen name="no-split" />
    </Stack>
  );
}
