import {
  SplitPlan,
  SplitPlanDay,
  WorkoutTemplate,
} from "../../../stores/workout";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FlatList } from "react-native";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { SplitDayButton } from "./SplitDayButton";
import { useWorkoutStore } from "../../../stores/workout";
import { useTranslation } from "react-i18next";
import { InfoText } from "../../ui/text/InfoText";
import { HEIGHT } from "../../../utils/Dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SplitDaysViewProps {
  split: SplitPlan;
  templates: WorkoutTemplate[];
  ref: React.RefObject<BottomSheetModal>;
}

export function SplitDaysView({ split, templates, ref }: SplitDaysViewProps) {
  const { widgetUnit, fullWidth } = useWidgetUnit();
  const { addWorkoutToDay } = useWorkoutStore();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  function handlePressDay(dayIndex: number) {
    templates.forEach((template) => {
      addWorkoutToDay(split.id, dayIndex, template.id);
    });
    ref.current?.close();
  }

  return (
    <FlatList
      data={split.split}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
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
      style={{ maxHeight: HEIGHT - insets.top - insets.bottom - 160 }}
      ListFooterComponent={
        <InfoText
          text={t("splits.click-day-to-add-workouts")}
          style={{ marginVertical: 16 }}
        />
      }
    />
  );
}
