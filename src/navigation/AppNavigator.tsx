import React, { Fragment } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import WorkoutScreen from "../screens/WorkoutScreen";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../stores/settingsStore";
import { useTranslation } from "react-i18next";
import "../config/i18n";
import { TouchableOpacity } from "react-native";
import CorruptHeader from "../components/corrupt/CorruptHeader";
import WorkoutBoardMockup from "../components/board-workout/mockups/WorkoutBoardMockup";
import HomeBoard from "../screens/HomeBoard";
import AllScreen from "../screens/AllScreen";

export type RootStackParamList = {
  Home: undefined;
  HomeBoard: undefined;
  Settings: undefined;
  Profile: undefined;
  Workout: undefined;
  WorkoutBoard: undefined;
  All: undefined;
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
          name="HomeBoard"
          component={HomeBoard}
          options={{
            presentation: "card",
            headerStyle: { backgroundColor: theme.navBackground },
            header: () => <CorruptHeader />,
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
        <Stack.Screen
          name="All"
          component={AllScreen}
          options={{
            presentation: "modal",
            header: () => <Fragment />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
