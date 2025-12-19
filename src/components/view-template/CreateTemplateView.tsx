import { View } from "react-native";
import { CORRUPT_BUTTON_HEIGHT_FROM_BOTTOM } from "../corrupt/LegacyCorruptButton";
import { TagTextLayout } from "./TagTextLayout";
import { TemplateNameEditor } from "./TemplateNameEditor";
import { useWorkoutStore } from "../../stores/workout";
import { useTranslation } from "react-i18next";
import { DescriptionText } from "../ui/text/DescriptionText";

export function CreateTemplateView() {
  const { activeTemplate } = useWorkoutStore();
  const { t } = useTranslation();

  if (activeTemplate)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: CORRUPT_BUTTON_HEIGHT_FROM_BOTTOM + 32,
        }}
      >
        <TemplateNameEditor template={activeTemplate} />
        <DescriptionText
          text={t("template-view.add-tags")}
          style={{ marginBottom: 8, marginTop: 16 }}
        />
        <TagTextLayout />
      </View>
    );

  return null;
}
