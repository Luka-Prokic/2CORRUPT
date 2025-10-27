import { Text, View } from "react-native";
import { WIDTH } from "../../features/Dimensions";
import { useSettingsStore } from "../../stores/settings";
import { useSessionsByDate } from "../../features/workout";
import { FlatList } from "react-native-gesture-handler";
import { SessionRecapCard } from "./cards/SessionRecapCard";

interface DayRecapScreenProps {
  date: Date;
}

export function DayRecapScreen({ date }: DayRecapScreenProps) {
  const { theme } = useSettingsStore();
  const isToday = date.toDateString() === new Date().toDateString();
  const sessionsOnThisDate = useSessionsByDate(date);

  return (
    <View
      style={{
        width: WIDTH,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 16,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "500",
          textAlign: "center",
          color: isToday ? theme.tint : theme.text,
          marginBottom: 20,
        }}
      >
        {sessionsOnThisDate?.length ?? 0} Sessions done
      </Text>
      <FlatList
        data={sessionsOnThisDate ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SessionRecapCard session={item} />}
        contentContainerStyle={{ width: WIDTH, padding: 16, gap: 8 }}
        scrollEnabled={false}
      />
    </View>
  );
}
