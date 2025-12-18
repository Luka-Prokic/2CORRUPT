import { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  useSettingsStore,
  VolumeUnit,
} from "../../../../../../stores/settingsStore";
import { IBottomSheet } from "../../../../../ui/IBottomSheet";
import { useState } from "react";
import { ChangeUnitView } from "../../../../../ui/misc/ChangeUnitView";
import { CustomWaterAddView } from "./CustomWaterAddView";
import { useTranslation } from "react-i18next";
import { WaterBottomSheetHeader } from "./WaterBottomSheetHeader";
import { ChangeWaterGoal } from "../../../../../settings-app/goals/ChangeWaterGoal";

export type WaterBottomSheetMode = "custom" | "unit" | "goal";
interface WaterBottomSheetProps {
  ref: React.RefObject<BottomSheetModal>;
}

export function WaterBottomSheet({ ref }: WaterBottomSheetProps) {
  const { t } = useTranslation();
  const { units, setUnits } = useSettingsStore();
  const [mode, setMode] = useState<WaterBottomSheetMode>("custom");

  function viewMode() {
    switch (mode) {
      case "custom":
        return <CustomWaterAddView ref={ref} />;
      case "goal":
        return <ChangeWaterGoal />;
      case "unit":
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
          />
        );
    }
  }

  return (
    <IBottomSheet ref={ref} onDismiss={() => setMode("custom")}>
      <WaterBottomSheetHeader mode={mode} setMode={setMode} />
      {viewMode()}
    </IBottomSheet>
  );
}
