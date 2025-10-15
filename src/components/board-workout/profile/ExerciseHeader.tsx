import { Text, View } from "react-native";
import { IButton } from "../../ui/buttons/IButton";
import { WIDTH } from "../../../features/Dimensions";
import { ExerciseName } from "../../view-workout/table/header/ExerciseName";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";
import { SessionSheetType } from "../SessionDashboard";
import { router } from "expo-router";

const EDIT_BUTTON_WIDTH = 44;

interface ExerciseHeaderProps {
  openPanel: () => void;
  setListType: (listType: SessionSheetType) => void;
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
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8,
        width: WIDTH - 32,
      }}
    >
      <IButton
        style={{
          width: WIDTH - 32 - EDIT_BUTTON_WIDTH,
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
          alignItems: "flex-end",
          paddingBottom: 4,
        }}
      >
        <Text
          style={{ color: theme.grayText, fontSize: 18, fontWeight: "bold" }}
        >
          {t("button.edit")}
        </Text>
      </IButton>
    </View>
  );
}
