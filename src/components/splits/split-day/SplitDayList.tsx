import { FlatList } from "react-native";
import { SplitPlan, SplitPlanDay } from "../../../stores/workout";
import { AddSplitDayCard } from "./AddSplitDayCard";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { SplitDayCard } from "./card/SplitDayCard";
import { CardSlider } from "../../ui/sliders/CardSlider";
import { WIDTH } from "../../../utils/Dimensions";

interface SplitDayListProps {
  split: SplitPlan;
  isGridView: boolean;
}
export function SplitDayList({ split, isGridView }: SplitDayListProps) {
  const { widgetUnit, fullWidth } = useWidgetUnit();

  if (isGridView)
    return (
      <FlatList
        data={[...split.split, { isAddCard: true }]}
        numColumns={2}
        scrollEnabled={false}
        keyExtractor={(item, index) =>
          (item as any).isAddCard ? `add-${index}` : `${item}-${index}`
        }
        renderItem={({ item, index }) => {
          if ((item as any).isAddCard) {
            return (
              <AddSplitDayCard
                split={split}
                style={{ height: widgetUnit, width: widgetUnit }}
                isGridView={isGridView}
              />
            );
          }

          return (
            <SplitDayCard
              split={split}
              day={item as SplitPlanDay}
              style={{ height: widgetUnit, width: widgetUnit }}
              index={index}
              isGridView={isGridView}
            />
          );
        }}
        columnWrapperStyle={{
          justifyContent: "space-between",
          gap: 8,
        }}
        contentContainerStyle={{
          gap: 8,
          paddingBottom: 8,
          width: fullWidth,
        }}
      />
    );

  return (
    <CardSlider
      data={split.split}
      card={({ item, index }) => (
        <SplitDayCard
          split={split}
          day={item}
          index={index}
          style={{ height: fullWidth, width: fullWidth }}
          isGridView={isGridView}
        />
      )}
      cardWidth={WIDTH}
      cardHeight={fullWidth}
      sliderWidth={WIDTH}
      styleSlider={{ width: WIDTH, height: fullWidth }}
      lastCard={
        <AddSplitDayCard
          split={split}
          style={{ height: fullWidth, width: fullWidth }}
        />
      }
      maxDotsShown={Math.min(15, split.split.length + 1)}
    />
  );
}
