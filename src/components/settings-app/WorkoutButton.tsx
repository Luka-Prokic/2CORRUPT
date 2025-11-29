import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settingsStore";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { MidText } from "../ui/text/MidText";
import { InfoText } from "../ui/text/InfoText";

export function WorkoutButton() {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();

  function handlePress() {
    router.push("/settings/workout");
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
      <Ionicons name="barbell" size={32} color={theme.grayText} />
      <MidText text={t(`settings.workout`)} style={{ lineHeight: 64 }} />
      <Ionicons
        name="chevron-forward"
        size={32}
        color={theme.text}
        style={{ position: "absolute", right: 16, top: 16 }}
      />
    </TouchableOpacity>
  );
}
