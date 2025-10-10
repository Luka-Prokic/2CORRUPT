import { Animated } from "react-native";
import { SessionExerciseList } from "./list/session/SessionExerciseList";
import { StrobeBlur } from "../ui/misc/StrobeBlur";
import { useSettingsStore } from "../../stores/settingsStore";
import { HEIGHT } from "../../features/Dimensions";
import { LinearGradient } from "expo-linear-gradient";
import { hexToRGBA } from "../../features/HEXtoRGB";
import { useRef, useState } from "react";
import { ExerciseProfile } from "./profile/ExerciseProfile";
import { useWorkoutStore } from "../../stores/workoutStore";
import { ListHeader } from "./list/ListHeader";

// Constants
const FOCUS_HEIGHT = HEIGHT - 120;

export type SessionListType = "session" | "superset" | "circuit";

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
  const [listType, setListType] = useState<SessionListType>("session");

  const animatedY = useRef(new Animated.Value(0)).current;

  const togglePanel = () => {
    const toValue = listOpen ? 0 : -FOCUS_HEIGHT + 80;
    Animated.spring(animatedY, { toValue, useNativeDriver: true }).start();
    setListOpen(!listOpen);
  };

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
          {activeExercise && <ExerciseProfile />}
        </LinearGradient>
      </StrobeBlur>

      {/* Toggle Panel */}
      <ListHeader
        listOpen={listOpen}
        listType={listType}
        setListType={setListType}
        togglePanel={togglePanel}
      />

      {/* List */}
      {listType === "session" && (
        <SessionExerciseList listOpen={listOpen} togglePanel={togglePanel} />
      )}
      {/* Supersets Exercises */}
      {listType === "superset" && (
        <></>
        // <SupersetList listOpen={listOpen} togglePanel={togglePanel} />
      )}
      {/* Circuits Exercises  */}
      {listType === "circuit" && (
        <></>
        // <CircuitList listOpen={listOpen} togglePanel={togglePanel} />
      )}
    </Animated.View>
  );
}
