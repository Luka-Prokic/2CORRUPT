import { forwardRef } from "react";
import {
  SplitPlan,
  SplitPlanDay,
  WorkoutTemplate,
} from "../../../stores/workout";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FlatList } from "react-native";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { SplitDayButton } from "./SplitDayButton";
import { EmptyFooter } from "../../ui/containers/EmptyFooter";
import { useWorkoutStore } from "../../../stores/workout";

interface SplitDaysViewProps {
  split: SplitPlan;
  templates: WorkoutTemplate[];
}

export const SplitDaysView = forwardRef<BottomSheetModal, SplitDaysViewProps>(
  ({ split, templates }, ref) => {
    const { widgetUnit, fullWidth } = useWidgetUnit();
    const { addWorkoutToDay } = useWorkoutStore();

    function handlePressDay(dayIndex: number) {
      templates.forEach((template) => {
        addWorkoutToDay(split.id, dayIndex, template.id);
      });
      (ref as React.RefObject<BottomSheetModal>)?.current?.close();
    }

    return (
      <FlatList
        data={split.split}
        numColumns={2}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <SplitDayButton
            split={split}
            day={item as SplitPlanDay}
            style={{
              height: widgetUnit,
              width: widgetUnit,
              opacity: item.isRest ? 0.4 : 1,
            }}
            index={index}
            onPress={() => handlePressDay(index)}
            disabled={item.isRest}
          />
        )}
        columnWrapperStyle={{
          justifyContent: "space-between",
          gap: 8,
        }}
        contentContainerStyle={{
          gap: 8,
          paddingBottom: 8,
          width: fullWidth,
        }}
        ListFooterComponent={<EmptyFooter />}
      />
    );
  }
);
