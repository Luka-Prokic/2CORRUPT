import { TemplateNameInput } from "./TemplateNameInput";
import { useWorkoutStore } from "../../stores/workout";
import { ViewStyle } from "react-native";
import { WorkoutTemplate } from "../../stores/workout/types";

interface TemplateNameEditorProps {
  template?: WorkoutTemplate;
  style?: ViewStyle | ViewStyle[];
}

export function TemplateNameEditor({
  template,
  style,
}: TemplateNameEditorProps) {
  const { updateTemplateField } = useWorkoutStore();

  if (!template) return null;

  return (
    <TemplateNameInput
      value={template.name}
      onChangeText={(text) => updateTemplateField(template.id, "name", text)}
      style={style}
    />
  );
}
