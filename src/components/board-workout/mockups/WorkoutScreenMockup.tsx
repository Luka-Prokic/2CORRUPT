import { useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StrobeBlur } from "../../ui/misc/StrobeBlur";
import { BounceButton } from "../../ui/buttons/BounceButton";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { useSettingsStore } from "../../../stores/settingsStore";
import {
  useWorkoutStore,
  Set,
  SessionExercise,
} from "../../../stores/workoutStore";
import { IButton } from "../../ui/buttons/IButton";
import { WIDTH } from "../../../features/Dimensions";
import { router } from "expo-router";
import { SetRow } from "../../view-workout/table/set-row/SetRow";
import { ExerciseSetList } from "../../view-workout/table/ExerciseSetList";
import { ExerciseTableHeader } from "../../view-workout/table/header/ExerciseTableHeader";
import { AddSetButton } from "../../view-workout/table/AddSetButton";

const HEIGHT = Dimensions.get("window").height;

export function WorkoutScreenMockup() {
 

  return (
    
  );
}
