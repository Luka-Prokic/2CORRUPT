import { Text, View } from "react-native";
import { useWorkoutStore } from "../../../../stores/workout";
import { useSettingsStore } from "../../../../stores/settings";
import { HEIGHT, WIDTH } from "../../../../features/Dimensions";
import { TemplateNameEditor } from "../../../view-template/TemplateNameEditor";
import { TagTextLayout } from "../../../view-template/TagTextLayout";
import { TemplateDescriptionInput } from "../../TemplateDescritionInput";

//Testing template zustand
export function TemplateSheet() {
  const { activeTemplate } = useWorkoutStore();
  const { theme } = useSettingsStore();

  if (activeTemplate)
    return (
      <View
        style={{
          width: WIDTH,
          height: HEIGHT - 200,
          padding: 16,
          alignItems: "center",
          gap: 4,
        }}
      >
        <Text style={{ fontSize: 14, color: theme.grayText }}>
          Template Name
        </Text>
        <TemplateNameEditor
          templateId={activeTemplate.id}
          style={{ height: 44, marginBottom: 16, marginTop: 0 }}
        />
        <Text style={{ fontSize: 14, color: theme.grayText }}>Description</Text>
        <TemplateDescriptionInput style={{ height: 144, marginBottom: 16 }} />
        <Text style={{ fontSize: 14, color: theme.grayText }}>Select Tags</Text>
        <TagTextLayout fontSize={22} />
      </View>
    );

  return null;
}
