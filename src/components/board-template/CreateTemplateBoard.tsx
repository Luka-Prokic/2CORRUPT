import { StrobeButton } from "../ui/buttons/StrobeButton";
import { router } from "expo-router";
import { WIDTH } from "../../features/Dimensions";
import { useSettingsStore } from "../../stores/settings";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { TemplateDescriptionInput } from "./TemplateDescritionInput";
import { useWorkoutStore } from "../../stores/workout";
import { TemplatesCardList } from "../templates/TemplatesCardList";
import { IText } from "../ui/text/IText";

export function CreateTemplateBoard() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { activeTemplate, templates } = useWorkoutStore();

  function handlePress() {
    router.push({
      pathname: "/add-exercise/[type]",
      params: {
        type: "template",
      },
    });
  }

  return (
    <View style={{ flex: 1, gap: 16, alignItems: "center" }}>
      <TemplateDescriptionInput />
      {activeTemplate?.layout.length === 0 && (
        <StrobeButton
          onPress={handlePress}
          style={{
            width: WIDTH - 32,
            height: 64,
            borderRadius: 32,
            backgroundColor: theme.tint,
          }}
        >
          <IText
            size={24}
            text={t("workout-view.add-exercise")}
            color={theme.border}
          />
        </StrobeButton>
      )}
      {templates.length > 0 && (
        <TemplatesCardList
          showBy={{ butId: activeTemplate?.id }}
          useType="addToTemplate"
        />
      )}
    </View>
  );
}
