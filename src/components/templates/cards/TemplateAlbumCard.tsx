import { WorkoutTemplate } from "../../../stores/workout";
import { Text, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { WIDTH } from "../../../features/Dimensions";

interface TemplateAlbumCardProps {
  template: WorkoutTemplate;
  onPress: () => void;
  cardWidth?: number;
  cardHeight?: number;
}

export function TemplateAlbumCard({
  template,
  onPress,
  cardWidth = WIDTH / 3,
  cardHeight = WIDTH / 3,
}: TemplateAlbumCardProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  const tags = template.tags?.map((tag, i) => {
    if (template.tags.length > i + 1) return `${tag}, `;
    return `${tag}`;
  });

  return (
    <TouchableOpacity
      style={{
        height: cardHeight,
        width: cardWidth,
        backgroundColor: theme.fifthBackground,
        borderColor: theme.fifthBackground + "40",
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
        {template.name}
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
