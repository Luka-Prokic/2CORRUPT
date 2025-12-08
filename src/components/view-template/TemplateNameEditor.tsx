import { TemplateNameInput } from "./TemplateNameInput";
import { useWorkoutStore } from "../../stores/workout";
import { ViewStyle } from "react-native";

interface TemplateNameEditorProps {
  templateId: string;
  style?: ViewStyle | ViewStyle[];
}

export function TemplateNameEditor({
  templateId,
  style,
}: TemplateNameEditorProps) {
  const { getTemplateById, updateTemplateField } = useWorkoutStore();

  const template = getTemplateById(templateId);

  if (!template) return null;

  return (
    <TemplateNameInput
      value={template.name}
      onChangeText={(text) => updateTemplateField(template.id, "name", text)}
      style={style}
    />
  );
}
