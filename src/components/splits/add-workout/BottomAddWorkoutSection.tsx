import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSettingsStore } from "../../../stores/settingsStore";
import { WIDTH } from "../../../utils/Dimensions";
import { IButton } from "../../ui/buttons/IButton";
import { router, useLocalSearchParams } from "expo-router";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";
import { useTranslation } from "react-i18next";
import { WorkoutTemplate } from "../../../stores/workout/types";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

interface BottomAddWorkoutSectionProps {
  selectedTemplates: WorkoutTemplate[];
}

export function BottomAddWorkoutSection({
  selectedTemplates,
}: BottomAddWorkoutSectionProps) {
  const { theme } = useSettingsStore();
  const { addWorkoutToDay, swapWorkoutTemplate } = useWorkoutStore();
  const { t } = useTranslation();
  const { splitId, dayIndex, workoutId, mode } = useLocalSearchParams<{
    splitId: string;
    dayIndex: string;
    workoutId?: string;
    mode?: string;
  }>();

  const isSwapMode = mode === "swap" && workoutId;

  function handleAddExercise() {
    if (isSwapMode && workoutId && selectedTemplates.length > 0) {
      // Swap mode: replace the workout's template
      swapWorkoutTemplate(
        splitId,
        parseInt(dayIndex),
        workoutId,
        selectedTemplates[0].id
      );
    } else {
      // Add mode: add new workouts
      selectedTemplates.forEach((template: WorkoutTemplate) => {
        addWorkoutToDay(splitId, parseInt(dayIndex), template.id);
      });
    }
    router.back();
  }

  if (selectedTemplates.length === 0) return null;

  return (
    <Animated.View entering={FadeInDown} exiting={FadeOutDown}>
      <LinearGradient
        colors={[theme.shadow + "00", theme.shadow + "40"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 88,
          width: WIDTH,
          paddingHorizontal: 16,
          flexDirection: "row",
          gap: 8,
        }}
      >
        <IButton
          onPress={handleAddExercise}
          style={{
            height: 64,
            width: WIDTH - 32,
            borderRadius: 32,
          }}
          color={theme.tint}
        >
          <Text
            style={{
              color: theme.secondaryText,
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            {isSwapMode
              ? t("button.swap")
              : `${t(
                  "add-exercise.add"
                )} ${selectedTemplates.length.toString()}`}
          </Text>
        </IButton>
      </LinearGradient>
    </Animated.View>
  );
}
