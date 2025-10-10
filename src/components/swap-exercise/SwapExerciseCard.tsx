import { useSettingsStore } from "../../stores/settingsStore";
import { ExerciseInfo } from "../../stores/workout/types";
import { WIDTH } from "../../features/Dimensions";
import { hexToRGBA } from "../../features/HEXtoRGB";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StrobeBlur } from "../ui/misc/StrobeBlur";
import { useTranslatedExerciseName } from "../../features/translate/useTranslatedExercisesNames";
import { useTranslatedBodyPart } from "../../features/translate/useTranslatedBodyPart";
import { useWorkoutStore } from "../../stores/workoutStore";
import { router } from "expo-router";

interface SwapExerciseCardProps {
  exercise: ExerciseInfo;
  isSelected: boolean;
  onSelect: (exercise: ExerciseInfo) => void;
}

export function SwapExerciseCard({
  exercise,
  onSelect,
  isSelected,
}: SwapExerciseCardProps) {
  const { theme } = useSettingsStore();
  const { translatedName } = useTranslatedExerciseName(exercise);
  const { activeExercise, swapExerciseInActiveExercise } = useWorkoutStore();
  const translatedPrimary = exercise.primaryMuscles?.map((m) =>
    useTranslatedBodyPart(m).toLowerCase()
  );
  const translatedSecondary = exercise.secondaryMuscles?.map((m) =>
    useTranslatedBodyPart(m).toLowerCase()
  );

  function handleSwapExercise() {
    swapExerciseInActiveExercise(exercise.id);
    router.back();
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onSelect(exercise)}
      style={{
        height: 72,
        marginBottom: 1,
        backgroundColor:
          activeExercise?.exerciseInfoId === exercise.id
            ? theme.handle
            : theme.secondaryBackground,
        shadowColor: theme.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 4,
      }}
      disabled={activeExercise?.exerciseInfoId === exercise.id}
    >
      <StrobeBlur
        colors={[theme.caka, theme.primaryBackground, theme.accent, theme.tint]}
        tint="light"
        style={{
          height: 72,
          width: WIDTH,
        }}
        disable={!isSelected}
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
              {translatedName}
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
      </StrobeBlur>
    </TouchableOpacity>
  );
}
