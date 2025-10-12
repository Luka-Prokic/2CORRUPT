import { TemplateNameInput } from "../ui/input/TemplateNameInput";
import { useState } from "react";
import { TagTextLayout } from "./TagTextLayout";
import { router } from "expo-router";
import { useSettingsStore } from "../../stores/settings";
import { useTranslation } from "react-i18next";
import { WIDTH } from "../../features/Dimensions";
import { Text, View } from "react-native";
import { StrobeButton } from "../ui/buttons/StrobeButton";

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
    <View style={{ flex: 1, padding: 16, justifyContent: "flex-end" }}>
      <TagTextLayout tags={mockTags} />

      <TemplateNameInput
        value={templateName}
        onChangeText={setTemplateName}
        placeholder={t("workout-view.template-name")}
      />

      <StrobeButton
        onPress={handlePress}
        style={{
          width: WIDTH - 32,
          height: 64,
          borderRadius: 32,
          backgroundColor: theme.primaryBackground,
        }}
        disabled={templateName.length === 0}
      >
        <Text style={{ color: theme.text, fontSize: 24, fontWeight: "bold" }}>
          {t("workout-view.add-exercise")}
        </Text>
      </StrobeButton>
    </View>
  );
}
