import React, { Fragment } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import StashScreen from "../screens/StashScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "../stores/themeStore";
import Colors from "../config/constants/Colors";
import { useTranslation } from "react-i18next";
import "../config/i18n";
import { TouchableOpacity, Text } from "react-native";
import SettingsButton from "../components/app-settings/SettingsButton";
import ProfileButton from "../components/profile-settings/ProfileButton";
import StashHeader from "../components/stash/StashHeader";

export type RootStackParamList = {
  Home: undefined;
  Stash: undefined;
  Settings: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function ModalBackButton() {
  const { themeName } = useThemeStore();
  const theme = Colors[themeName];
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
  const { themeName } = useThemeStore();
  const theme = Colors[themeName];
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
  const { themeName } = useThemeStore();
  const theme = Colors[themeName];
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
            headerLeft: () => <SettingsButton />,
            headerRight: () => <ProfileButton />,
            headerTitle: () => <StashHeader />,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: t("navigation.settings"),
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
