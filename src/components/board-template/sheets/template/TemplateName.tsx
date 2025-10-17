import { Text } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import {
  useWorkoutStore,
  WorkoutTemplate,
} from "../../../../stores/workoutStore";

interface TemplateNameProps {
  template?: WorkoutTemplate;
  fontSize?: number;
  textColor?: string;
}

export function TemplateName({
  template,
  fontSize,
  textColor,
}: TemplateNameProps) {
  const { theme } = useSettingsStore();
  const { activeTemplate } = useWorkoutStore();

  const templateName = template?.name || activeTemplate?.name;

  return (
    <Text
      style={{
        fontSize: fontSize ?? 56,
        fontWeight: "bold",
        color: textColor ?? theme.text,
      }}
      numberOfLines={1}
      adjustsFontSizeToFit
      minimumFontScale={0.6}
    >
      {templateName}
    </Text>
  );
}
