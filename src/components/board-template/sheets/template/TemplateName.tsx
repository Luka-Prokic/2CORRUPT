import { Text, TextStyle } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import {
  useWorkoutStore,
  WorkoutTemplate,
} from "../../../../stores/workoutStore";

interface TemplateNameProps {
  template?: WorkoutTemplate;
  fontSize?: number;
  textColor?: string;
  style?: TextStyle | TextStyle[];
}

export function TemplateName({
  template,
  fontSize,
  textColor,
  style,
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
        ...style,
      }}
      numberOfLines={1}
      adjustsFontSizeToFit
      minimumFontScale={0.6}
    >
      {templateName}
    </Text>
  );
}
