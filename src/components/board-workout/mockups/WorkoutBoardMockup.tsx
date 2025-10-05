import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StrobeBlur from "../../ui/misc/StrobeBlur";
import { useSettingsStore } from "../../../stores/settingsStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { HEIGHT } from "../../../features/Dimensions";
import { LinearGradient } from "expo-linear-gradient";
import hexToRGBA from "../../../features/HEXtoRGB";
import useFadeInAnim from "../../../animations/useFadeInAnim";

const FOCUS_HEIGHT = HEIGHT - 120; // focused exercise height

interface Exercise {
  id: string;
  name: string;
  notes: string;
}

const exercisesDummy: Exercise[] = [
  { id: "1", name: "Bench Press", notes: "Focus on controlled movement" },
  { id: "2", name: "Incline Dumbbell Press", notes: "Keep shoulders back" },
  { id: "3", name: "Dips", notes: "Bodyweight exercise" },
  { id: "4", name: "Cable Flyes", notes: "Slow and controlled" },
];

const WorkoutBoardMockup: React.FC = () => {
  const { theme, themeName } = useSettingsStore();
  const [selectedExercise, setSelectedExercise] = useState(exercisesDummy[0]);
  const [listOpen, setListOpen] = useState(false);
  const { fadeIn } = useFadeInAnim();
  const animatedY = useRef(new Animated.Value(0)).current;

  const togglePanel = () => {
    const toValue = listOpen ? 0 : -FOCUS_HEIGHT + 80;
    Animated.spring(animatedY, { toValue, useNativeDriver: true }).start();
    setListOpen(!listOpen);
  };

  const handleExerciseSelect = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    togglePanel();
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        {/* Top header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
            zIndex: 1,
          }}
        >
          <TouchableOpacity>
            <Ionicons name="close-circle" size={44} color={theme.error} />
          </TouchableOpacity>
          <Text style={{ color: listOpen ? theme.secondaryText : theme.grayText, fontSize: 18, fontWeight: "700" }}>
            Workout - {new Date().toLocaleDateString()}
          </Text>
          <TouchableOpacity>
            <Ionicons name="checkmark-circle" size={44} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* Focused Exercise */}
        <Animated.View
          style={{
            flex: 1,
            transform: [{ translateY: animatedY }],
          }}
        >
          <StrobeBlur
            colors={[
              theme.border,
              theme.background,
              theme.grayText,
              theme.handle,
            ]}
            tint={
              ["light", "peachy", "oldschool"].includes(themeName)
                ? "light"
                : "dark"
            }
            size={HEIGHT / 2}
            style={{
              height: FOCUS_HEIGHT,
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
                padding: 16,
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 32, fontWeight: "700", color: theme.text }}
              >
                {selectedExercise.name}
              </Text>
              <Text
                style={{ fontSize: 16, color: theme.grayText, marginTop: 12 }}
              >
                {selectedExercise.notes}
              </Text>
            </LinearGradient>
          </StrobeBlur>

          {/* Toggle list */}
          <TouchableOpacity
            activeOpacity={0.8}
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
              borderRadius: 16,
            }}
          >
            <Ionicons
              name={listOpen ? "chevron-down" : "chevron-up"}
              size={32}
              color={theme.tint}
            />
          </TouchableOpacity>

          {/* Exercise list */}
          {listOpen && (
            <Animated.View
              style={{
                paddingHorizontal: 16,
                paddingBottom: 80,
                height: "100%",
                ...fadeIn,
              }}
            >
              <ScrollView showsVerticalScrollIndicator={false}>
                {exercisesDummy.map((exercise) => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    compact={false}
                    onSelect={handleExerciseSelect}
                    isSelected={selectedExercise.id === exercise.id}
                  />
                ))}

                {/* + Add Exercise card */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => console.log("Add exercise tapped")}
                  style={{ marginBottom: 24, height: 64 }}
                >
                  <StrobeBlur
                    colors={[theme.tint, theme.caka, theme.accent, theme.tint]}
                    style={{
                      borderColor: theme.tint,
                      borderRadius: 32,
                      height: 64,
                      backgroundColor: theme.primaryBackground,
                    }}
                  >
                    <Ionicons name="add" size={32} color={theme.background} />
                  </StrobeBlur>
                </TouchableOpacity>
              </ScrollView>
            </Animated.View>
          )}
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

// ExerciseCard component
const ExerciseCard: React.FC<{
  exercise: Exercise;
  compact?: boolean;
  onSelect: (exercise: Exercise) => void;
  isSelected: boolean;
}> = ({ exercise, compact = false, onSelect, isSelected }) => {
  const { theme } = useSettingsStore();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onSelect(exercise)}
      style={{
        marginBottom: 8,
        height: 64,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: isSelected ? theme.tint : theme.border,
        paddingHorizontal: 10,
        justifyContent: "center",
        backgroundColor: isSelected ? theme.tint : theme.primaryBackground,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          color: isSelected ? theme.secondaryText : theme.text,
        }}
      >
        {exercise.name}
      </Text>
      {!compact && exercise.notes && (
        <Text
          style={{
            fontSize: 13,
            color: isSelected ? theme.secondaryText : theme.grayText,
          }}
        >
          {exercise.notes}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default WorkoutBoardMockup;
