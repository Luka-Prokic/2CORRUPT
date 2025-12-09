import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { StrobeButton } from "../../ui/buttons/StrobeButton";
import { useSettingsStore } from "../../../stores/settings";
import { useFindPlannedWorkout } from "../../../features/find/useFindPlannedWorkout";
import { IText } from "../../ui/text/IText";
import { useWorkoutStore } from "../../../stores/workout";
import { useStartWorkoutOfTemplate } from "../../../features/start/useStartWorkout";

interface PlannedWorkoutByDateCardProps {
  date: Date;
}

export function PlannedWorkoutByDateCard({
  date,
}: PlannedWorkoutByDateCardProps) {
  const { fullWidth, widgetUnit } = useWidgetUnit();
  const { theme } = useSettingsStore();
  const { getTemplateById } = useWorkoutStore();

  const plannedWorkout = useFindPlannedWorkout(date);
  if (!plannedWorkout) return null;
  const template = getTemplateById(plannedWorkout.templateId);
  if (!template) return null;

  const startWorkout = useStartWorkoutOfTemplate(template.id);

  return (
    <StrobeButton
      style={{
        height: widgetUnit,
        width: fullWidth,
        backgroundColor: theme.background,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: theme.thirdBackground + "40",
      }}
      styleContent={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onPress={startWorkout}
    >
      <IText text={template.name} color={theme.text} />
    </StrobeButton>
  );
}
