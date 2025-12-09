import { useSettingsStore } from "../../../stores/settingsStore";
import { SplitPlan } from "../../../stores/workout/types";
import { TextButton } from "../../ui/buttons/TextButton";
import { useTranslation } from "react-i18next";
import { useWorkoutStore } from "../../../stores/workout";

interface SplitActiveTitleProps {
  split: SplitPlan;
}
export function SplitActiveTitle({ split }: SplitActiveTitleProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { activeSplitPlan, endActiveSplitPlan, setActiveSplitPlan } =
    useWorkoutStore();
  const isActive = activeSplitPlan?.plan.id === split.id;

  function handlePress() {
    if (isActive) {
      endActiveSplitPlan();
    } else {
      setActiveSplitPlan(split, 0);
    }
  }

  return (
    <TextButton
      text={isActive ? t("button.active") : t("button.activate")}
      onPress={handlePress}
      color={isActive ? theme.fifthBackground : theme.handle}
    />
  );
}
