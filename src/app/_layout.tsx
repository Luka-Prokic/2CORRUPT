import { Stack, router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../stores/settingsStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export function ModalExitButton() {
  const { theme } = useSettingsStore();

  return (
    <TouchableOpacity onPress={() => router.back()}>
      <Ionicons name="close" size={24} color={theme.tint} />
    </TouchableOpacity>
  );
}

export function ModalBackButton() {
  const { theme } = useSettingsStore();

  return (
    <TouchableOpacity onPress={() => router.back()}>
      <Ionicons name="chevron-back" size={24} color={theme.tint} />
    </TouchableOpacity>
  );
}

export default function Layout() {
  const { theme, themeMode } = useSettingsStore();

  const statusBarStyle = themeMode === "dark" ? "light" : "dark";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <StatusBar style={statusBarStyle} />
          <Stack
            screenOptions={{
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
            {/* Home */}
            <Stack.Screen name="index" />

            {/* HomeBoard */}
            <Stack.Screen
              name="home-board"
              options={{
                presentation: "card",
              }}
            />

            {/* Settings */}
            <Stack.Screen
              name="settings"
              options={{
                presentation: "modal",
              }}
            />

            {/* Profile */}
            <Stack.Screen
              name="profile"
              options={{
                presentation: "modal",
              }}
            />

            {/* WorkoutBoard */}
            <Stack.Screen
              name="workout-board"
              options={{
                presentation: "card",
              }}
            />

            {/* TemplateBoard */}
            <Stack.Screen
              name="template-board"
              options={{
                presentation: "card",
              }}
            />

            {/* StartBoard */}
            <Stack.Screen
              name="start-board"
              options={{
                presentation: "card",
              }}
            />

            {/* Add Exercise */}
            <Stack.Screen
              name="add-exercise/[type]"
              options={
                {
                  // presentation: "fullScreenModal",
                }
              }
            />

            {/* Swap Exercise */}
            <Stack.Screen
              name="swap-exercise"
              options={
                {
                  // presentation: "fullScreenModal",
                }
              }
            />

            {/* Session Recap */}
            <Stack.Screen
              name="recap/[sessionId]"
              options={{
                presentation: "fullScreenModal",
              }}
            />

            {/* Sessions */}
            <Stack.Screen
              name="sessions"
              options={{
                presentation: "card",
              }}
            />

            {/* Templates */}
            <Stack.Screen
              name="templates"
              options={{
                presentation: "card",
              }}
            />

            {/* All */}
            <Stack.Screen
              name="all"
              options={{
                presentation: "modal",
              }}
            />
          </Stack>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
