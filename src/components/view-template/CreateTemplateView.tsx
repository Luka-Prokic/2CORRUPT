import { TemplateNameInput } from "../ui/input/TemplateNameInput";
import { Fragment, useState } from "react";
import { TagTextLayout } from "./TagTextLayout";
import { router } from "expo-router";
import { IButton } from "../ui/buttons/IButton";
import { useSettingsStore } from "../../stores/settings";
import { useTranslation } from "react-i18next";
import { WIDTH } from "../../features/Dimensions";
import { StrobeBlur } from "../ui/misc/StrobeBlur";
import { Text, View } from "react-native";

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

export function CreateTemplateView() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const [templateName, setTemplateName] = useState("");

  function handlePress() {
    router.push("/add-exercise");
  }

  return (
    <View
      style={{ flex: 1, padding: 16, justifyContent: "flex-end" }}
    >
      <TagTextLayout tags={mockTags} />

      <TemplateNameInput
        value={templateName}
        onChangeText={setTemplateName}
        placeholder={t("workout-view.template-name")}
      />

      <IButton
        onPress={handlePress}
        color={theme.primaryBackground}
        style={{ width: WIDTH - 32, height: 64, borderRadius: 32 }}
        disabled={templateName.length === 0}
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
        >
          <Text style={{ color: theme.text, fontSize: 24, fontWeight: "bold" }}>
            {t("workout-view.add-exercise")}
          </Text>
        </StrobeBlur>
      </IButton>
    </View>
  );
}
