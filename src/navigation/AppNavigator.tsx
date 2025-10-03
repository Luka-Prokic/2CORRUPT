import React, { Fragment } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import StashScreen from "../screens/StashScreen";
import SettingsScreen from "../screens/SettingsScreen";
import WorkoutScreen from "../screens/WorkoutScreen";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../stores/settingsStore";
import { useTranslation } from "react-i18next";
import "../config/i18n";
import { TouchableOpacity } from "react-native";
import StashHeader from "../components/board-home/StashHeader";
import WorkoutBoardScreen from "../screens/WorkoutBoardScreen";
import WorkoutBoardMockup from "../components/board-workout/mockups/WorkoutBoardMockup";

export type RootStackParamList = {
  Home: undefined;
  Stash: undefined;
  Settings: undefined;
  Profile: undefined;
  Workout: undefined;
  WorkoutBoard: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function ModalBackButton() {
  const { theme } = useSettingsStore();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ padding: 10 }}
    >
      <Ionicons name="chevron-back" size={24} color={theme.text} />
    </TouchableOpacity>
  );
}
function ModalExitButton() {
  const { theme } = useSettingsStore();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ padding: 10 }}
    >
      <Ionicons name="close" size={24} color={theme.text} />
    </TouchableOpacity>
  );
}

export default function AppNavigator() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Stash"
          component={StashScreen}
          options={{
            presentation: "card",
            headerStyle: { backgroundColor: theme.navBackground },
            header: () => <StashHeader />,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: t("navigation.settings"),
            presentation: "modal",
            headerStyle: {
              backgroundColor: theme.navBackground,
            },
            headerTintColor: theme.text,
            headerTitleStyle: { fontWeight: "bold" },
            headerLeft: () => <Fragment />,
            headerRight: () => <ModalExitButton />,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: t("navigation.profile"),
            presentation: "modal",
            headerStyle: {
              backgroundColor: theme.background,
            },
            headerTintColor: theme.text,
            headerTitleStyle: { fontWeight: "bold" },
            headerLeft: () => <Fragment />,
            headerRight: () => <ModalExitButton />,
          }}
        />
        <Stack.Screen
          name="Workout"
          component={WorkoutScreen}
          options={{
            title: "Workout",
            animation: "slide_from_right",
            headerTintColor: theme.text,
            headerTitleStyle: { fontWeight: "bold" },
            headerLeft: () => <ModalBackButton />,
          }}
        />
        <Stack.Screen
          name="WorkoutBoard"
          component={WorkoutBoardMockup}
          options={{
            presentation: "card",
            header: () => <Fragment />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
