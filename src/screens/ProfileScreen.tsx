import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../config/ThemeContext";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import "../config/i18n";
import { Ionicons } from "@expo/vector-icons";

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const openSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>
          {t("profile.title")}
        </Text>

        <TouchableOpacity
          style={[styles.settingsButton, { backgroundColor: theme.tint }]}
          onPress={openSettings}
        >
          <Ionicons name="settings" size={24} color={theme.background} />
          <Text
            style={[styles.settingsButtonText, { color: theme.background }]}
          >
            {t("profile.settings")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  settingsButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
  },
  settingsButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
