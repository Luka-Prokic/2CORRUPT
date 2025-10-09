import { Animated, Pressable } from "react-native";
import { SessionExerciseList } from "./list/SessionExerciseList";
import { StrobeBlur } from "../ui/misc/StrobeBlur";
import { useSettingsStore } from "../../stores/settingsStore";
import { HEIGHT } from "../../features/Dimensions";
import { LinearGradient } from "expo-linear-gradient";
import { hexToRGBA } from "../../features/HEXtoRGB";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { ExerciseProfile } from "./exercise/ExerciseProfile";
import { useWorkoutStore } from "../../stores/workoutStore";

// Constants
const FOCUS_HEIGHT = HEIGHT - 120;

interface SessionDashboardProps {
  listOpen: boolean;
  setListOpen: (listOpen: boolean) => void;
}

export function SessionDashboard({
  listOpen,
  setListOpen,
}: SessionDashboardProps) {
  const { theme } = useSettingsStore();
  const { activeExercise } = useWorkoutStore();

  const animatedY = useRef(new Animated.Value(0)).current;

  const togglePanel = () => {
    const toValue = listOpen ? 0 : -FOCUS_HEIGHT + 80;
    Animated.spring(animatedY, { toValue, useNativeDriver: true }).start();
    setListOpen(!listOpen);
  };

  return (
    <Animated.View style={{ flex: 1, transform: [{ translateY: animatedY }] }}>
      <StrobeBlur
        colors={[theme.caka, theme.text, theme.handle, theme.border]}
        tint="auto"
        size={HEIGHT}
        style={{ height: FOCUS_HEIGHT, backgroundColor: theme.tint }}
      >
        <LinearGradient
          colors={[
            theme.background,
            theme.background,
            hexToRGBA(theme.background, 0),
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            height: "100%",
            width: "100%",
            padding: 16,
            alignItems: "center",
          }}
        >
          {activeExercise && <ExerciseProfile exercise={activeExercise} />}
        </LinearGradient>
      </StrobeBlur>

      {/* Toggle Panel */}
      <Pressable
        onPress={togglePanel}
        style={{
          alignItems: "center",
          position: "absolute",
          height: 88,
          padding: 10,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: theme.background,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
        }}
      >
        <Ionicons
          name={listOpen ? "chevron-down" : "chevron-up"}
          size={32}
          color={theme.tint}
        />
      </Pressable>

      {/* Exercise List */}
      <SessionExerciseList listOpen={listOpen} togglePanel={togglePanel} />
    </Animated.View>
  );
}
