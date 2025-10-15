import { Animated } from "react-native";
import { SessionExerciseList } from "./sheets/exercises/SessionExerciseList";
import { StrobeBlur } from "../ui/misc/StrobeBlur";
import { useSettingsStore } from "../../stores/settingsStore";
import { HEIGHT } from "../../features/Dimensions";
import { LinearGradient } from "expo-linear-gradient";
import { hexToRGBA } from "../../features/HEXtoRGB";
import { useEffect, useMemo, useRef } from "react";
import { ExerciseProfile } from "./profile/ExerciseProfile";
import { useWorkoutStore } from "../../stores/workoutStore";
import { SheetHeader } from "./SheetHeader";
import { RestTimerSheet } from "./sheets/rest/RestTimerSheet";
import { ExerciseNameSheet } from "./sheets/name/ExerciseNameSheet";
import { NoExerciseBoard } from "./NoExerciseBoard";
import { SessionSheet } from "./sheets/session/SessionSheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Constants
const FOCUS_HEIGHT = HEIGHT - 120;

export type SessionSheetType = "exercises" | "rest" | "name" | "session";

interface SessionDashboardProps {
  listOpen: boolean;
  listType: SessionSheetType;
  setListOpen: (listOpen: boolean) => void;
  setListType: (listType: SessionSheetType) => void;
}

export function SessionDashboard({
  listOpen,
  listType,
  setListOpen,
  setListType,
}: SessionDashboardProps) {
  const { theme } = useSettingsStore();
  const { activeExercise } = useWorkoutStore();
  const insets = useSafeAreaInsets();
  const animatedY = useRef(new Animated.Value(0)).current;

  const focusHeight = useMemo(() => {
    return FOCUS_HEIGHT - insets.bottom;
  }, [insets.bottom]);

  function togglePanel() {
    setListOpen(!listOpen);
    setListType("exercises");
  }

  function openPanel() {
    setListOpen(true);
  }

  useEffect(() => {
    const toValue = listOpen ? -focusHeight + 80 : insets.bottom;
    Animated.spring(animatedY, { toValue, useNativeDriver: true }).start();
  }, [listOpen]);

  function visibleSheet() {
    if (listType === "exercises")
      return <SessionExerciseList togglePanel={togglePanel} />;
    if (listType === "rest") return <RestTimerSheet />;
    if (listType === "name") return <ExerciseNameSheet />;
    if (listType === "session") return <SessionSheet />;
  }

  return (
    <Animated.View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        transform: [{ translateY: animatedY }],
      }}
    >
      {/* Exercise Profile */}
      <StrobeBlur
        colors={[theme.caka, theme.text, theme.handle, theme.border]}
        tint="auto"
        size={HEIGHT / 2}
        style={{
          height: focusHeight,
          backgroundColor: theme.tint,
        }}
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
          {activeExercise ? (
            <ExerciseProfile openPanel={openPanel} setListType={setListType} />
          ) : (
            <NoExerciseBoard />
          )}
        </LinearGradient>
      </StrobeBlur>

      {/* Toggle Panel */}
      <SheetHeader listOpen={listOpen} togglePanel={togglePanel} />

      {/* List */}
      {listOpen && visibleSheet()}
    </Animated.View>
  );
}
