import { Fragment } from "react";
import { Stack, router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../stores/settingsStore";
import { CorruptHeader } from "../components/corrupt/CorruptHeader";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { CreateNewExerciseButton } from "../components/exercise-add/CreateNewExerciseButton";
import { SessionRecapHeader } from "../components/recap/SessionRecapHeader";
import { CopyWorkoutButton } from "../components/recap/workout/CopyWorkoutButton";

function ModalBackButton() {
  const { theme } = useSettingsStore();

  return (
    <TouchableOpacity onPress={() => router.back()} style={{ padding: 10 }}>
      <Ionicons name="chevron-back" size={24} color={theme.text} />
    </TouchableOpacity>
  );
}

function ModalExitButton() {
  const { theme } = useSettingsStore();

  return (
    <TouchableOpacity onPress={() => router.back()} style={{ padding: 10 }}>
      <Ionicons name="close" size={24} color={theme.text} />
    </TouchableOpacity>
  );
}

export default function Layout() {
  const { theme, themeName } = useSettingsStore();
  const { t } = useTranslation();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        style={
          ["dark", "preworkout", "Corrupted"].includes(themeName)
            ? "light"
            : "dark"
        }
      />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          headerTitleStyle: { fontWeight: "bold" },
          headerShadowVisible: false,
        }}
      >
        {/* Home */}
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* HomeBoard */}
        <Stack.Screen
          name="home-board"
          options={{
            presentation: "card",
            header: () => <CorruptHeader />,
          }}
        />

        {/* Settings */}
        <Stack.Screen
          name="settings"
          options={{
            presentation: "modal",
            title: t("navigation.settings"),
            headerStyle: { backgroundColor: theme.navBackground },
            headerTintColor: theme.text,
            headerTitleStyle: { fontWeight: "bold" },
            headerLeft: () => <Fragment />,
            headerRight: () => <ModalExitButton />,
          }}
        />

        {/* Profile */}
        <Stack.Screen
          name="profile"
          options={{
            presentation: "modal",
            title: t("navigation.profile"),
            headerStyle: { backgroundColor: theme.background },
            headerTintColor: theme.text,
            headerTitleStyle: { fontWeight: "bold" },
            headerLeft: () => <Fragment />,
            headerRight: () => <ModalExitButton />,
          }}
        />

        {/* WorkoutBoard */}
        <Stack.Screen
          name="workout-board"
          options={{
            presentation: "card",
            header: () => <Fragment />,
          }}
        />

        {/* Add Exercise */}
        <Stack.Screen
          name="add-exercise"
          options={{
            presentation: "fullScreenModal",
            title: t("navigation.addExercise"),
            headerLeft: () => <ModalBackButton />,
            headerRight: () => <CreateNewExerciseButton />,
          }}
        />

        {/* Swap Exercise */}
        <Stack.Screen
          name="swap-exercise"
          options={{
            presentation: "fullScreenModal",
            title: t("navigation.swapExercise"),
            headerLeft: () => <Fragment />,
            headerRight: () => <ModalExitButton />,
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
    </GestureHandlerRootView>
  );
}
