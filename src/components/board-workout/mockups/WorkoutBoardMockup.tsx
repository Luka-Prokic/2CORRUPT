import { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StrobeBlur } from "../../ui/misc/StrobeBlur";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useWorkoutStore } from "../../../stores/workoutStore";
import { HEIGHT, WIDTH } from "../../../features/Dimensions";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { useFadeInAnim } from "../../../animations/useFadeInAnim";
import {
  SessionLayoutItem,
  SessionExercise,
} from "../../../stores/workoutStore";
import { useUIStore } from "../../../stores/ui";
import { useRouter } from "expo-router";

// Constants
const FOCUS_HEIGHT = HEIGHT - 120;

export function WorkoutBoardMockup() {
  const { theme, themeName } = useSettingsStore();
  const { fadeIn } = useFadeInAnim();
  const animatedY = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const {
    activeSession,
    activeExercise,
    setActiveExercise,
    completeSession,
    cancelSession,
  } = useWorkoutStore();
  const { setWorkoutView } = useUIStore();

  const [listOpen, setListOpen] = useState(false);

  if (!activeSession || !activeSession.layout)
    return <Text style={{ color: theme.text }}>No active session</Text>;

  const togglePanel = () => {
    const toValue = listOpen ? 0 : -FOCUS_HEIGHT + 80;
    Animated.spring(animatedY, { toValue, useNativeDriver: true }).start();
    setListOpen(!listOpen);
  };

  const handleExerciseSelect = (exerciseId: string) => {
    setActiveExercise(exerciseId);
    togglePanel();
  };

  // activeExercise is now the full object, not just an ID
  const selectedExercise = activeExercise;

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        {/* Top Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
            zIndex: 1,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              cancelSession();
              setWorkoutView(false);
              router.back();
            }}
          >
            <Ionicons name="close-circle" size={44} color={theme.error} />
          </TouchableOpacity>
          <Text
            style={{
              color: listOpen ? theme.glow : theme.grayText,
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            {activeSession.name}
          </Text>
          <TouchableOpacity
            onPress={() => {
              completeSession();
              setWorkoutView(false);
              router.back();
            }}
          >
            <Ionicons name="checkmark-circle" size={44} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* Focused Exercise */}
        <Animated.View
          style={{ flex: 1, transform: [{ translateY: animatedY }] }}
        >
          <StrobeBlur
            colors={[theme.caka, theme.text, theme.handle, theme.border]}
            tint={
              ["light", "peachy", "oldschool"].includes(themeName)
                ? "light"
                : "dark"
            }
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
              {selectedExercise && (
                <ExerciseProfile exercise={selectedExercise} />
              )}
            </LinearGradient>
          </StrobeBlur>

          {/* Toggle Panel */}
          <Pressable
            onPress={togglePanel}
            style={{
              alignItems: "center",
              position: "absolute",
              height: 86,
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
          {listOpen && (
            <Animated.View
              style={{
                paddingHorizontal: 16,
                paddingBottom: 80,
                height: HEIGHT - 120,
                ...fadeIn,
              }}
            >
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, gap: 8 }}>
                  {activeSession.layout.map((item) =>
                    item.type === "exercise" ? (
                      <ExerciseCard
                        key={item.id}
                        exercise={item.exercise}
                        onSelect={handleExerciseSelect}
                        isSelected={activeExercise?.id === item.exercise.id}
                      />
                    ) : item.type === "superset" ? (
                      <SuperSetCard
                        key={item.id}
                        superSet={item}
                        onSelect={handleExerciseSelect}
                        selectedExerciseId={activeExercise?.id || null}
                      />
                    ) : null
                  )}

                  {/* Add Exercise */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => console.log("Add exercise tapped")}
                    style={{ height: 64 }}
                  >
                    <StrobeBlur
                      colors={[
                        theme.tint,
                        theme.caka,
                        theme.accent,
                        theme.tint,
                      ]}
                      style={{
                        borderRadius: 32,
                        height: 64,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="add" size={32} color={theme.text} />
                    </StrobeBlur>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </Animated.View>
          )}
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

// ----------------- ExerciseCard -----------------
const ExerciseCard: React.FC<{
  exercise: SessionExercise;
  onSelect: (id: string) => void;
  isSelected: boolean;
}> = ({ exercise, onSelect, isSelected }) => {
  const { theme } = useSettingsStore();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onSelect(exercise.id)}
      style={{
        height: 64,
        width: WIDTH - 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: isSelected ? "transparent" : theme.border,
        paddingHorizontal: 10,
        justifyContent: "center",
        backgroundColor: isSelected ? "transparent" : theme.primaryBackground,
      }}
      disabled={isSelected}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          color: isSelected ? theme.tint : theme.text,
        }}
      >
        {exercise.name}
      </Text>
      {exercise.notes && (
        <Text
          style={{
            fontSize: 13,
            color: isSelected ? theme.tint : theme.grayText,
          }}
        >
          {exercise.notes}
        </Text>
      )}
    </TouchableOpacity>
  );
};

// ----------------- SuperSetCard -----------------
const SuperSetCard: React.FC<{
  superSet: Extract<SessionLayoutItem, { type: "superset" }>;
  onSelect: (id: string) => void;
  selectedExerciseId: string | null;
}> = ({ superSet, onSelect, selectedExerciseId }) => {
  const { theme } = useSettingsStore();

  return (
    <View style={{ gap: 4 }}>
      {superSet.exercises.map((ex) => (
        <ExerciseCard
          key={ex.id}
          exercise={ex}
          onSelect={onSelect}
          isSelected={ex.id === selectedExerciseId}
        />
      ))}
    </View>
  );
};

// ----------------- ExerciseProfile -----------------
const ExerciseProfile: React.FC<{ exercise: SessionExercise }> = ({
  exercise,
}) => {
  const { theme } = useSettingsStore();
  const { fadeIn } = useFadeInAnim();

  return (
    <Animated.View
      style={{ flex: 1, width: WIDTH, paddingHorizontal: 16, ...fadeIn }}
    >
      <Text style={{ fontSize: 28, fontWeight: "bold", color: theme.text }}>
        {exercise.name}
      </Text>
      {exercise.notes && (
        <Text style={{ fontSize: 16, color: theme.grayText }}>
          {exercise.notes}
        </Text>
      )}
    </Animated.View>
  );
};

