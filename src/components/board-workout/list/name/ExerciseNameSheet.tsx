import { Text, TextInput, View } from "react-native";
import { useSettingsStore } from "../../../../stores/settings";
import { useWorkoutStore } from "../../../../stores/workout/useWorkoutStore";
import { HEIGHT, WIDTH } from "../../../../features/Dimensions";
import { ExerciseName } from "../../../view-workout/table/header/ExerciseName";
import { TextButton } from "../../../ui/buttons/TextButton";
import { useTranslation } from "react-i18next";

export function ExerciseNameSheet() {
  const { theme } = useSettingsStore();
  const { activeExercise, updateActiveExercise } = useWorkoutStore();
  const { t } = useTranslation();

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
      <ExerciseName exercise={activeExercise} prefixColor={theme.accent} />

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
          shadowOpacity: 0.2,
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

      <Text
        style={{
          fontSize: 14,
          color: theme.grayText,
          textAlign: "justify",
          marginBottom: 12,
        }}
      >
        {t("workout-board.prefix-description")}
      </Text>

      <TextButton
        title={t("workout-board.create-exercise-copy")}
        onPress={() => {
          // handle routing to create new exercise screen
        }}
      />

      <Text
        style={{
          fontSize: 13,
          color: theme.grayText,
          textAlign: "justify",
          marginTop: 8,
          lineHeight: 18,
        }}
      >
        {t("workout-board.create-exercise-copy-description")}
      </Text>
    </View>
  );
}
