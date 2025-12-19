import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../stores/settings";
import { useTranslation } from "react-i18next";
import { MidText } from "../../../ui/text/MidText";

export function TemplatesHeader() {
  const { theme } = useSettingsStore();
  const { widgetUnit } = useWidgetUnit();
  const { t } = useTranslation();

  return (
    <View
      style={{
        paddingHorizontal: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 34,
        width: widgetUnit,
      }}
    >
      <MidText
        text={t("templates-widget.header")}
        color={theme.text}
        weight="bold"
        numberOfLines={1}
        adjustsFontSizeToFit
      />
      <Ionicons name="chevron-forward" color={theme.accent} size={24} />
    </View>
  );
}
