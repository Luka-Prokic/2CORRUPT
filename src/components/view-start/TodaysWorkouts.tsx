import { useWorkoutStore } from "../../stores/workout";
import { useFindPlannedWorkouts } from "../../features/find/useFindPlannedWorkout";
import { PlannedActiveSplitWorkoutCard } from "../splits/PlannedActiveSplitWorkoutCard";
import { CardFlatList } from "../ui/sliders/CardFlatList";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";

export function TodaysWorkouts() {
  const { activeSplitPlan } = useWorkoutStore();
  const { widgetUnit } = useWidgetUnit();

  const workouts = useFindPlannedWorkouts(new Date());
  if (!workouts) return null;
  if (!activeSplitPlan) return null;
  return (
    <CardFlatList
      data={workouts}
      contentContainerStyle={{ height: widgetUnit }}
      snapToInterval={widgetUnit}
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      renderItem={({ item }) => (
        <PlannedActiveSplitWorkoutCard
          key={item.id}
          splitPlan={activeSplitPlan.plan}
          workout={item}
          date={new Date()}
        />
      )}
    />
  );
}
