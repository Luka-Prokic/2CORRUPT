import { Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { WIDTH } from "../../features/Dimensions";
import { useSettingsStore } from "../../stores/settings";
import { useSessionsByDate } from "../../features/workout";

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
        paddingVertical: 20,
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
        {sessionsOnThisDate.length} Sessions done
      </Text>
    </View>
  );
}
