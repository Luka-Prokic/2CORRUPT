import { Fragment } from "react";
import { Stack, router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../stores/settingsStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { SessionRecapHeader } from "../components/recap/SessionRecapHeader";
import { CopyWorkoutButton } from "../components/recap/workout/CopyWorkoutButton";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CorruptHeader } from "../components/corrupt/CorruptHeader";

export function ModalBackButton() {
  const { theme } = useSettingsStore();

  return (
    <TouchableOpacity onPress={() => router.back()} style={{ padding: 10 }}>
      <Ionicons name="chevron-back" size={24} color={theme.text} />
    </TouchableOpacity>
  );
}

export function ModalExitButton() {
  const { theme } = useSettingsStore();

  return (
    <TouchableOpacity onPress={() => router.back()} style={{ padding: 10 }}>
      <Ionicons name="close" size={24} color={theme.text} />
    </TouchableOpacity>
  );
}

export default function Layout() {
  const { theme, themeMode } = useSettingsStore();
  const { t } = useTranslation();

  const statusBarStyle = themeMode === "dark" ? "light" : "dark";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style={statusBarStyle} />
        <Stack
          screenOptions={{
            headerBackButtonDisplayMode: "minimal",
            headerTintColor: theme.text,
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
              headerLeft: () => <Fragment />,
              headerTitle: () => <CorruptHeader />,
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
            name="add-exercise"
            options={{
              presentation: "fullScreenModal",
            }}
          />

          {/* Swap Exercise */}
          <Stack.Screen
            name="swap-exercise"
            options={{
              presentation: "fullScreenModal",
              title: t("navigation.swapExercise"),
            }}
          />

          {/* Session Recap */}
          <Stack.Screen
            name="recap/[sessionId]"
            options={({ route }) => ({
              presentation: "fullScreenModal",
              headerStyle: { backgroundColor: theme.primaryBackground },
              headerLeft: () => (
                <CopyWorkoutButton
                  sessionId={(route.params as { sessionId: string }).sessionId}
                />
              ),
              headerTitle: () => (
                <SessionRecapHeader
                  sessionId={(route.params as { sessionId: string }).sessionId}
                />
              ),
              headerRight: () => <ModalExitButton />,
            })}
          />

          {/* All */}
          <Stack.Screen
            name="all"
            options={{
              presentation: "modal",
              header: () => <Fragment />,
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
