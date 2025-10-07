import { View, Text } from "react-native";
import { WIDTH } from "../../../features/Dimensions";
import { IButton } from "../../ui/buttons/IButton";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";
import { useSettingsStore } from "../../../stores/settings/useSettingsStore";
import { Fragment } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

interface SessionExerciseListHeaderProps {
  selectMode: boolean;
  selectedExercises: string[];
  setSelectedExercises: (exercises: string[]) => void;
  setSelectMode: (mode: boolean) => void;
  toggleSelectMode: () => void;
}

export function SessionExerciseListHeader({
  selectMode,
  selectedExercises,
  setSelectedExercises,
  setSelectMode,
  toggleSelectMode,
}: SessionExerciseListHeaderProps) {
  const {
    activeSession,
    activeExercise,
    clearActiveExercise,
    setActiveExercise,
    removeItemFromSession,
  } = useWorkoutStore();
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  function handleRemoveSelectedExercises() {
    selectedExercises.forEach((exerciseId) => {
      if (activeExercise.id === exerciseId) clearActiveExercise();
      removeItemFromSession(exerciseId);
    });
    setSelectedExercises([]);
    setSelectMode(false);
    const firstExercise =
      activeSession.layout[0].type === "exercise"
        ? activeSession.layout[0].exercise.id
        : activeSession.layout[0].exercises[0].id;
    if (!activeExercise) setActiveExercise(firstExercise);
  }

  function handleSelectAllExercises() {
    setSelectedExercises(activeSession.layout.map((item) => item.id));
  }
  const selectModeButtons = () => {
    const isAllSelected =
      selectedExercises.length === activeSession.layout.length;
    const isSomeSelected = selectedExercises.length > 0;
    return (
      <Fragment>
        <IButton
          title={t("app.all")}
          onPress={handleSelectAllExercises}
          style={{
            height: 24,
            opacity: isAllSelected ? 0 : 1,
          }}
          textColor={theme.grayText}
          disabled={isAllSelected}
        />
        <IButton
          onPress={handleRemoveSelectedExercises}
          style={{
            height: 24,
            width: 24,
          }}
          disabled={!isSomeSelected}
        >
          <Ionicons
            name="trash-outline"
            size={24}
            color={!isSomeSelected ? theme.grayText : theme.error}
          />
        </IButton>
        <IButton
          title={`${t("workout-board.add-to-superset")} (${
            selectedExercises.length
          })`}
          onPress={() => {
            //TODO: Add selected exercises to superset
          }}
          style={{
            paddingHorizontal: 8,
            height: 24,
            borderRadius: 17,
          }}
          textColor={!isSomeSelected ? theme.grayText : theme.accent}
          disabled={!isSomeSelected}
        />
      </Fragment>
    );
  };

  if (activeSession.layout.length > 0)
    return (
      <View
        style={{
          height: 24,
          width: WIDTH - 32,
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <IButton
          title={
            selectMode ? t("workout-board.cancel") : t("workout-board.select")
          }
          onPress={toggleSelectMode}
          style={{
            paddingHorizontal: 8,
            height: 24,
            borderRadius: 17,
          }}
          color={theme.grayText}
          textColor={theme.secondaryText}
        />

        {selectMode && selectModeButtons()}
      </View>
    );

  return null;
}
