import { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  useSettingsStore,
  VolumeUnit,
} from "../../../../../../stores/settingsStore";
import { IBottomSheet } from "../../../../../ui/IBottomSheet";
import { useState } from "react";
import { ChangeGoalView } from "../../../../../ui/misc/ChangeGoalView";
import { ChangeUnitView } from "../../../../../ui/misc/ChangeUnitView";
import { CustomWaterAddView } from "./CustomWaterAddView";
import { useWaterStore } from "../../../../../../stores/water";
import { useTranslation } from "react-i18next";
import { FadeInRight, FadeInLeft } from "react-native-reanimated";

interface WaterBottomSheetProps {
  ref: React.RefObject<BottomSheetModal>;
}

export function WaterBottomSheet({ ref }: WaterBottomSheetProps) {
  const { t } = useTranslation();
  const { units, setUnits } = useSettingsStore();
  const { dailyWaterGoal, setdailyWaterGoal } = useWaterStore();
  const [mode, setMode] = useState<"custom" | "change-unit" | "change-goal">(
    "custom"
  );

  function viewMode() {
    switch (mode) {
      case "custom":
        return <CustomWaterAddView setMode={setMode} ref={ref} />;
      case "change-unit":
        return (
          <ChangeUnitView
            title={t("units.change-unit")}
            unit="volume"
            value={units.volume}
            option1="ml"
            option2="fl.oz"
            onChange={(val) =>
              setUnits({ ...units, volume: val as VolumeUnit })
            }
            description={t("units.change-volume-unit")}
            animatedTitleEntering={FadeInLeft.duration(100)}
          />
        );
      case "change-goal":
        return (
          <ChangeGoalView
            title={t("settings.goal.change-goal")}
            goal={dailyWaterGoal}
            value={dailyWaterGoal}
            option1="-"
            option2="+"
            increment={100}
            onChange={(val) => setdailyWaterGoal(Number(val))}
            description={t("settings.goal.change-water-goal-description")}
            min={0}
            max={6000} // 6L
            animatedTitleEntering={FadeInRight.duration(100)}
          />
        );
    }
  }

  return (
    <IBottomSheet ref={ref} onDismiss={() => setMode("custom")}>
      {viewMode()}
    </IBottomSheet>
  );
}
