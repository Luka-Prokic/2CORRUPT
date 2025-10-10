import { Text, View } from "react-native";
import { IButton } from "../../../ui/buttons/IButton";
import { WIDTH } from "../../../../features/Dimensions";
import { ExerciseName } from "../../../view-workout/table/header/ExerciseName";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { useTranslation } from "react-i18next";
import { useWorkoutStore } from "../../../../stores/workout/useWorkoutStore";

export function ExerciseHeader() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { activeExercise } = useWorkoutStore();

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
      <View style={{ width: WIDTH - 32 - 44 }}>
        <ExerciseName exercise={activeExercise} />
      </View>
      <IButton
        title="Edit"
        onPress={() => {}}
        style={{
          height: 44,
          width: 44,
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
