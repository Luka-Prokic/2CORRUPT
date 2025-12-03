import { useSettingsStore } from "../../../stores/settings/useSettingsStore";
import { SessionExercise } from "../../../stores/workout/types";
import { TouchableOpacity, View } from "react-native";
import { WIDTH } from "../../../features/Dimensions";
import { IButton } from "../../ui/buttons/IButton";
import { Ionicons } from "@expo/vector-icons";
import { useTranslatedSessionExerciseName } from "../../../features/translate/useTranslatedExercisesNames";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";
import { MidText } from "../../ui/text/MidText";

interface ExerciseCardProps {
  exercise: SessionExercise;
  onUse: (id: string) => void;
  onSelect: (id: string) => void;
  selectedExercises: string[];
  multipleSelect: boolean;
  tint?: string;
  backgroundColor?: string;
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
  backgroundColor,
  drag,
  isActiveDrag,
}: ExerciseCardProps) {
  const { theme } = useSettingsStore();
  const { translatedName } = useTranslatedSessionExerciseName(exercise);
  const { activeExercise, activeTemplate } = useWorkoutStore();

  const isActive = activeExercise?.id === exercise.id;
  const isSelected = selectedExercises.includes(exercise.id);

  const textTint = isActive
    ? tint ?? activeTemplate
      ? theme.tint
      : theme.accent
    : theme.text;
  const background = isActiveDrag
    ? theme.secondaryBackground
    : !isActive || multipleSelect
    ? backgroundColor ?? theme.background
    : theme.handle;

  function handlePress() {
    if (multipleSelect) {
      onSelect(exercise.id);
    } else {
      onUse(exercise.id);
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        if (!isActive || multipleSelect) handlePress(); // only block tap if active & single select
      }}
      onLongPress={drag} // always enabled
      style={{
        height: 72,
        width: WIDTH,
        paddingHorizontal: 10,
        justifyContent: "center",
        backgroundColor: background,
        opacity: isActiveDrag ? 0.8 : 1,
      }}
    >
      <MidText
        text={`${
          exercise.prefix ? `${exercise.prefix} ` : ""
        } ${translatedName}`}
        color={textTint}
        style={{ textAlign: "left" }}
      />

      {multipleSelect ? (
        <IButton
          onPress={() => onSelect(exercise.id)}
          style={{
            position: "absolute",
            right: 10,
            top: 10,
            height: 44,
            width: 44,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isSelected ? (
            <Ionicons name="checkbox" size={34} color={theme.text} />
          ) : (
            <Ionicons name="square-outline" size={34} color={theme.grayText} />
          )}
        </IButton>
      ) : (
        <View
          style={{
            position: "absolute",
            right: 10,
            top: 10,
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
      )}
    </TouchableOpacity>
  );
}
