import { VolumeUnit } from "../../../stores/settingsStore";
import { ChangeUnitView } from "../../ui/misc/ChangeUnitView";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useTranslation } from "react-i18next";

export function ChangeVolumeUnit() {
  const { units, setUnits } = useSettingsStore();
  const { t } = useTranslation();

  return (
    <ChangeUnitView
      unit="volume"
      value={units.volume}
      option1="ml"
      option2="fl.oz"
      onChange={(val) => setUnits({ ...units, volume: val as VolumeUnit })}
      description={t("units.change-volume-unit")}
    />
  );
}
