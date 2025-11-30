import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settingsStore";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { MidText } from "../ui/text/MidText";
import { InfoText } from "../ui/text/InfoText";

export function GoalsButton() {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();

  function handlePress() {
    router.push("/settings/goals");
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        height: 64,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        paddingHorizontal: 16,
      }}
    >
      <Ionicons name="golf" size={32} color={theme.text} />
      <MidText
        text={t(`settings.goals`)}
        style={{ lineHeight: 64, color: theme.text }}
      />
      <Ionicons
        name="chevron-forward"
        size={32}
        color={theme.text}
        style={{ position: "absolute", right: 16, top: 16 }}
      />
    </TouchableOpacity>
  );
}
