import { View } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { ProfileButton } from "../settings-profile/ProfileButton";
import { useUserStore } from "../../stores/user";
import { IText } from "../ui/text/IText";
import { IButton } from "../ui/buttons/IButton";
import { router } from "expo-router";

export function HomeHeader() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { user } = useUserStore();

  // Get current time and determine greeting
  function getGreeting() {
    const hour = new Date().getHours();

    if (hour >= 0 && hour < 12) {
      return t("greeting.morning");
    } else if (hour >= 12 && hour < 18) {
      return t("greeting.afternoon");
    } else {
      return t("greeting.evening");
    }
  }

  const greeting = getGreeting();

  function handlePress() {
    router.push("/profile");
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
      }}
    >
      <IButton
        onPress={handlePress}
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 0,
        }}
        haptics
      >
        <IText text={`${greeting},`} color={theme.tint} />
        <IText text={user.username} color={theme.text} size={36} />
      </IButton>
      <ProfileButton />
    </View>
  );
}
