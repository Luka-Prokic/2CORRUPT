import React, { Fragment } from "react";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../stores/settingsStore";
import CorruptHeader from "../components/corrupt/CorruptHeader";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function ModalBackButton() {
  const { theme } = useSettingsStore();
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.back()} style={{ padding: 10 }}>
      <Ionicons name="chevron-back" size={24} color={theme.text} />
    </TouchableOpacity>
  );
}

function ModalExitButton() {
  const { theme } = useSettingsStore();
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.back()} style={{ padding: 10 }}>
      <Ionicons name="close" size={24} color={theme.text} />
    </TouchableOpacity>
  );
}

export default function Layout() {
  const { theme, themeName } = useSettingsStore();

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
            title: "Settings",
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
            title: "Profile",
            headerStyle: { backgroundColor: theme.background },
            headerTintColor: theme.text,
            headerTitleStyle: { fontWeight: "bold" },
            headerLeft: () => <Fragment />,
            headerRight: () => <ModalExitButton />,
          }}
        />

        {/* Workout */}
        {/* <Stack.Screen
        name="workout"
        options={{
          title: "Workout",
          animation: "slide_from_right",
          headerLeft: () => <ModalBackButton />,
        }}
      /> */}

        {/* WorkoutBoard */}
        <Stack.Screen
          name="workout-board"
          options={{
            presentation: "card",
            header: () => <Fragment />,
          }}
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
