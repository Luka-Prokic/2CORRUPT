import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { useWorkoutStore } from "../../../../stores/workoutStore";
import { Set } from "../../../../stores/workout/types";
import * as Haptics from "expo-haptics";

interface DoneInputProps {
  set: Set;
  disabled?: boolean;
}

export function DoneInput({ set, disabled }: DoneInputProps) {
  const { theme } = useSettingsStore();
  const {
    updateSetInActiveExercise,
    activeTemplate,
    activeExercise,
    restingExerciseId,
    startRest,
  } = useWorkoutStore();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (activeExercise.noRest)
      updateSetInActiveExercise(set.id, { isCompleted: !set.isCompleted });
    else startRest(activeExercise.id, set.id, activeExercise.restTime ?? 0);
  };

  if (set.restSeconds > 0)
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 44,
          height: 44,
        }}
      >
        <Ionicons name={"ellipse"} size={44} color={theme.text} />
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            color: theme.background,
            position: "absolute",
            textAlign: "center",
            width: 44,
          }}
          adjustsFontSizeToFit
          minimumFontScale={0.5} // smaller scale if needed
          numberOfLines={1}
          allowFontScaling={false}
        >
          {set.restSeconds?.toString() ?? "0"}s
        </Text>
      </View>
    );

  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 44,
        height: 44,
      }}
      onPress={handlePress}
      disabled={
        set.isCompleted || !!activeTemplate || disabled || !!restingExerciseId
      }
    >
      <Ionicons
        name={set.isCompleted ? "checkmark-circle" : "ellipse-outline"}
        size={44}
        color={
          set.isCompleted
            ? theme.text
            : !!activeTemplate || disabled || !!restingExerciseId
            ? theme.handle
            : theme.grayText
        }
      />
    </TouchableOpacity>
  );
}
