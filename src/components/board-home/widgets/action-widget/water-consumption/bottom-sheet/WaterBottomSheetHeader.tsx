import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { WaterBottomSheetMode } from "./WaterBottomSheet";
import { IBubble } from "../../../../../ui/containers/IBubble";
import { LabeledValue } from "../../../../../ui/misc/LabeledValue";
import { useWaterStore } from "../../../../../../stores/water";
import { useDisplayedUnits } from "../../../../../../features/translate/useDisplayedUnits";
import { useSettingsStore } from "../../../../../../stores/settingsStore";

interface WaterBottomSheetProps {
  mode: WaterBottomSheetMode;
  setMode: (mode: WaterBottomSheetMode) => void;
}

export function WaterBottomSheetHeader({
  mode,
  setMode,
}: WaterBottomSheetProps) {
  const { t } = useTranslation();
  const { units } = useSettingsStore();
  const { dailyWaterGoal, increment } = useWaterStore();
  const { fromMl } = useDisplayedUnits();

  const isItChangeGoal = mode === "goal";
  const isItChangeUnit = mode === "unit";
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
        onPress={() => setMode(isItChangeGoal ? "custom" : "goal")}
        size="flexible"
      >
        <LabeledValue
          label={
            isItChangeGoal
              ? t("settings.goal.custom-add-water")
              : t("settings.goal.change-goal")
          }
          value={
            isItChangeGoal
              ? Number(fromMl(increment))
              : Number(fromMl(dailyWaterGoal))
          }
          align="center"
          style={{ padding: 8 }}
        />
      </IBubble>
      <IBubble
        onPress={() => setMode(isItChangeUnit ? "custom" : "unit")}
        size="flexible"
      >
        <LabeledValue
          label={
            isItChangeUnit
              ? t("settings.goal.custom-add-water")
              : t("units.change-unit")
          }
          value={isItChangeUnit ? Number(fromMl(increment)) : units.volume}
          align="center"
          style={{ padding: 8 }}
        />
      </IBubble>
    </View>
  );
}
