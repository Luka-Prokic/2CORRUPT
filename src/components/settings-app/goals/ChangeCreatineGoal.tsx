import { useTranslation } from "react-i18next";
import { ChangeGoalView } from "../../ui/misc/ChangeGoalView";
import { useCreatineStore } from "../../../stores/creatine";

export function ChangeCreatineGoal() {
  const { t } = useTranslation();
  const { dailyCreatineGoal, setDailyCreatineGoal } = useCreatineStore();

  return (
    <ChangeGoalView
      title={t("settings.goal.daily-creatine-goal")}
      goal={dailyCreatineGoal}
      value={dailyCreatineGoal}
      option1="-"
      option2="+"
      increment={1}
      onChange={(val) => setDailyCreatineGoal(Number(val))}
      description={t("settings.goal.change-creatine-goal-description")}
      min={0}
      max={100} // 100g
      unit={"g"}
    />
  );
}
