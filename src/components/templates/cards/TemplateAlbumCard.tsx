import { WorkoutTemplate } from "../../../stores/workout";
import { TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { WIDTH } from "../../../utils/Dimensions";
import { MidText } from "../../ui/text/MidText";
import { DescriptionText } from "../../ui/text/DescriptionText";
import { InfoText } from "../../ui/text/InfoText";
import { View } from "react-native";

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

  return (
    <TouchableOpacity
      style={{
        height: cardHeight,
        width: cardWidth,
        backgroundColor: theme.fifthBackground,
        borderColor: theme.fifthBackground + "40",
        borderRadius: 24,
        padding: 8,
        borderWidth: 1,
        justifyContent: "space-between",
      }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <MidText
        text={`${template.name}`}
        color={theme.secondaryBackground}
        align="left"
        weight="bold"
        numberOfLines={2}
        ellipsizeMode="tail"
        style={{ width: "100%" }}
      />

      <DescriptionText
        text={template.tags?.join(", ")}
        color={theme.secondaryText}
        align="left"
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <InfoText
          text={`v${template.version}`}
          color={theme.secondaryBackground}
          align="left"
          weight="bold"
          numberOfLines={2}
          ellipsizeMode="tail"
        />
        <InfoText
          text={`${template.layout?.length} ${
            template.layout?.length > 1
              ? t("templates.exercises")
              : t("templates.exercise")
          }`}
          color={theme.navBackground}
          align="right"
        />
      </View>
    </TouchableOpacity>
  );
}
