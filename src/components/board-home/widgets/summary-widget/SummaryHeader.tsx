import { View } from "react-native";
import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../stores/settings";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { MidText } from "../../../ui/text/MidText";

export function SummaryHeader() {
  const { widgetUnit } = useWidgetUnit();
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 8,
        width: widgetUnit,
        height: 34,
      }}
    >
      <MidText
        text={t("summary-widget.header")}
        color={theme.text}
        weight="bold"
        numberOfLines={1}
        adjustsFontSizeToFit
      />
      <Ionicons name="chevron-forward" color={theme.accent} size={24} />
    </View>
  );
}
