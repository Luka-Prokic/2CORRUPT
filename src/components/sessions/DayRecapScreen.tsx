import { WIDTH } from "../../features/Dimensions";
import { useSessionsByDate } from "../../features/workout";
import { FlatList } from "react-native-gesture-handler";
import { SessionRecapCard } from "./cards/recap/SessionRecapCard";
import { ScreenContent } from "../ui/utils/ScreenContent";
import { useCalendarNavigation } from "../../features/test/useCalendarNavigation";
import { EmptyFooter } from "../ui/containers/EmptyFooter";
import { StaticDailyActivityBar } from "./day-activity-bar/StaticDailyActivityBar";
import { DaySummary } from "./day-ui/DaySummary";
import { SummaryEmptyHeader } from "./header/SummaryEmptyHeader";

interface DayRecapScreenProps {
  date: Date;
}

export function DayRecapScreen({ date }: DayRecapScreenProps) {
  const sessionsOnThisDate = useSessionsByDate(date);
  const { isFutureDate } = useCalendarNavigation();

  if (isFutureDate(date)) return null;
  return (
    <ScreenContent>
      <SummaryEmptyHeader />
      <DaySummary date={date} />

      <StaticDailyActivityBar date={date} />

      <FlatList
        data={sessionsOnThisDate ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SessionRecapCard session={item} />}
        contentContainerStyle={{ width: WIDTH, gap: 8 }}
        ListFooterComponent={() => <EmptyFooter />}
        scrollEnabled={false}
      />
    </ScreenContent>
  );
}
