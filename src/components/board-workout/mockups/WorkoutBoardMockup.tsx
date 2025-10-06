import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Pressable,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StrobeBlur from "../../ui/misc/StrobeBlur";
import { useSettingsStore } from "../../../stores/settingsStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { HEIGHT, WIDTH } from "../../../features/Dimensions";
import { LinearGradient } from "expo-linear-gradient";
import hexToRGBA from "../../../features/HEXtoRGB";
import useFadeInAnim from "../../../animations/useFadeInAnim";
import BounceButton from "../../ui/buttons/BounceButton";
import IButton from "../../ui/buttons/IButton";

const FOCUS_HEIGHT = HEIGHT - 120; // focused exercise height

interface Exercise {
  id: string;
  name: string;
  notes: string;
  inSuperSet: boolean;
}

const exercisesDummy: Exercise[] = [
  {
    id: "1",
    name: "Bench Press",
    notes: "Focus on controlled movement",
    inSuperSet: true,
  },
  {
    id: "2",
    name: "Incline Dumbbell Press",
    notes: "Keep shoulders back",
    inSuperSet: false,
  },
  { id: "3", name: "Dips", notes: "Bodyweight exercise", inSuperSet: false },
  {
    id: "4",
    name: "Cable Flyes",
    notes: "Slow and controlled",
    inSuperSet: false,
  },
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
          <Text
            style={{
              color: listOpen ? theme.glow : theme.grayText,
              fontSize: 18,
              fontWeight: "700",
            }}
          >
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
            colors={[theme.caka, theme.text, theme.handle, theme.border]}
            tint={
              ["light", "peachy", "oldschool"].includes(themeName)
                ? "light"
                : "dark"
            }
            size={HEIGHT}
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
              <ExerciseProfile
                key={selectedExercise.id}
                exercise={selectedExercise}
              />
            </LinearGradient>
          </StrobeBlur>

          {/* Toggle list */}
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

          {/* Exercise list */}
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
                    <Ionicons name="add" size={32} color={theme.text} />
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
        borderColor: isSelected ? theme.background : theme.border,
        paddingHorizontal: 10,
        justifyContent: "center",
        backgroundColor: isSelected
          ? theme.background
          : theme.primaryBackground,
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
      {!compact && exercise.notes && (
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

//ExerciseProfile for exercise info/settings
const ExerciseProfile: React.FC<{
  exercise: Exercise;
}> = ({ exercise }) => {
  const { theme } = useSettingsStore();
  const [restTime, setRestTime] = useState(3);
  const [disableRest, setDisableRest] = useState(false);
  const [notes, setNotes] = useState(exercise.notes);
  const { fadeIn } = useFadeInAnim();

  return (
    <Animated.View
      style={{
        flex: 1,
        width: WIDTH,
        paddingHorizontal: 16,
        ...fadeIn,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          height: 44,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: theme.text,
          }}
        >
          {exercise.name}
        </Text>
        <IButton
          style={{
            height: 44,
            width: WIDTH * 0.2,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: theme.grayText,
            }}
          >
            Edit
          </Text>
        </IButton>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: WIDTH * 0.4 + 4,
            gap: 4,
            height: 34,
            borderRadius: 17,
            overflow: "hidden",
          }}
        >
          <BounceButton
            style={{
              height: 34,
              width: WIDTH * 0.1,
              backgroundColor: disableRest
                ? theme.grayText
                : hexToRGBA(theme.text, 0.1),
              borderTopLeftRadius: 17,
              borderBottomLeftRadius: 17,
            }}
            onPress={() => setDisableRest(!disableRest)}
          >
            <Ionicons
              name={disableRest ? "checkmark" : "close"}
              color={disableRest ? theme.secondaryText : theme.grayText}
              size={20}
            />
          </BounceButton>
          <BounceButton
            style={{
              height: 34,
              width: WIDTH * 0.3,
              backgroundColor: hexToRGBA(theme.text, 0.1),
              borderTopRightRadius: 17,
              borderBottomRightRadius: 17,
            }}
            disabled={disableRest}
          >
            <Ionicons name="stopwatch" color={theme.grayText} size={20} />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: theme.grayText,
              }}
            >
              {restTime} min
            </Text>
          </BounceButton>
        </View>
        {exercise.inSuperSet && (
          <ExerciseSettings
            exercise={exercise}
            width={WIDTH * 0.4 + 4}
            height={34}
          />
        )}
      </View>

      {/* Notes */}
      <TextInput
        style={{
          backgroundColor: theme.input,
          borderRadius: 16,
          paddingHorizontal: 16,
          paddingVertical: 12,
          fontSize: 16,
          color: theme.text,
          borderWidth: 1,
          borderColor: theme.border,
          minHeight: 192,
          textAlignVertical: "top",
          shadowColor: theme.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 16,
          elevation: 4,
          marginBottom: 16,
        }}
        value={notes}
        onChangeText={setNotes}
        placeholder="Add exercise notes..."
        placeholderTextColor={theme.grayText}
        multiline
      />
      {!exercise.inSuperSet && (
        <ExerciseSettings exercise={exercise} width={WIDTH - 32} />
      )}
    </Animated.View>
  );
};

const ExerciseSettings: React.FC<{
  exercise: Exercise;
  width?: number;
  height?: number;
}> = ({ exercise, width = WIDTH, height = 64 }) => {
  const { theme } = useSettingsStore();
  const { fadeIn } = useFadeInAnim();
  return (
    <Animated.View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: height,
        width: width,
        borderRadius: height / 2,
        overflow: "hidden",
        ...fadeIn,
      }}
    >
      {/* Remove Exercise */}
      <BounceButton
        title="Remove Exercise"
        color={theme.primaryBackground}
        style={{
          width: width * 0.32,
          height: height,
          borderTopLeftRadius: height / 2,
          borderBottomLeftRadius: height / 2,
        }}
        onPress={() => {}}
      >
        <Ionicons name="remove" color={theme.error} size={height / 2} />
      </BounceButton>

      {/* Swap Exercise */}
      <BounceButton
        title="Swap Exercise"
        color={theme.primaryBackground}
        style={{
          width: width * 0.32,
          height: height,
        }}
        onPress={() => {}}
      >
        <Ionicons name="swap-horizontal" color={theme.text} size={height / 2} />
      </BounceButton>
      {/* Add Exercise */}
      <BounceButton
        title="Add Exercise"
        color={theme.primaryBackground}
        style={{
          width: width * 0.32,
          height: height,
          borderTopRightRadius: height / 2,
          borderBottomRightRadius: height / 2,
        }}
        onPress={() => {}}
      >
        <Ionicons name="add" color={theme.tint} size={height / 2} />
      </BounceButton>
    </Animated.View>
  );
};

export default WorkoutBoardMockup;
