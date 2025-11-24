import { Text, View } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { username } from "../../config/constants/defaults";
import { useTranslation } from "react-i18next";
import { ProfileButton } from "../settings-profile/ProfileButton";

export function HomeHeader() {
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
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: theme.tint,
        }}
      >
        {greeting},{"\n"}
        <Text
          style={{
            fontSize: 36,
            fontWeight: "bold",
            color: theme.text,
          }}
        >
          {username}
        </Text>
      </Text>
      <ProfileButton />
    </View>
  );
}
