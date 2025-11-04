import DraggableFlatList from "react-native-draggable-flatlist";
import { PlannedWorkoutCard } from "./cards/PlannedWorkoutCard";
import { SplitPlanDay, SplitPlanWorkout } from "../../stores/workout/types";
import { AddPlannedWorkoutCard } from "./cards/AddPlannedWorkoutCard";
import { useWorkoutStore } from "../../stores/workout";
import { useLocalSearchParams } from "expo-router";

interface PlannedWorkoutsListProps {
  day: SplitPlanDay;
  dayIndex: number;
  onReorder?: (workouts: SplitPlanWorkout[]) => void;
}

export function PlannedWorkoutsList({
  day,
  dayIndex,
  onReorder,
}: PlannedWorkoutsListProps) {
  const { splitId } = useLocalSearchParams<{ splitId: string }>();
  const reorderWorkoutsInDay = useWorkoutStore((s) => s.reorderWorkoutsInDay);

  const handleDragEnd = (data: SplitPlanWorkout[]) => {
    const newOrderIds = data.map((w) => w.id);
    reorderWorkoutsInDay(splitId, dayIndex, newOrderIds);
    onReorder?.(data);
  };

  const renderItem = ({ item, drag, isActive }: any) => (
    <PlannedWorkoutCard
      workout={item}
      day={day}
      dayIndex={dayIndex}
      onLongPressDrag={drag}
      isDragging={!!isActive}
    />
  );

  return (
    <DraggableFlatList
      scrollEnabled={false}
      data={day.workouts}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      onDragEnd={({ data }) => handleDragEnd(data)}
    />
  );
}
