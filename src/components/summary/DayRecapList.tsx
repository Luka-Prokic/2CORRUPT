import { SessionRecapCard } from "./cards/recap/SessionRecapCard";
import { useSessionsByDate } from "../../features/workout/useSessionHistory";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";
import { CenterCardSlider } from "../ui/sliders/CenterCardSlider";
import { View } from "react-native";
import { WIDTH } from "../../utils/Dimensions";

interface DayRecapListProps {
  day: Date;
  height: number;
}
export function DayRecapList({ day, height }: DayRecapListProps) {
  const { halfWidget, widgetUnit } = useWidgetUnit();
  const sessionsThisDay = useSessionsByDate(day);

  return (
    <View
      style={{ height: height, justifyContent: "center", alignItems: "center" }}
    >
      <CenterCardSlider
        data={sessionsThisDay}
        cardWidth={widgetUnit}
        cardHeight={halfWidget}
        sliderWidth={WIDTH}
        paddingStart={halfWidget}
        hideDots
        animationType="flat"
        card={({ item }) => <SessionRecapCard session={item} />}
      />
    </View>
  );
}
