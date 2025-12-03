import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from "react-native";
import { SessionExercise, useWorkoutStore } from "../../../stores/workoutStore";
import { useSettingsStore } from "../../../stores/settingsStore";
import { WIDTH } from "../../../utils/Dimensions";
import { useEffect, useRef, useState } from "react";
import { ExerciseName } from "../../view-workout/table/header/ExerciseName";

export function TemplateExerciseNameSlider() {
  const { theme } = useSettingsStore();
  const { activeTemplate, setActiveExercise, activeExercise } =
    useWorkoutStore();

  const flatListRef = useRef<FlatList>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isUserScrolling, setIsUserScrolling] = useState(true);

  if (!activeTemplate) return null;

  const exercises = activeTemplate.layout;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!isUserScrolling) return;

    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / WIDTH);

    if (index >= 0 && index < exercises.length) {
      setSelectedIndex((prevIndex) => {
        if (prevIndex !== index) {
          const exerciseId = exercises[index].id;
          setActiveExercise(exerciseId);
          return index;
        }
        return prevIndex;
      });
    }
  };

  // Sync FlatList with activeExercise changes
  useEffect(() => {
    if (!activeExercise) return;

    const index = exercises.findIndex((item: SessionExercise) => {
      return item.id === activeExercise.id;
    });

    if (index === -1 || index === selectedIndex) return;

    setIsUserScrolling(false); // prevent onScroll from triggering
    setSelectedIndex(index);
    flatListRef.current?.scrollToOffset({
      offset: index * WIDTH,
      animated: true,
    });

    const timeout = setTimeout(() => setIsUserScrolling(true), 500); //delay to prevent flickering
    return () => clearTimeout(timeout);
  }, [activeExercise, exercises]);

  return (
    <FlatList
      ref={flatListRef}
      horizontal
      data={exercises}
      keyExtractor={(item: SessionExercise) => item.id}
      snapToInterval={WIDTH}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      renderItem={({ item, index }) => (
        <View
          style={{
            width: WIDTH,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ExerciseName
            exercise={item}
            textColor={selectedIndex === index ? theme.text : theme.grayText}
            prefixColor={selectedIndex === index ? theme.text : theme.grayText}
          />
        </View>
      )}
    />
  );
}
