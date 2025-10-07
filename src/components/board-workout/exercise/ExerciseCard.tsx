import { useSettingsStore } from "../../../stores/settings/useSettingsStore";
import { SessionExercise } from "../../../stores/workout/types";
import { TouchableOpacity } from "react-native";
import { WIDTH } from "../../../features/Dimensions";
import { Text } from "react-native";
import { IButton } from "../../ui/buttons/IButton";
import { Ionicons } from "@expo/vector-icons";

interface ExerciseCardProps {
  exercise: SessionExercise;
  onUse: (id: string) => void;
  onSelect: (id: string) => void;
  isActive: boolean;
  isSelected: boolean;
  multipleSelect: boolean;
}

export function ExerciseCard({
  exercise,
  onUse,
  onSelect,
  isActive,
  isSelected,
  multipleSelect,
}: ExerciseCardProps) {
  const { theme } = useSettingsStore();

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
      onPress={handlePress}
      style={{
        height: 64,
        width: WIDTH - 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: !isActive || multipleSelect ? theme.border : "transparent",
        paddingHorizontal: 10,
        justifyContent: "center",
        backgroundColor:
          !isActive || multipleSelect ? theme.primaryBackground : "transparent",
      }}
      disabled={isActive && !multipleSelect}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          color: isActive ? theme.tint : theme.text,
        }}
      >
        {exercise.name}
      </Text>
      {exercise.notes && (
        <Text
          style={{
            fontSize: 13,
            color: isActive ? theme.tint : theme.grayText,
          }}
        >
          {exercise.notes}
        </Text>
      )}
      {multipleSelect && (
        <IButton
          onPress={() => onSelect(exercise.id)}
          style={{
            position: "absolute",
            right: 10,
            top: 10,
            height: 44,
            width: 44,
          }}
        >
          {isSelected ? (
            <Ionicons name="checkbox" size={34} color={theme.text} />
          ) : (
            <Ionicons name="square-outline" size={34} color={theme.grayText} />
          )}
        </IButton>
      )}
    </TouchableOpacity>
  );
}
