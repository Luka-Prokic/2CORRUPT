import { TemplateNameInput } from "../ui/input/TemplateNameInput";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { CORRUPT_BUTTON_HEIGHT_FROM_BOTTOM } from "../corrupt/CorruptButton";
import { TagTextLayout } from "./TagTextLayout";

export function CreateTemplateView() {
  const { t } = useTranslation();
  const [templateName, setTemplateName] = useState("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        paddingBottom: CORRUPT_BUTTON_HEIGHT_FROM_BOTTOM + 8,
        paddingHorizontal: 16,
      }}
    >
      <TemplateNameInput
        value={templateName}
        onChangeText={setTemplateName}
        placeholder={t("template-view.template-name")}
        autoFocus={true}
      /> 
      <TagTextLayout  />
    </View>
  );
}
