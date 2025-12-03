import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSettingsStore } from "../../stores/settingsStore";
import { WIDTH } from "../../utils/Dimensions";
import { IButton } from "../ui/buttons/IButton";
import { router, useLocalSearchParams } from "expo-router";
import { createSessionExercise } from "../../features/workout/useNewSessionExercise";
import { ExerciseInfo } from "../../stores/workout/types";
import { useWorkoutStore } from "../../stores/workout/useWorkoutStore";
import { useTranslation } from "react-i18next";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

interface BottomAddExerciseSectionProps {
  selectedExercises: ExerciseInfo[];
}

export function BottomAddExerciseSection({
  selectedExercises,
}: BottomAddExerciseSectionProps) {
  const { theme } = useSettingsStore();
  const {
    addExerciseToSession,
    addExerciseToTemplate,
    setActiveExercise,
    activeTemplate,
    activeSession,
  } = useWorkoutStore();
  const { t } = useTranslation();
  const { type } = useLocalSearchParams<{
    type: string;
  }>();

  function handleAddExercise() {
    selectedExercises.forEach((exercise: ExerciseInfo) => {
      if (type === "template" && activeTemplate) {
        addExerciseToTemplate(createSessionExercise(exercise));
      }
      if (type === "session" && activeSession) {
        addExerciseToSession(createSessionExercise(exercise));
      }
    });
    setActiveExercise(selectedExercises[0]?.id);
    router.back();
  }

  if (selectedExercises.length === 0) return null;

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
            {t("add-exercise.add")} {selectedExercises.length.toString()}
          </Text>
        </IButton>
      </LinearGradient>
    </Animated.View>
  );
}
