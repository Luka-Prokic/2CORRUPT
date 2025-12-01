import { Text, View } from "react-native";
import { IButton } from "../../ui/buttons/IButton";
import { WIDTH } from "../../../features/Dimensions";
import { ExerciseName } from "../../view-workout/table/header/ExerciseName";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";
import { SessionSheetType } from "../../../app/workout-board";
import { router } from "expo-router";
import { TemplateSheetType } from "../../../app/template-board";
import { DescriptionText } from "../../ui/text/DescriptionText";
import { IText } from "../../ui/text/IText";

const EDIT_BUTTON_WIDTH = 44;

interface ExerciseHeaderProps {
  openPanel: () => void;
  setListType: (listType: SessionSheetType | TemplateSheetType) => void;
}

export function ExerciseHeader({
  openPanel,
  setListType,
}: ExerciseHeaderProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { activeExercise } = useWorkoutStore();

  function handleEditExercise() {
    setListType("name");
    openPanel();
  }

  function handleExerciseNamePress() {
    router.back();
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
          justifyContent: "flex-start",
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
          alignItems: "center",
        }}
      >
        <IText size={18} text={t("button.edit")} color={theme.info} />
      </IButton>
    </View>
  );
}
