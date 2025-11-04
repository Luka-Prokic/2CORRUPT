import { Animated, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { useSettingsStore } from "../../../stores/settingsStore";
import { WIDTH } from "../../../features/Dimensions";
import { IButton } from "../../ui/buttons/IButton";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";
import { useTranslation } from "react-i18next";
import { WorkoutTemplate } from "../../../stores/workout/types";

interface BottomAddWorkoutSectionProps {
  selectedTemplates: WorkoutTemplate[];
}

export function BottomAddWorkoutSection({
  selectedTemplates,
}: BottomAddWorkoutSectionProps) {
  const { theme } = useSettingsStore();
  const { addWorkoutToDay } = useWorkoutStore();
  const { t } = useTranslation();
  const { splitId, dayIndex } = useLocalSearchParams<{
    splitId: string;
    dayIndex: string;
  }>();

  const animatedOpacity = useRef(new Animated.Value(0)).current;

  function handleAddExercise() {
    selectedTemplates.forEach((template: WorkoutTemplate) => {
      addWorkoutToDay(splitId, parseInt(dayIndex), template.id);
    });
    router.back();
  }

  useEffect(() => {
    if (selectedTemplates.length > 0) {
      Animated.spring(animatedOpacity, {
        toValue: 1,
        speed: 100,
        bounciness: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedOpacity, {
        toValue: 0,
        speed: 100,
        bounciness: 10,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedTemplates.length]);

  return (
    <Animated.View style={{ opacity: animatedOpacity }}>
      <LinearGradient
        colors={[hexToRGBA(theme.text, 0), hexToRGBA(theme.text, 0.4)]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 88,
          width: WIDTH,
          paddingHorizontal: 16,
          flexDirection: "row",
          gap: 8,
        }}
      >
        <IButton
          onPress={handleAddExercise}
          style={{
            height: 64,
            width: WIDTH - 32,
            borderRadius: 32,
          }}
          color={theme.tint}
        >
          <Text
            style={{
              color: theme.secondaryText,
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            {t("add-exercise.add")} {selectedTemplates.length.toString()}
          </Text>
        </IButton>
      </LinearGradient>
    </Animated.View>
  );
}
