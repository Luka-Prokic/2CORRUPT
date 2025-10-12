import { Fragment, useState } from "react";
import { IButton } from "../../ui/buttons/IButton";
import { useSettingsStore } from "../../../stores/settingsStore";
import { WIDTH } from "../../../features/Dimensions";
import { NoExerciseViewSelected } from "../NoExerciseView";
import { Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTranslation } from "react-i18next";
import { StrobeBlur } from "../../ui/misc/StrobeBlur";
import { TemplateNameInput } from "../../ui/input/TemplateNameInput";
import { router } from "expo-router";
import { TagTextLayout } from "../../view-template/TagTextLayout";

const mockTags = [
  "Push", // push exercises
  "Pull", // pull exercises
  "Legs", // lower body
  "Core", // abs / core work
  "Chest",
  "Back",
  "Shoulders",
  "Arms",
  "Glutes",
  "Hamstrings",
  "Quads",
  "Biceps",
  "Triceps",
  "Warmup",
  "Cooldown",
  "Strength",
  "Hypertrophy",
  "Endurance",
  "Mobility",
  "Power",
  "Cardio",
  "Accessory",
  "Full Body",
  "Isolation",
  "Compound",
  "HIIT",
  "Stretching",
  "Balance",
];

interface CreateTemplateSelectProps {
  onSelect: (selected: NoExerciseViewSelected) => void;
  selected: NoExerciseViewSelected;
}

export function CreateTemplateSelect({
  onSelect,
  selected,
}: CreateTemplateSelectProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  const [templateName, setTemplateName] = useState("");

  function handlePress() {
    onSelect("create-template");
    if (selected === "create-template") router.push("/add-exercise");
  }

  function mainButton() {
    return (
      <IButton
        onPress={handlePress}
        color={theme.primaryBackground}
        style={{ width: WIDTH - 32, height: 64, borderRadius: 32 }}
        disabled={selected === "create-template" && templateName.length === 0}
      >
        <StrobeBlur
          colors={[
            theme.caka,
            theme.primaryBackground,
            theme.accent,
            theme.tint,
          ]}
          tint="light"
          style={{ width: WIDTH - 32, height: 64, borderRadius: 32 }}
          disable={selected === "none"}
        >
          <Text style={{ color: theme.text, fontSize: 24, fontWeight: "bold" }}>
            {selected === "create-template"
              ? t("workout-view.add-exercise")
              : t("workout-view.create-template")}
          </Text>
        </StrobeBlur>
      </IButton>
    );
  }

  if (selected === "create-template")
    return (
      <Fragment>
        <TagTextLayout tags={mockTags} />

        <TemplateNameInput
          value={templateName}
          onChangeText={setTemplateName}
          placeholder={t("workout-view.template-name")}
        />

        {mainButton()}
      </Fragment>
    );

  if (selected === "none") return <Fragment>{mainButton()}</Fragment>;
  return null;
}
