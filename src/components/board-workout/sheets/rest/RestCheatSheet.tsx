import { WIDTH } from "../../../../utils/Dimensions";
import { View } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { InfoText } from "../../../ui/text/InfoText";
import { DescriptionText } from "../../../ui/text/DescriptionText";

export function RestCheatSheet() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  return (
    <View
      style={{
        width: WIDTH - 32,
        backgroundColor: theme.input,
        gap: 8,
        borderWidth: 1,
        borderColor: theme.border,
        borderRadius: 8,
        alignItems: "flex-start",
        marginBottom: 16,
        padding: 8,
      }}
    >
      <DescriptionText text={t("workout-board.typical-rest-times")} />

      <InfoText text={"• " + t("workout-board.heavy-lifts")} />
      <InfoText text={"• " + t("workout-board.compound-lifts")} />
      <InfoText text={"• " + t("workout-board.accessory-lifts")} />
      <InfoText text={"• " + t("workout-board.accessory-lifts-supersets")} />
      <InfoText text={"• " + t("workout-board.cardio-or-warm-up-sets")} />
    </View>
  );
}
