import { Animated } from "react-native";
import { SessionExerciseList } from "./list/session/SessionExerciseList";
import { StrobeBlur } from "../ui/misc/StrobeBlur";
import { useSettingsStore } from "../../stores/settingsStore";
import { HEIGHT } from "../../features/Dimensions";
import { LinearGradient } from "expo-linear-gradient";
import { hexToRGBA } from "../../features/HEXtoRGB";
import { useRef } from "react";
import { ExerciseProfile } from "./profile/ExerciseProfile";
import { useWorkoutStore } from "../../stores/workoutStore";
import { ListHeader } from "./list/ListHeader";
import { RestTimerSheet } from "./RestTimerSheet";
import { ExerciseNameSheet } from "./ExerciseNameSheet";

// Constants
const FOCUS_HEIGHT = HEIGHT - 120;

export type SessionListType = "session" | "rest" | "name";

interface SessionDashboardProps {
  listOpen: boolean;
  listType: SessionListType;
  setListOpen: (listOpen: boolean) => void;
  setListType: (listType: SessionListType) => void;
}

export function SessionDashboard({
  listOpen,
  listType,
  setListOpen,
  setListType,
}: SessionDashboardProps) {
  const { theme } = useSettingsStore();
  const { activeExercise } = useWorkoutStore();

  const animatedY = useRef(new Animated.Value(0)).current;

  function togglePanel() {
    const toValue = listOpen ? 0 : -FOCUS_HEIGHT + 80;
    Animated.spring(animatedY, { toValue, useNativeDriver: true }).start();
    setListOpen(!listOpen);
    setListType("session");
  }

  function openPanel() {
    const toValue = listOpen ? 0 : -FOCUS_HEIGHT + 80;
    Animated.spring(animatedY, { toValue, useNativeDriver: true }).start();
    setListOpen(!listOpen);
  }

  return (
    <Animated.View style={{ flex: 1, transform: [{ translateY: animatedY }] }}>
      {/* Exercise Profile */}
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
            alignItems: "center",
          }}
        >
          {/* <SessionTimer /> */}
          {activeExercise && (
            <ExerciseProfile openPanel={openPanel} setListType={setListType} />
          )}
        </LinearGradient>
      </StrobeBlur>

      {/* Toggle Panel */}
      <ListHeader listOpen={listOpen} togglePanel={togglePanel} />

      {/* List */}
      {listType === "session" && (
        <SessionExerciseList listOpen={listOpen} togglePanel={togglePanel} />
      )}
      {listType === "rest" && (
        <RestTimerSheet listOpen={listOpen} togglePanel={togglePanel} />
      )}
      {listType === "name" && (
        <ExerciseNameSheet listOpen={listOpen} togglePanel={togglePanel} />
      )}
    </Animated.View>
  );
}
