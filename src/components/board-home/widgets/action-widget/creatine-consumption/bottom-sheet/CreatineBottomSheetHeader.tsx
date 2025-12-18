import { View } from "react-native";
import { CreatineBottomSheetMode } from "./CreatineBottomSheet";
import { LabeledValue } from "../../../../../ui/misc/LabeledValue";
import { IBubble } from "../../../../../ui/containers/IBubble";
import { useTranslation } from "react-i18next";
import { useCreatineStore } from "../../../../../../stores/creatine";

interface CreatineBottomSheetHeaderProps {
  mode: CreatineBottomSheetMode;
  setMode: (mode: CreatineBottomSheetMode) => void;
}
export function CreatineBottomSheetHeader({
  mode,
  setMode,
}: CreatineBottomSheetHeaderProps) {
  const { t } = useTranslation();
  const { dailyCreatineGoal, timesADay } = useCreatineStore();

  const isItChangeFrequency = mode === "frequency";
  const isItChangeLabel = mode === "label";

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 32,
        gap: 32,
      }}
    >
      <IBubble
        onPress={() => setMode(isItChangeLabel ? "goal" : "label")}
        size="flexible"
      >
        <LabeledValue
          label={
            isItChangeLabel
              ? t("settings.goal.change-goal")
              : t("button.change")
          }
          value={
            isItChangeLabel
              ? `${dailyCreatineGoal.toString()} g`
              : t("dialog.label")
          }
          align="center"
          style={{ padding: 8 }}
        />
      </IBubble>
      <IBubble
        onPress={() => setMode(isItChangeFrequency ? "goal" : "frequency")}
        size="flexible"
      >
        <LabeledValue
          label={
            isItChangeFrequency
              ? t("settings.goal.change-goal")
              : t("settings.goal.change-frequency")
          }
          value={
            isItChangeFrequency
              ? `${dailyCreatineGoal.toString()} g`
              : `${timesADay.toString()}x`
          }
          align="center"
          style={{ padding: 8 }}
        />
      </IBubble>
    </View>
  );
}
