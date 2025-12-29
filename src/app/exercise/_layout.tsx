import { Stack } from "expo-router";
import { useSettingsStore } from "../../stores/settingsStore";

export default function Layout() {
  const { theme, themeMode } = useSettingsStore();

  return (
    <Stack
      initialRouteName="list"
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
      <Stack.Screen name="list" />
      <Stack.Screen name="[exerciseId]/edit" />
      <Stack.Screen name="[exerciseId]/create" />
      <Stack.Screen name="[exerciseId]/info" />
      <Stack.Screen name="[exerciseId]/stats" />
    </Stack>
  );
}
