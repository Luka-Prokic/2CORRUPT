import { Text, View } from "react-native";
import { useSettingsStore } from "../../../../stores/settings";
import { useMonthSlugs } from "../../../../features/Labels";

export function SummaryWeek() {
  const { theme } = useSettingsStore();
  const monthSlugs = useMonthSlugs();

  const today = new Date();
  const todayMonth = today?.getMonth();

  const first = new Date(today);
  const dayOfWeek = today.getDay(); // Sunday = 0, Monday = 1, ...
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  first.setDate(today.getDate() + diffToMonday);

  // Get the last day (Sunday) of the current week
  const last = new Date(first);
  last.setDate(first.getDate() + 6);

  // Extract day numbers
  const startDay = first.getDate();
  const endDay = last.getDate();

  // Result strings
  const weekRange = `${startDay}-${endDay}`;

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: theme.text,
          fontSize: 22,
          fontWeight: "bold",
        }}
        adjustsFontSizeToFit
        numberOfLines={1}
        minimumFontScale={0.5}
      >
        {weekRange}
      </Text>
      <Text
        style={{
          color: theme.tint,
          fontSize: 16,
          marginTop: 2,
          fontWeight: "bold",
        }}
      >
        {monthSlugs[todayMonth]}
      </Text>
    </View>
  );
}
