import { Text, TextInput, View } from "react-native";
import { useSettingsStore } from "../../../../stores/settings";
import { useWorkoutStore } from "../../../../stores/workout/useWorkoutStore";
import { HEIGHT, WIDTH } from "../../../../utils/Dimensions";
import { ExerciseName } from "../../../view-workout/table/header/ExerciseName";
import { TextButton } from "../../../ui/buttons/TextButton";
import { useTranslation } from "react-i18next";
import { DescriptionText } from "../../../ui/text/DescriptionText";
import { router } from "expo-router";

export function ExerciseNameSheet() {
  const { theme } = useSettingsStore();
  const {
    activeExercise,
    updateActiveExercise,
    activeTemplate,
    startDraftExercise,
    getExerciseById,
  } = useWorkoutStore();
  const { t } = useTranslation();

  function handleCreateExerciseCopy() {
    const exercise = getExerciseById(activeExercise?.exerciseInfoId);
    // if (!exercise) return;

    startDraftExercise(exercise);
    router.push({
      pathname: "/exercise/[exerciseId]/create",
      params: { exerciseId: activeExercise?.id },
    });
  }

  return (
    <View
      style={{
        width: WIDTH,
        height: HEIGHT - 200,
        padding: 16,
        gap: 8,
        alignItems: "center",
      }}
    >
      <ExerciseName
        exercise={activeExercise}
        prefixColor={activeTemplate ? theme.tint : theme.accent}
      />

      <TextInput
        style={{
          height: 44,
          width: WIDTH - 32,
          backgroundColor: theme.input,
          borderRadius: 12,
          paddingHorizontal: 12,
          paddingVertical: 8,
          marginVertical: 4,
          shadowColor: theme.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
          fontSize: 18,
          color: theme.text,
        }}
        value={activeExercise?.prefix}
        onChangeText={(text) => {
          updateActiveExercise({ prefix: text });
        }}
        placeholder={`${t("workout-board.custom-label")}`}
        placeholderTextColor={theme.grayText}
      />

      <DescriptionText
        style={{
          color: theme.grayText,
          textAlign: "justify",
          marginBottom: 16,
        }}
        text={t("workout-board.prefix-description")}
      />
      <TextButton
        text={t("workout-board.create-exercise-copy")}
        onPress={handleCreateExerciseCopy}
        color={activeTemplate ? theme.tint : theme.accent}
      />

      <DescriptionText
        style={{
          color: theme.grayText,
          textAlign: "justify",
          marginTop: 8,
        }}
        text={t("workout-board.create-exercise-copy-description")}
      />
    </View>
  );
}
