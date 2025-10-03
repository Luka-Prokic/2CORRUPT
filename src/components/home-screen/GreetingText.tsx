import React, { Fragment } from "react";
import { Text, View, ViewStyle } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { username } from "../../config/constants/defaults";
import { useTranslation } from "react-i18next";

interface GreetingTextProps {
  style?: ViewStyle;
}

export default function GreetingText({ style }: GreetingTextProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  // Get current time and determine greeting
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 0 && hour < 12) {
      return t("greeting.morning");
    } else if (hour >= 12 && hour < 18) {
      return t("greeting.afternoon");
    } else {
      return t("greeting.evening");
    }
  };

  const greeting = getGreeting();

  return (
    <View style={[style, { position: "absolute", top: 0, left: 0 }]}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: theme.tint,
          opacity: 0.9,
          paddingTop: 20,
          paddingLeft: 20,
        }}
      >
        {greeting},
      </Text>
      <Text
        style={{
          fontSize: 36,
          fontWeight: "bold",
          color: theme.text,
          opacity: 0.9,
          paddingLeft: 20,
        }}
      >
        {username}
      </Text>
    </View>
  );
}
