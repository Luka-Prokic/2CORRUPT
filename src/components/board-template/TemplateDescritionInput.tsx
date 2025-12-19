import { TextStyle } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { WIDTH } from "../../utils/Dimensions";
import { useSettingsStore } from "../../stores/settings";
import { useWorkoutStore } from "../../stores/workout";
import { Keyboard } from "react-native";
import { useTranslation } from "react-i18next";

interface TemplateDescriptionInputProps {
  style?: TextStyle | TextStyle[];
}

export function TemplateDescriptionInput({
  style,
}: TemplateDescriptionInputProps) {
  const { theme } = useSettingsStore();
  const { activeTemplate, updateTemplateField } = useWorkoutStore();
  const { t } = useTranslation();

  if (activeTemplate)
    return (
      <TextInput
        style={{
          height: 280,
          width: WIDTH - 32,
          backgroundColor: theme.input,
          borderRadius: 12,
          paddingHorizontal: 12,
          paddingVertical: 8,
          shadowColor: theme.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
          fontSize: 16,
          color: theme.text,
          textAlignVertical: "top",
          ...style,
        }}
        value={activeTemplate.description}
        onChangeText={(text) => {
          updateTemplateField(activeTemplate.id, "description", text);
        }}
        placeholder={t("template-board.template-description-placeholder")}
        placeholderTextColor={theme.grayText}
        blurOnSubmit={true}
        onSubmitEditing={() => Keyboard.dismiss()}
        multiline
      />
    );
  return null;
}
