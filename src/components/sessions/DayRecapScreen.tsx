import { WIDTH } from "../../utils/Dimensions";
import { useSessionsByDate } from "../../features/workout";
import { FlatList } from "react-native-gesture-handler";
import { SessionRecapCard } from "./cards/recap/SessionRecapCard";
import { ScreenContent } from "../ui/utils/ScreenContent";
import { EmptyFooter } from "../ui/containers/EmptyFooter";
import { DaySummary } from "./day-ui/DaySummary";
import { SummaryEmptyHeader } from "./header/SummaryEmptyHeader";
import { isFutureDate } from "../../features/calendar/useDate";
import { useUIStore } from "../../stores/ui/useUIStore";
import { ExpandedSessionRecap } from "./cards/recap/ExpandedSessionRecap";

interface DayRecapScreenProps {
  date: Date;
}

export function DayRecapScreen({ date }: DayRecapScreenProps) {
  const sessionsOnThisDate = useSessionsByDate(date);
  const { isExpanded } = useUIStore();

  if (isFutureDate(date)) return null;
  return (
    <ScreenContent>
      <SummaryEmptyHeader />
      <DaySummary date={date} />

      <FlatList
        data={sessionsOnThisDate ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          isExpanded ? (
            <ExpandedSessionRecap session={item} />
          ) : (
            <SessionRecapCard session={item} />
          )
        }
        contentContainerStyle={{ width: WIDTH, gap: 8, alignItems: "center" }}
        ListFooterComponent={() => <EmptyFooter />}
        scrollEnabled={false}
      />
    </ScreenContent>
  );
}
