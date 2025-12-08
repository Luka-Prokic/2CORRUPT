import { useSettingsStore } from "../../../stores/settings/useSettingsStore";
import { SessionExercise } from "../../../stores/workout/types";
import { View } from "react-native";
import { WIDTH } from "../../../utils/Dimensions";
import { IButton } from "../../ui/buttons/IButton";
import { Ionicons } from "@expo/vector-icons";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";
import { StrobeOptionButton } from "../../ui/buttons/StrobeOptionButton";
import { useTranslation } from "react-i18next";

interface ExerciseCardProps {
  exercise: SessionExercise;
  onUse: (id: string) => void;
  onSelect: (id: string) => void;
  selectedExercises: string[];
  multipleSelect: boolean;
  tint?: string;
  drag?: () => void; // <-- new prop
  isActiveDrag?: boolean; // optional styling while dragging
}

export function ExerciseCard({
  exercise,
  onUse,
  onSelect,
  selectedExercises,
  multipleSelect,
  tint,
  drag,
  isActiveDrag,
}: ExerciseCardProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { activeExercise, activeTemplate } = useWorkoutStore();

  const isActive = activeExercise?.id === exercise.id;
  const isSelected = selectedExercises.includes(exercise.id);

  const textTint = isActive
    ? tint ?? activeTemplate
      ? theme.tint
      : theme.accent
    : theme.text;

  function handlePress() {
    if (multipleSelect) {
      onSelect(exercise.id);
    } else {
      onUse(exercise.id);
    }
  }

  return (
    <StrobeOptionButton
      title={`${exercise.prefix ? `${exercise.prefix} ` : ""} ${
        exercise?.name?.[t("mode")]
      }`}
      activeOpacity={0.8}
      onPress={() => {
        if (!isActive || multipleSelect) handlePress();
      }}
      onLongPress={drag}
      justifyContent="space-between"
      style={{
        height: 64,
        width: WIDTH,
        paddingHorizontal: 10,
        opacity: isActiveDrag ? 0.8 : 1,
        backgroundColor: isActiveDrag ? theme.handle : "transparent",
      }}
      strobeDisabled={
        (!isActive && !multipleSelect) || (!isSelected && multipleSelect)
      }
      strobeColors={
        activeTemplate
          ? [theme.tint, theme.tint, theme.tint, theme.tint]
          : [theme.caka, theme.secondaryBackground, theme.accent, theme.tint]
      }
      styleTitle={{ color: textTint, textAlign: "left" }}
      icon={
        multipleSelect ? (
          <IButton
            onPress={() => onSelect(exercise.id)}
            style={{
              height: 44,
              width: 44,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isSelected ? (
              <Ionicons name="checkbox" size={34} color={theme.text} />
            ) : (
              <Ionicons
                name="square-outline"
                size={34}
                color={theme.grayText}
              />
            )}
          </IButton>
        ) : (
          <View
            style={{
              height: 44,
              width: 44,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="reorder-two-outline"
              size={34}
              color={theme.grayText}
            />
          </View>
        )
      }
    />
  );
}
