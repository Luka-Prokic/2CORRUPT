import { useCreatineStore } from "../../../stores/creatine/useCreatineStore";
import { ChangeGoalView } from "../../ui/misc/ChangeGoalView";
import { useTranslation } from "react-i18next";
import { IBubble } from "../../ui/containers/IBubble";

const FREQUENCY_OPTIONS = ["1", "2", "3", "4"];

export function ChangeCreatineFrequency() {
  const { timesADay, setTimesADay } = useCreatineStore();
  const { t } = useTranslation();

  return (
    <ChangeGoalView
      title={t("settings.goal.creatine-frequency-title")}
      goal={timesADay}
      value={timesADay}
      options={FREQUENCY_OPTIONS}
      onChange={(option) => {
        setTimesADay(Number(option));
      }}
      min={1}
      max={4}
      unit={t("settings.goal.creatine-frequency-unit")}
      description={t("settings.goal.creatine-frequency-description")}
    />
  );
}

export function ChangeCreatineFrequencyBubble() {
  return (
    <IBubble size="flexible" style={{ padding: 16 }}>
      <ChangeCreatineFrequency />
    </IBubble>
  );
}
