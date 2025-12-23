import { useTranslation } from "react-i18next";
import { useWaterStore } from "../../../stores/water";
import { ChangeGoalView } from "../../ui/misc/ChangeGoalView";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useDisplayedUnits } from "../../../features/translate/useDisplayedUnits";
import { WIDTH } from "../../../utils/Dimensions";
import { IBubble } from "../../ui/containers/IBubble";

export function ChangeWaterGoal() {
  const { t } = useTranslation();
  const { dailyWaterGoal, setDailyWaterGoal } = useWaterStore();
  const { units } = useSettingsStore();
  const { fromMl, toMl } = useDisplayedUnits();

  return (
    <ChangeGoalView
      title={t("settings.goal.daily-water-goal")}
      titleStyle={{ width: WIDTH - 64 }}
      goal={Number(fromMl(dailyWaterGoal))}
      value={Number(fromMl(dailyWaterGoal))}
      option1="-"
      option2="+"
      increment={Number(fromMl(100))}
      onChange={(val) => setDailyWaterGoal(toMl(val))}
      description={t("settings.goal.change-water-goal-description")}
      min={0}
      max={6000} // 6L
      unit={units.volume}
    />
  );
}

export function ChangeWaterGoalBubble() {
  return (
    <IBubble size="flexible" style={{ padding: 16 }}>
      <ChangeWaterGoal />
    </IBubble>
  );
}
