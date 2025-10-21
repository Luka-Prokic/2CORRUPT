import { View, Text } from "react-native";
import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../stores/settings";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

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
        flexDirection: "row",
      }}
    >
      <Text
        style={{
          fontSize: 12,
          color: theme.info,
          fontWeight: "500",
        }}
        adjustsFontSizeToFit
        numberOfLines={2}
        minimumFontScale={0.5}
      >
        <Ionicons name="information-circle" color={theme.info} size={16} />{" "}
        {t("summary-widget.footer")}
      </Text>
    </View>
  );
}
