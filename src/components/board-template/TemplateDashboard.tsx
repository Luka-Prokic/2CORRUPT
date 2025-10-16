import { Animated } from "react-native";
import { TemplateExerciseList } from "./sheets/exercises/TemplateExerciseList";
import { StrobeBlur } from "../ui/misc/StrobeBlur";
import { useSettingsStore } from "../../stores/settingsStore";
import { HEIGHT, WIDTH } from "../../features/Dimensions";
import { LinearGradient } from "expo-linear-gradient";
import { hexToRGBA } from "../../features/HEXtoRGB";
import { useRef } from "react";
import { SheetHeader } from "../board-workout/SheetHeader";
import { TagTextLayout } from "../view-template/TagTextLayout";

// Constants
const FOCUS_HEIGHT = HEIGHT - 120;

export type TemplateSheetType = "exercises" | "template";

const mockTags = [
  "Push",
  "Pull",
  "Legs",
  "Core",
  "Chest",
  "Back",
  "Shoulders",
  "Arms",
  "Glutes",
  "Hamstrings",
  "Quads",
  "Biceps",
  "Triceps",
  "Warmup",
  "Cooldown",
  "Strength",
  "Hypertrophy",
  "Endurance",
  "Mobility",
  "Power",
  "Cardio",
  "Accessory",
  "Full Body",
  "Isolation",
  "Compound",
  "HIIT",
  "Stretching",
  "Balance",
];

interface TemplateDashboardProps {
  listOpen: boolean;
  listType: TemplateSheetType;
  setListOpen: (listOpen: boolean) => void;
  setListType: (listType: TemplateSheetType) => void;
}

export function TemplateDashboard({
  listOpen,
  listType,
  setListOpen,
  setListType,
}: TemplateDashboardProps) {
  const { theme } = useSettingsStore();

  const animatedY = useRef(new Animated.Value(0)).current;

  function togglePanel() {
    const toValue = listOpen ? 0 : -FOCUS_HEIGHT + 80;
    Animated.spring(animatedY, { toValue, useNativeDriver: true }).start();
    setListOpen(!listOpen);
    setListType("exercises");
  }

  function openPanel() {
    const toValue = listOpen ? 0 : -FOCUS_HEIGHT + 80;
    Animated.spring(animatedY, { toValue, useNativeDriver: true }).start();
    setListOpen(!listOpen);
  }

  function visibleSheet() {
    if (listType === "exercises")
      return <TemplateExerciseList togglePanel={togglePanel} />;
    if (listType === "template") return <></>;
  }

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
            height: HEIGHT,
            width: WIDTH,
          }}
        >
          <TagTextLayout tags={mockTags} />
        </LinearGradient>
      </StrobeBlur>

      {/* Toggle Panel */}
      <SheetHeader listOpen={listOpen} togglePanel={togglePanel} />

      {/* List */}
      {listOpen && visibleSheet()}
    </Animated.View>
  );
}
