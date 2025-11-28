import { WorkoutTemplate } from "../../../stores/workout";
import { Text, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { useTranslation } from "react-i18next";

interface TemplateAlbumCardProps {
  template: WorkoutTemplate;
  onPress: () => void;
}

export function TemplateAlbumCard({
  template,
  onPress,
}: TemplateAlbumCardProps) {
  const { theme } = useSettingsStore();
  const { widgetUnit } = useWidgetUnit();
  const { t } = useTranslation();

  const tags = template.tags?.map((tag, i) => {
    if (template.tags.length > i + 1) return `${tag}, `;
    return `${tag}`;
  });

  return (
    <TouchableOpacity
      style={{
        height: widgetUnit,
        width: widgetUnit,
        backgroundColor: theme.fifthBackground,
        borderColor: theme.border,
        borderRadius: 32,
        padding: 16,
        borderWidth: 1,
        justifyContent: "space-between",
      }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          color: theme.secondaryBackground,
        }}
        numberOfLines={2}
      >
        {template.name} v{template.version}
      </Text>

      {template.tags && template.tags.length > 0 && (
        <Text
          style={{
            fontSize: 14,
            color: theme.secondaryText,
          }}
          numberOfLines={4}
          ellipsizeMode="tail"
        >
          {tags}
        </Text>
      )}

      <Text
        style={{
          fontSize: 12,
          fontWeight: "bold",
          color: theme.thirdBackground,
          alignSelf: "flex-end",
        }}
      >
        {template.layout?.length}{" "}
        {template.layout?.length > 1
          ? t("templates.exercises")
          : t("templates.exercise")}
      </Text>
    </TouchableOpacity>
  );
}
