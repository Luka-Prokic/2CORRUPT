import React, { Fragment } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import StashScreen from "../screens/StashScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../config/ThemeContext";
import { useTranslation } from "react-i18next";
import "../config/i18n";
import hexToRGBA from "../hooks/HEXtoRGB";
import { TouchableOpacity } from "react-native";

export type RootTabParamList = {
  Render: undefined;
  Stash: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

function MainTabs() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Render"
      screenOptions={{
        headerStyle: { backgroundColor: theme.navBackground, height: 34 },
        headerTintColor: theme.text,
        headerTitleStyle: { fontWeight: "bold" },
        tabBarStyle: {
          backgroundColor: theme.navBackground,
          borderTopColor: theme.border,
          justifyContent: "center",
        },
        tabBarActiveTintColor: theme.tint,
        tabBarInactiveTintColor: theme.grayText,
      }}
    >
      <Tab.Screen
        name="Render"
        component={HomeScreen}
        options={{
          title: t("navigation.render"),
          tabBarLabel: t("navigation.render"),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="prism" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Stash"
        component={StashScreen}
        options={{
          title: t("navigation.stash"),
          tabBarLabel: t("navigation.stash"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="save" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: t("navigation.profile"),
          tabBarLabel: t("navigation.profile"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function ModalBackButton() {
  const { theme } = useTheme();
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
  const { theme } = useTheme();
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
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.navBackground },
          headerTintColor: theme.text,
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: "Settings",
            presentation: "modal",
            headerStyle: {
              backgroundColor: theme.secondaryBackground,
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
