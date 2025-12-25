import { HEIGHT, WIDTH } from "../../utils/Dimensions";
import { FlatList } from "react-native-gesture-handler";
import { SessionRecapCard } from "./cards/recap/SessionRecapCard";
import { useSessionsByDateRange } from "../../features/workout";
import { getWeekBounds } from "../../features/calendar/useWeeks";
import { EmptyHeader } from "../ui/containers/EmptyHeader";
import { memo } from "react";
import { IBubble } from "../ui/containers/IBubble";

interface WeekRecapScreenProps {
  week: Date[];
}

export const MemoizedWeekRecapScreen = memo(WeekRecapScreen);

export function WeekRecapScreen({ week }: WeekRecapScreenProps) {
  const { start, end } = getWeekBounds(week);
  const sessionsThisWeek = useSessionsByDateRange(start, end);

  return (
    <IBubble width={WIDTH} height={HEIGHT} noBorder>
      <EmptyHeader />
      <EmptyHeader />
      <FlatList
        data={sessionsThisWeek ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SessionRecapCard session={item} />}
        contentContainerStyle={{
          width: WIDTH,
          gap: 8,
          alignItems: "center",
        }}
        scrollEnabled={false}
      />
    </IBubble>
  );
}
