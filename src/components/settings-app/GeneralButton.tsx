import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settingsStore";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { MidText } from "../ui/text/MidText";

export function GeneralButton() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  function handlePress() {
    router.push("/settings/general");
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
      <Ionicons name="construct" size={32} color={theme.text} />
      <MidText
        text={t(`settings.app`)}
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
