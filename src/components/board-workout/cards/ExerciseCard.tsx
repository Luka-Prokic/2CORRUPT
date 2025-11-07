import { useSettingsStore } from "../../../stores/settings/useSettingsStore";
import { SessionExercise } from "../../../stores/workout/types";
import { TouchableOpacity, View } from "react-native";
import { WIDTH } from "../../../features/Dimensions";
import { Text } from "react-native";
import { IButton } from "../../ui/buttons/IButton";
import { Ionicons } from "@expo/vector-icons";
import { useTranslatedSessionExerciseName } from "../../../features/translate/useTranslatedExercisesNames";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";

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
  const { activeExercise } = useWorkoutStore();

  const isActive = activeExercise?.id === exercise.id;
  const isSelected = selectedExercises.includes(exercise.id);

  const textTint = isActive ? tint ?? theme.tint : theme.text;
  const background = isActiveDrag
    ? theme.info
    : !isActive || multipleSelect
    ? backgroundColor ?? theme.secondaryBackground
    : theme.background;

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
        opacity: isActiveDrag ? 0.5 : 1,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          color: textTint,
        }}
      >
        {exercise.prefix ? `${exercise.prefix} ` : ""}
        {translatedName}
      </Text>

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
