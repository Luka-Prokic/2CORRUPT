import { useSettingsStore } from "../../stores/settingsStore";
import { ExerciseInfo } from "../../stores/workout/types";
import { hexToRGBA } from "../../utils/HEXtoRGB";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { translateBodyPart } from "../../features/translate/useTranslatedBodyPart";
import { useWorkoutStore } from "../../stores/workoutStore";
import { router } from "expo-router";
import { StrobeButton } from "../ui/buttons/StrobeButton";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface SwapExerciseCardProps {
  exercise: ExerciseInfo;
  isSelected: boolean;
  onSelect: (exercise: ExerciseInfo) => void;
}

export const MemoizedSwapExerciseCard = memo(SwapExerciseCard);

export function SwapExerciseCard({
  exercise,
  onSelect,
  isSelected,
}: SwapExerciseCardProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { activeExercise, swapExerciseInActiveExercise } = useWorkoutStore();

  const translatedPrimary = useMemo(
    () =>
      exercise.primaryMuscles?.map((m) => translateBodyPart(m).toLowerCase()),
    [exercise.primaryMuscles]
  );

  const translatedSecondary = useMemo(
    () =>
      exercise.secondaryMuscles?.map((m) => translateBodyPart(m).toLowerCase()),
    [exercise.secondaryMuscles]
  );

  const itsActive = activeExercise.exerciseInfoId === exercise.id;

  function handleSwapExercise() {
    swapExerciseInActiveExercise(exercise.id);
    router.back();
  }

  return (
    <StrobeButton
      onPress={() => onSelect(exercise)}
      style={{
        height: 72,
        backgroundColor:
          activeExercise?.exerciseInfoId === exercise.id
            ? theme.handle
            : theme.secondaryBackground,
      }}
      strobeDisabled={!isSelected}
      disabled={itsActive}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        {/* Exercise info section */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: theme.text,
              fontSize: 16,
              fontWeight: "600",
              marginBottom: 2,
            }}
          >
            {exercise?.defaultName?.[t("mode")]}
          </Text>

          {/* body parts detail line */}
          <Text
            style={{
              color: theme.text,
              fontSize: 14,
            }}
          >
            {translatedPrimary?.join(", ")}

            <Text
              style={{
                color: theme.grayText,
                opacity: translatedSecondary?.length ? 1 : 0,
              }}
            >
              {" - "}
              {translatedSecondary?.join(", ")}
            </Text>
          </Text>
        </View>

        {/* Selection button section */}
        <TouchableOpacity
          onPress={handleSwapExercise}
          style={{
            backgroundColor: hexToRGBA(theme.handle, 0.8),
            width: 44,
            height: 44,
            borderRadius: 22,
            alignItems: "center",
            justifyContent: "center",
            opacity: isSelected ? 1 : 0,
            position: "absolute",
            right: 16,
            top: 16,
          }}
        >
          <Ionicons name="swap-horizontal" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>
    </StrobeButton>
  );
}
