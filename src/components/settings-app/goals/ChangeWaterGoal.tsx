import { useTranslation } from "react-i18next";
import { useWaterStore } from "../../../stores/water";
import { ChangeGoalView } from "../../ui/misc/ChangeGoalView";

export function ChangeWaterGoal() {
  const { t } = useTranslation();
  const { dailyWaterGoal } = useWaterStore();
  const { setdailyWaterGoal } = useWaterStore();

  return (
    <ChangeGoalView
      title={t("settings.goal.daily-water-goal")}
      goal={dailyWaterGoal}
      value={dailyWaterGoal}
      option1="-"
      option2="+"
      increment={100}
      onChange={(val) => setdailyWaterGoal(Number(val))}
      description={t("settings.goal.change-water-goal-description")}
      min={0}
      max={6000} // 6L
    />
  );
}
