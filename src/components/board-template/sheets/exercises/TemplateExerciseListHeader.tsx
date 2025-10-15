import { View } from "react-native";
import { WIDTH } from "../../../../features/Dimensions";
import { IButton } from "../../../ui/buttons/IButton";
import { useWorkoutStore } from "../../../../stores/workout/useWorkoutStore";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { Fragment } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useActionSheet } from "../../../../features/useActionSheet";

interface TemplateExerciseListHeaderProps {
  selectMode: boolean;
  selectedExercises: string[];
  setSelectedExercises: (exercises: string[]) => void;
  setSelectMode: (mode: boolean) => void;
  toggleSelectMode: () => void;
}

export function TemplateExerciseListHeader({
  selectMode,
  selectedExercises,
  setSelectedExercises,
  setSelectMode,
  toggleSelectMode,
}: TemplateExerciseListHeaderProps) {
  const { activeSession, removeExercisesFromSession } = useWorkoutStore();
  const { theme } = useSettingsStore();
  const { showActionSheet, t } = useActionSheet();

  function handleRemoveSelectedExercises() {
    const count = selectedExercises.length;
    const title =
      count > 1
        ? t("workout-board.delete-exercises")
        : t("workout-board.delete-exercise");
    const message =
      count > 1
        ? t("workout-board.delete-exercises-message")
        : t("workout-board.delete-exercise-message");

    showActionSheet({
      title: `${title}?`,
      message,
      options: [
        t("workout-board.cancel"),
        `${t("workout-board.delete")} ${count}`,
      ],
      destructiveIndex: 1,
      cancelIndex: 0,
      onSelect: (index) => {
        if (index === 1) removeSelectedExercises();
      },
    });
  }

  function removeSelectedExercises() {
    removeExercisesFromSession(selectedExercises);
    setSelectedExercises([]);
    setSelectMode(false);
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
          disabled={!isSomeSelected || true}//TODO: Remove this when u add superset feature
        />
      </Fragment>
    );
  };

  if (activeSession.layout.length > 0)
    return (
      <View
        style={{
          height: 24,
          width: WIDTH - 16,
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          gap: 16,
          marginHorizontal: 8,
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
