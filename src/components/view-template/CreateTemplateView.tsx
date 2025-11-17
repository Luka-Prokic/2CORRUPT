import { View } from "react-native";
import { CORRUPT_BUTTON_HEIGHT_FROM_BOTTOM } from "../corrupt/CorruptButton";
import { TagTextLayout } from "./TagTextLayout";
import { TemplateNameEditor } from "./TemplateNameEditor";
import { useWorkoutStore } from "../../stores/workout";
import { Text } from "react-native";
import { useSettingsStore } from "../../stores/settings";
import { useTranslation } from "react-i18next";

export function CreateTemplateView() {
  const { activeTemplate } = useWorkoutStore();
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  
  if (activeTemplate)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: CORRUPT_BUTTON_HEIGHT_FROM_BOTTOM + 32,
          // paddingHorizontal: 16,
          gap: 16,
        }}
      >
        <TemplateNameEditor templateId={activeTemplate.id} />
        <Text
          style={{
            color: theme.grayText,
            fontWeight: "400",
            fontSize: 16,
            textAlign: "center",
            marginHorizontal: 16,
          }}
        >
          {t("template-view.add-tags")}
        </Text>
        <TagTextLayout />
      </View>
    );

  return null;
}
