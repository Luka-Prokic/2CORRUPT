import { View, Text } from "react-native";
import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../stores/settings";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { InfoText } from "../../../ui/text/InfoText";

export function SummaryFooter() {
  const { widgetUnit } = useWidgetUnit();
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  return (
    <View
      style={{
        height: 34,
        width: widgetUnit - 10,
        paddingHorizontal: 8,
        alignItems: "center",
        flexDirection: "row",
        gap: 4,
      }}
    >
      <Ionicons name="information-circle" color={theme.info} size={18} />
      <InfoText
        text={t("summary-widget.footer")}
        align="left"
        style={{ width: widgetUnit - 44 }}
      />
    </View>
  );
}
