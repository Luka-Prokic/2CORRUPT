import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settingsStore";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { MidText } from "../ui/text/MidText";
import { InfoText } from "../ui/text/InfoText";

export function UnitsButton() {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();

  function handlePress() {
    router.push("/settings/units");
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        height: 64,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MidText text={t(`settings.units`)} />
      <InfoText text={t(`settings.units-info`)} />
      <Ionicons
        name="chevron-forward"
        size={32}
        color={theme.text}
        style={{ position: "absolute", right: 16, top: 16 }}
      />
    </TouchableOpacity>
  );
}
