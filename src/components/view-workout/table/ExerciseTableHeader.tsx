import { StrobeBlur } from "../../ui/misc/StrobeBlur";
import { useSettingsStore } from "../../../stores/settingsStore";
import { LinearGradient } from "expo-linear-gradient";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { View, Text } from "react-native";
import { Set, useWorkoutStore } from "../../../stores/workoutStore";

export function ExerciseTableHeader() {
  const { theme, themeName } = useSettingsStore();
  const { activeExercise } = useWorkoutStore();

  const sets = activeExercise?.sets ?? [];
  const completedSets = sets.filter((s: Set) => s.isCompleted).length;
  const totalSets = sets.length;
  
  return (
    <StrobeBlur
      colors={[theme.caka, theme.primaryBackground, theme.accent, theme.tint]}
      tint={
        ["light", "peachy", "oldschool"].includes(themeName) ? "light" : "dark"
      }
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
        <Text
          style={{
            fontSize: 16,
            opacity: 0.7,
            color: completedSets === totalSets ? theme.tint : theme.grayText,
          }}
        >
          {completedSets} of {totalSets} sets completed
        </Text>
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
