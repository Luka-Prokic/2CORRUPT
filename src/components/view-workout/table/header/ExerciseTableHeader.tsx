import { StrobeBlur } from "../../../ui/misc/StrobeBlur";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { LinearGradient } from "expo-linear-gradient";
import { hexToRGBA } from "../../../../features/HEXtoRGB";
import { View, Text } from "react-native";
import {
  SessionExercise,
  SessionLayoutItem,
  Set,
  useWorkoutStore,
} from "../../../../stores/workoutStore";
import { IButton } from "../../../ui/buttons/IButton";
import { Ionicons } from "@expo/vector-icons";

export function ExerciseTableHeader() {
  const { theme } = useSettingsStore();
  const {
    activeExercise,
    goToNextExercise,
    goToPreviousExercise,
    isThereNext,
    isTherePrev,
  } = useWorkoutStore();

  const sets = activeExercise?.sets ?? [];
  const completedSets = sets.filter((s: Set) => s.isCompleted).length;
  const totalSets = sets.length;

  return (
    <StrobeBlur
      colors={[theme.caka, theme.primaryBackground, theme.accent, theme.tint]}
      tint="auto"
      style={{
        backgroundColor: theme.background,
        height: 188,
        width: "100%",
      }}
    >
      <LinearGradient
        colors={[
          theme.background,
          hexToRGBA(theme.background, 0),
          hexToRGBA(theme.background, 0),
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          height: 188,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IButton
            style={{ padding: 10, opacity: isTherePrev ? 1 : 0.5 }}
            onPress={goToPreviousExercise}
            disabled={!isTherePrev}
          >
            <Ionicons name="chevron-back" size={34} color={theme.text} />
          </IButton>
          <Text
            style={{
              fontSize: 16,
              opacity: 0.7,
              color:
                completedSets === totalSets && completedSets !== 0
                  ? theme.tint
                  : theme.grayText,
            }}
          >
            {completedSets} of {totalSets} sets completed
          </Text>
          <IButton
            style={{ padding: 10, opacity: isThereNext ? 1 : 0.5 }}
            onPress={goToNextExercise}
            disabled={!isThereNext}
          >
            <Ionicons name="chevron-forward" size={34} color={theme.text} />
          </IButton>
        </View>

        <Text
          style={{
            fontSize: 56,
            fontWeight: "bold",
            color: theme.text,
          }}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.6}
        >
          {activeExercise.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            bottom: 16,
            left: 0,
            right: 0,
          }}
        >
          {["SET", "REPS", "KG", "DONE"].map((label) => (
            <Text
              key={label}
              style={{
                fontSize: 16,
                fontWeight: "bold",
                flex: 1,
                textAlign: "center",
                color: theme.grayText,
              }}
            >
              {label}
            </Text>
          ))}
        </View>
      </LinearGradient>
    </StrobeBlur>
  );
}
