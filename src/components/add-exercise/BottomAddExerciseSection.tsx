import { Animated, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { hexToRGBA } from "../../features/HEXtoRGB";
import { useSettingsStore } from "../../stores/settingsStore";
import { WIDTH } from "../../features/Dimensions";
import { IButton } from "../ui/buttons/IButton";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { createSessionExercise } from "../../features/workout/useNewSessionExercise";
import { ExerciseInfo } from "../../stores/workout/types";
import { useWorkoutStore } from "../../stores/workout/useWorkoutStore";
import { useTranslation } from "react-i18next";
import { StrobeBlur } from "../ui/misc/StrobeBlur";

interface BottomAddExerciseSectionProps {
  selectedExercises: ExerciseInfo[];
}

export function BottomAddExerciseSection({
  selectedExercises,
}: BottomAddExerciseSectionProps) {
  const { theme } = useSettingsStore();
  const { addExerciseToSession, setActiveExercise } = useWorkoutStore();
  const { t } = useTranslation();

  const animatedOpacity = useRef(new Animated.Value(0)).current;

  function handleAddExercise() {
    selectedExercises.forEach((exercise: ExerciseInfo) => {
      addExerciseToSession(createSessionExercise(exercise));
    });
    setActiveExercise(selectedExercises[0].id);
    router.back();
  }

  function handleAddSuperSet() {
    //TODO: Add super set to session
  }

  useEffect(() => {
    if (selectedExercises.length > 0) {
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
  }, [selectedExercises]);

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
        {selectedExercises.length > 1 && (
          <IButton
            onPress={handleAddSuperSet}
            style={{
              height: 64,
              width: WIDTH * 0.5 - 20,
              //   borderRadius: 22,
              borderTopLeftRadius: 32,
              borderBottomLeftRadius: 32,
            }}
            color={theme.accent}
          >
            <StrobeBlur
              colors={[
                theme.text,
                theme.secondaryText,
                theme.background,
                theme.primaryBackground,
              ]}
              tint="light"
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              disable
            >
              <Text
                style={{
                  color: theme.secondaryText,
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              >
                {t("add-exercise.super-set")}
              </Text>
            </StrobeBlur>
          </IButton>
        )}
        <IButton
          onPress={handleAddExercise}
          style={{
            height: 64,
            width: selectedExercises.length > 1 ? WIDTH * 0.5 - 20 : WIDTH - 32,
            borderRadius: selectedExercises.length > 1 ? 8 : 32,
            borderTopRightRadius: 32,
            borderBottomRightRadius: 32,
          }}
          color={theme.tint}
        >
          <StrobeBlur
            colors={[
              theme.caka,
              theme.primaryBackground,
              theme.accent,
              theme.tint,
            ]}
            tint="light"
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            disable
          >
            <Text
              style={{
                color: theme.secondaryText,
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              {t("add-exercise.add")} {selectedExercises.length.toString()}
            </Text>
          </StrobeBlur>
        </IButton>
      </LinearGradient>
    </Animated.View>
  );
}
