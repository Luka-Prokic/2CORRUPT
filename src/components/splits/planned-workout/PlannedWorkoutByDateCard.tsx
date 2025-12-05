import { router } from "expo-router";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";
import { StrobeButton } from "../ui/buttons/StrobeButton";
import { useSettingsStore } from "../../stores/settings";
import { useFindPlannedWorkout } from "../../features/find/useFindPlannedWorkout";
import { IText } from "../ui/text/IText";
import { useWorkoutStore } from "../../stores/workout";
import { useUIStore } from "../../stores/ui";

interface PlannedWorkoutByDateCardProps {
  date: Date;
}

export function PlannedWorkoutByDateCard({
  date,
}: PlannedWorkoutByDateCardProps) {
  const { fullWidth, widgetUnit } = useWidgetUnit();
  const { theme } = useSettingsStore();
  const { getTemplateById, startSession } = useWorkoutStore();
  const { setTypeOfView } = useUIStore();

  const plannedWorkout = useFindPlannedWorkout(date);
  if (!plannedWorkout) return null;
  const template = getTemplateById(plannedWorkout.templateId);
  if (!template) return null;

  function handlePress() {
    router.dismissTo("/");
    setTypeOfView("workout");
    startSession(template);
  }

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
      onPress={handlePress}
    >
     
      <IText text={template.name} color={theme.text} />
    </StrobeButton>
  );
}
