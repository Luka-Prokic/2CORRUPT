import { View } from "react-native";
import { IText } from "../../ui/text/IText";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useWeeklyWorkoutGoal } from "../../../features/workout/useWorkoutGoal";
import { MidText } from "../../ui/text/MidText";
import { ActiveSplitAlert } from "../../ui/alerts/ActiveSplitAlert";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { TwoOptionStrobeButtons } from "../../ui/buttons/TwoOptionStrobeButtons";
import { useWorkoutStore } from "../../../stores/workout";
import { DescriptionText } from "../../ui/text/DescriptionText";

interface WeeklyWorkoutGoalProps {
  description?: string;
}

export function WeeklyWorkoutGoal({ description }: WeeklyWorkoutGoalProps) {
  const { t } = useTranslation();
  const { fullWidth } = useWidgetUnit();
  const { theme } = useSettingsStore();
  const goal = useWeeklyWorkoutGoal();
  const { activeSplitPlan, updateWeeklyGoal } = useWorkoutStore();

  const activeSplit = activeSplitPlan?.plan.id !== "no-split";

  function incrementGoal() {
    updateWeeklyGoal(goal + 1);
  }

  function decrementGoal() {
    if (goal > 1) updateWeeklyGoal(goal - 1);
  }

  return (
    <View style={{ gap: 16, alignItems: "center" }}>
      <IText text={t("splits.weekly-goal")} />

      <IText text={goal.toString()} color={theme.accent} size={52} />

      <MidText
        text={goal === 1 ? t("splits.workout") : t("splits.workouts")}
        style={{ marginBottom: 16 }}
      />

      <ActiveSplitAlert style={{ marginBottom: 16, paddingHorizontal: 16 }} />
      <TwoOptionStrobeButtons
        labelOne="-"
        labelTwo="+"
        styleOne={{ backgroundColor: theme.border }}
        styleTwo={{ backgroundColor: theme.border }}
        onOptionOne={decrementGoal}
        onOptionTwo={incrementGoal}
        width={fullWidth - 32}
        disabledOne={activeSplit || activeSplitPlan.plan.activeLength === 1}
        disabledTwo={activeSplit}
        haptics
      />

      {description && <DescriptionText text={description} />}
    </View>
  );
}
