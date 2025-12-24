import { HEIGHT, WIDTH } from "../../utils/Dimensions";
import { FlatList } from "react-native-gesture-handler";
import { SessionRecapCard } from "./cards/recap/SessionRecapCard";
import { useSessionsByDateRange } from "../../features/workout";
import { getWeekBounds } from "../../features/calendar/useWeeks";
import { EmptyHeader } from "../ui/containers/EmptyHeader";
import { View } from "react-native";
import { useSettingsStore } from "../../stores/settings";
import { hexToRGBA } from "../../utils/HEXtoRGB";

interface WeekRecapScreenProps {
  week: Date[];
}

export function WeekRecapScreen({ week }: WeekRecapScreenProps) {
  const { theme } = useSettingsStore();
  const { start, end } = getWeekBounds(week);
  const sessionsThisWeek = useSessionsByDateRange(start, end);

  const opacity = Math.random();

  return (
    <View
      style={{
        backgroundColor: hexToRGBA(theme.text, opacity),
        height: HEIGHT,
      }}
    >
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
    </View>
  );
}
