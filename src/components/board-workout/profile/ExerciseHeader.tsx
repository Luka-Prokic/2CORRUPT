import { View } from "react-native";
import { IButton } from "../../ui/buttons/IButton";
import { WIDTH } from "../../../utils/Dimensions";
import { ExerciseName } from "../../view-workout/table/header/ExerciseName";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";
import { SessionSheetType } from "../../../app/workout-board";
import { router } from "expo-router";
import { TemplateSheetType } from "../../../app/template-board";
import { MidText } from "../../ui/text/MidText";

const EDIT_BUTTON_WIDTH = 44;

interface ExerciseHeaderProps {
  setSheetType: (sheetType: SessionSheetType | TemplateSheetType) => void;
}

export function ExerciseHeader({ setSheetType }: ExerciseHeaderProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { activeExercise } = useWorkoutStore();

  function handleEditExercise() {
    setSheetType("name");
  }

  function handleExerciseNamePress() {
    router.push({
      pathname: "/exercise/[exerciseId]/info",
      params: { exerciseId: activeExercise?.exerciseInfoId as string },
    });
  }
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 8,
        width: WIDTH,
      }}
    >
      <IButton
        style={{
          width: WIDTH - 16 - EDIT_BUTTON_WIDTH,
        }}
        onPress={handleExerciseNamePress}
      >
        <ExerciseName exercise={activeExercise} prefixColor={theme.text} />
      </IButton>
      <IButton
        onPress={handleEditExercise}
        style={{
          height: EDIT_BUTTON_WIDTH,
          width: EDIT_BUTTON_WIDTH,
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <MidText text={t("button.edit")} style={{ color: theme.info }} />
      </IButton>
    </View>
  );
}
