import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import hexToRGBA from "../../../features/HEXtoRGB";
import { SafeAreaView } from "react-native-safe-area-context";
import OptionButton from "../../ui/buttons/OptionButton";
import DropDownButton from "../../ui/buttons/DropDownButton";

const { width, height } = Dimensions.get("window");

// Types for dummy data
interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  rir: number; // Reps in Reserve
  rpe: number; // Rate of Perceived Exertion
  notes: string;
  isActive: boolean;
  isCompleted: boolean;
  isSuperset?: boolean;
  restSeconds: number;
}

interface WorkoutBoardMockupProps {}

const WorkoutBoardMockup: React.FC<WorkoutBoardMockupProps> = () => {
  const { theme, themeName } = useSettingsStore();

  const [exercises] = useState<Exercise[]>([
    {
      id: "1",
      name: "Bench Press",
      sets: 4,
      reps: 10,
      weight: 135,
      rir: 2,
      rpe: 8,
      notes: "Focus on controlled movement",
      isActive: true,
      isCompleted: false,
      restSeconds: 180,
    },
    {
      id: "2",
      name: "Incline Dumbbell Press",
      sets: 3,
      reps: 12,
      weight: 80,
      rir: 1,
      rpe: 9,
      notes: "Keep shoulders back",
      isActive: false,
      isCompleted: false,
      restSeconds: 180,
    },
    {
      id: "3",
      name: "Dips",
      sets: 3,
      reps: 15,
      weight: 0,
      rir: 0,
      rpe: 8,
      notes: "Bodyweight exercise",
      isActive: false,
      isCompleted: false,
      restSeconds: 180,
    },
    {
      id: "4",
      name: "Cable Flyes",
      sets: 4,
      reps: 15,
      weight: 45,
      rir: 3,
      rpe: 7,
      notes: "Slow and controlled",
      isActive: false,
      isCompleted: false,
      isSuperset: true,
      restSeconds: 180,
    },
    {
      id: "5",
      name: "Push-ups",
      sets: 2,
      reps: 20,
      weight: 0,
      rir: 1,
      rpe: 8,
      notes: "Perfect form",
      isActive: false,
      isCompleted: false,
      restSeconds: 180,
    },
    {
      id: "6",
      name: "Tricep Extensions",
      sets: 3,
      reps: 12,
      weight: 35,
      rir: 2,
      rpe: 7,
      notes: "Elbows in",
      isActive: false,
      isCompleted: false,
      restSeconds: 180,
    },
  ]);

  const [selectedExercise, setSelectedExercise] = useState<Exercise>(
    exercises[0]
  );
  const [showRIR, setShowRIR] = useState(false);
  const [showRPE, setShowRPE] = useState(true);
  const [restTime, setRestTime] = useState(3); // in minutes
  const [notes, setNotes] = useState(selectedExercise.notes);

  const handleExerciseSelect = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setRestTime(Math.floor(exercise.restSeconds / 60));
    setNotes(exercise.notes);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingVertical: 20,
        }}
      >
        {/*  Selected Exercise Card */}
        <View
          style={{
            marginBottom: 16,
            borderRadius: 20,
            backgroundColor: theme.navBackground,
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 6,
            padding: 16,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          {/* Exercise Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: theme.text,
                marginBottom: 4,
              }}
            >
              {selectedExercise.name}
            </Text>
          </View>

          {/* Notes */}
          <View style={{ marginVertical: 16 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: theme.grayText,
                marginBottom: 8,
              }}
            >
              Notes
            </Text>
            <TextInput
              style={{
                backgroundColor: theme.secondaryBackground,
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontSize: 16,
                color: theme.text,
                borderWidth: 1,
                borderColor: theme.border,
                minHeight: 60,
                textAlignVertical: "top",
              }}
              value={notes}
              onChangeText={setNotes}
              placeholder="Add exercise notes..."
              placeholderTextColor={theme.grayText}
              multiline
            />
          </View>

          {/* All Options List */}
          <DropDownButton
            snapPoints={[34, 34 * 7]}
            style={{
              width: "100%",
              backgroundColor: theme.secondaryBackground,
              borderWidth: 0,
            }}
          >
            {/* Remove Exercise */}
            <OptionButton
              title="Remove Exercise"
              color={theme.error}
              icon={
                <Ionicons name="remove-circle" color={theme.error} size={20} />
              }
              onPress={() => {}} // replace with your handler
            />

            {/* Swap Exercise */}
            <OptionButton
              title="Swap Exercise"
              color={theme.text}
              icon={
                <Ionicons name="swap-horizontal" color={theme.text} size={20} />
              }
              onPress={() => {}} // replace with your handler
            />

            {/* Add Exercise */}
            <OptionButton
              title="Add Exercise"
              color={theme.tint}
              icon={<Ionicons name="add-circle" color={theme.tint} size={20} />}
              onPress={() => {}} // replace with your handler
            />

            {/* Show/Hide RIR */}
            <OptionButton
              title={showRIR ? "Hide RIR" : "Show RIR"}
              color={showRIR ? theme.accent : theme.grayText}
              icon={
                <Ionicons
                  name={showRIR ? "eye" : "eye-off"}
                  color={showRIR ? theme.accent : theme.grayText}
                  size={20}
                />
              }
              onPress={() => setShowRIR(!showRIR)}
            />

            {/* Show/Hide RPE */}
            <OptionButton
              title={showRPE ? "Hide RPE" : "Show RPE"}
              color={showRPE ? theme.accent : theme.grayText}
              icon={
                <Ionicons
                  name={showRPE ? "eye" : "eye-off"}
                  color={showRPE ? theme.accent : theme.grayText}
                  size={20}
                />
              }
              onPress={() => setShowRPE(!showRPE)}
            />

            {/* Rest Time */}
            <OptionButton
              title={`Rest Time: ${restTime} min`}
              color={theme.grayText}
              icon={
                <Ionicons name="stopwatch" color={theme.grayText} size={20} />
              }
              onPress={() => {}} // replace with your handler
            />
          </DropDownButton>
        </View>

      
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutBoardMockup;
