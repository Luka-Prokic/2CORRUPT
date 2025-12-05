import { View, Text } from "react-native";
import { WIDTH } from "../../../../utils/Dimensions";
import { IButton } from "../../../ui/buttons/IButton";
import { useWorkoutStore } from "../../../../stores/workout/useWorkoutStore";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { Fragment } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useActionSheet } from "../../../../utils/useActionSheet";
import { LinearGradient } from "expo-linear-gradient";
import { hexToRGBA } from "../../../../utils/HEXtoRGB";

interface ExerciseListHeaderProps {
  selectMode: boolean;
  selectedExercises: string[];
  setSelectedExercises: (exercises: string[]) => void;
  setSelectMode: (mode: boolean) => void;
  toggleSelectMode: () => void;
}

export function ExerciseListHeader({
  selectMode,
  selectedExercises,
  setSelectedExercises,
  setSelectMode,
  toggleSelectMode,
}: ExerciseListHeaderProps) {
  const {
    activeSession,
    removeExercisesFromSession,
    activeTemplate,
    removeExercisesFromTemplate,
  } = useWorkoutStore();
  const { theme } = useSettingsStore();
  const { showActionSheet, t } = useActionSheet();

  function handleRemoveSelectedExercises() {
    const count = selectedExercises.length;
    const title =
      count > 1
        ? t("workout-board.remove-exercises")
        : t("workout-board.remove-exercise");
    const message =
      count > 1
        ? t("workout-board.remove-exercises-message")
        : t("workout-board.remove-exercise-message");
    const removeText =
      count > 1 ? `${t("button.remove")} ${count}` : t("button.remove");

    showActionSheet({
      title: `${title}?`,
      message,
      options: [t("button.cancel"), removeText],
      destructiveIndex: 1,
      cancelIndex: 0,
      onSelect: (index) => {
        if (index === 1) removeSelectedExercises();
      },
    });
  }

  function removeSelectedExercises() {
    if (activeSession) {
      removeExercisesFromSession(selectedExercises);
    } else {
      removeExercisesFromTemplate(selectedExercises);
    }
    setSelectedExercises([]);
    setSelectMode(false);
  }

  function handleSelectAllExercises() {
    if (activeSession) {
      setSelectedExercises(activeSession.layout.map((item) => item.id));
    } else {
      setSelectedExercises(activeTemplate.layout.map((item) => item.id));
    }
  }

  const selectModeButtons = () => {
    const isAllSelected =
      selectedExercises.length ===
      (activeSession
        ? activeSession.layout.length
        : activeTemplate.layout.length);
    const isSomeSelected = selectedExercises.length > 0;
    return (
      <Fragment>
        <IButton
          title={t("app.all")}
          onPress={handleSelectAllExercises}
          style={{
            height: 24,
          }}
          textColor={isAllSelected ? theme.handle : theme.grayText}
          disabled={isAllSelected}
        />

        <View
          style={{
            height: 24,
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              color: !isSomeSelected ? theme.handle : theme.grayText,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {t("button.selected")} {selectedExercises.length}
          </Text>
        </View>
        <IButton
          onPress={handleRemoveSelectedExercises}
          style={{
            height: 24,
            width: 24,
            marginLeft: 8,
          }}
          disabled={!isSomeSelected}
        >
          <Ionicons
            name="trash-outline"
            size={24}
            color={!isSomeSelected ? theme.handle : theme.error}
          />
        </IButton>
      </Fragment>
    );
  };

  if (
    activeSession
      ? activeSession.layout.length > 0
      : activeTemplate.layout.length > 0
  )
    return (
      <LinearGradient
        colors={[theme.background, hexToRGBA(theme.background, 0)]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          height: 64,
          width: WIDTH,
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          gap: 16,
          paddingHorizontal: 16,
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
      </LinearGradient>
    );

  return null;
}
