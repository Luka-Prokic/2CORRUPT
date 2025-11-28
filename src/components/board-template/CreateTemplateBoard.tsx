import { Fragment } from "react";
import { StrobeButton } from "../ui/buttons/StrobeButton";
import { router } from "expo-router";
import { WIDTH } from "../../features/Dimensions";
import { useSettingsStore } from "../../stores/settings";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";
import { TemplateDescriptionInput } from "./TemplateDescritionInput";
import { useWorkoutStore } from "../../stores/workout";
import { TemplatesCardList } from "../templates/TemplatesCardList";

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
    <Fragment>
      <TemplateDescriptionInput />
      {activeTemplate?.layout.length === 0 && (
        <StrobeButton
          onPress={handlePress}
          style={{
            width: WIDTH - 32,
            height: 64,
            borderRadius: 32,
            backgroundColor: theme.tint,
            marginVertical: 16,
          }}
        >
          <Text style={{ color: theme.text, fontSize: 24, fontWeight: "bold" }}>
            {t("workout-view.add-exercise")}
          </Text>
        </StrobeButton>
      )}
      {templates.length > 0 && (
        <TemplatesCardList
          filters={{ id: activeTemplate?.id }}
          emptyState={<Fragment />}
        />
      )}
    </Fragment>
  );
}
