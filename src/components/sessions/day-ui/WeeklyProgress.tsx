import React from "react";
import { WIDTH } from "../../../utils/Dimensions";
import { useSettingsStore } from "../../../stores/settings";
import { useSessionsByDateRange } from "../../../features/workout";
import { Text } from "react-native";
import { useDracoFont } from "../../../features/fonts/useDracoFont";
import { BounceButton } from "../../ui/buttons/BounceButton";

export function WeeklyProgress({ date }: { date: Date }) {
  const { theme } = useSettingsStore();
  const fontFamily = useDracoFont();

  const max = 5;

  // Calculate Monday of the current week
  const firstDayOfWeek = new Date(date);
  const dayOfWeek = date?.getDay(); // Sunday=0 ... Saturday=6
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  firstDayOfWeek.setDate(date.getDate() + diffToMonday);
  firstDayOfWeek.setHours(0, 0, 0, 0);

  // End day = the given date
  const thisDay = new Date(date);
  thisDay.setHours(23, 59, 59, 999);

  const sessionsThisWeek = useSessionsByDateRange(firstDayOfWeek, thisDay);

  const color =
    sessionsThisWeek.length == max
      ? theme.accent
      : sessionsThisWeek.length > max
      ? theme.fifthBackground
      : sessionsThisWeek.length
      ? theme.text
      : theme.handle;

  return (
    <BounceButton
      style={{
        width: WIDTH * 0.2,
        height: WIDTH * 0.2,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 48,
          color,
          fontWeight: "bold",
          textAlign: "center",
          ...fontFamily,
        }}
        adjustsFontSizeToFit
        numberOfLines={1}
      >
        {sessionsThisWeek.length}
        <Text
          style={{
            fontSize: 18,
            color: theme.text,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          /{max}
        </Text>
      </Text>
    </BounceButton>
  );
}
