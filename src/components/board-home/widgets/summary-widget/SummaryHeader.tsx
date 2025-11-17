import { View, Text } from "react-native";
import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../stores/settings";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

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
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          color: theme.text,
        }}
      >
        {t("summary-widget.header")}
      </Text>
      <Ionicons name="chevron-forward" color={theme.accent} size={24} />
    </View>
  );
}
