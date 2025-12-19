import { View, Text } from "react-native";
import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../stores/settings";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useWorkoutStore } from "../../../../stores/workout";
import { BounceButton } from "../../../ui/buttons/BounceButton";
import { useEditTemplate } from "../../../../features/start/useEditTemplate";

export function TemplatesFooter() {
  const { widgetUnit } = useWidgetUnit();
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { templates, activeSession } = useWorkoutStore();
  const editTemplate = useEditTemplate();

  if (templates.length)
    return (
      <BounceButton
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          width: 34,
          height: 34,
          backgroundColor: "transparent",
        }}
        onPress={editTemplate}
        disabled={!!activeSession}
      >
        <Ionicons name="add-circle" size={34} color={theme.tint} />
      </BounceButton>
    );

  return (
    <View
      style={{
        height: 34,
        width: widgetUnit - 10,
        paddingHorizontal: 8,
      }}
    >
      <Text
        style={{
          fontSize: 12,
          color: theme.info,
          fontWeight: "500",
        }}
      >
        <Ionicons name="alert-circle" color={theme.error} size={16} />{" "}
        {t("templates-widget.footer")}
      </Text>
    </View>
  );
}
