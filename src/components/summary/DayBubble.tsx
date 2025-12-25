import { useSettingsStore } from "../../stores/settingsStore";
import { LinearGradient } from "expo-linear-gradient";
import {
  getDayIndex,
  isFutureDate,
  isSameDay,
} from "../../features/calendar/useDate";
import { useDayLabels } from "../../utils/Labels";
import { IText } from "../ui/text/IText";
import { IBubble } from "../ui/containers/IBubble";
import { hexToRGBA } from "../../utils/HEXtoRGB";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";

interface DayBubbleProps {
  day: Date;
  height: number;
  width: number;
}

export function DayBubble({ day, height, width }: DayBubbleProps) {
  const { theme } = useSettingsStore();
  const { halfWidget } = useWidgetUnit();
  const dayIndex = getDayIndex(day);
  const dayLabels = useDayLabels();
  const isToday = isSameDay(day, new Date());
  const isFuture = isFutureDate(day);

  return (
    <LinearGradient
      style={{
        height: height,
        width: width,
        justifyContent: "center",
        alignItems: "center",
      }}
      colors={[theme.background, theme.background + "00"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <IBubble
        height={halfWidget - 16}
        width={halfWidget - 16}
        shineColor={theme.text}
        style={{
          borderRadius: (halfWidget - 16) / 2,
          backgroundColor: isFuture
            ? hexToRGBA(theme.fifthAccent, 0.2)
            : hexToRGBA(theme.fifthAccent, 0.8),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IText
          text={dayLabels[dayIndex]}
          color={isFuture ? theme.handle : theme.text}
        />
      </IBubble>
    </LinearGradient>
  );
}
