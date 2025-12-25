import { HEIGHT, WIDTH } from "../../utils/Dimensions";
import { FlatList } from "react-native-gesture-handler";
import { memo, useMemo } from "react";
import { IBubble } from "../ui/containers/IBubble";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";
import { DayRecapList } from "./DayRecapList";
import { useSettingsStore } from "../../stores/settingsStore";
import { DayBubble } from "./DayBubble";

interface WeekRecapScreenProps {
  week: Date[];
}

export const MemoizedWeekRecapScreen = memo(WeekRecapScreen);

export function WeekRecapScreen({ week }: WeekRecapScreenProps) {
  const inserts = useSafeAreaInsets();
  const { halfWidget } = useWidgetUnit();
  const { theme } = useSettingsStore();

  const height = HEIGHT - inserts.top * 2 - inserts.bottom;

  const data = useMemo(() => [...week].toReversed(), [week]);

  return (
    <IBubble
      width={WIDTH}
      height={HEIGHT}
      noBorder
      backgroundColor={theme.background}
      shineColor={theme.background}
      styleContent={{
        flexDirection: "row",
        alignItems: "flex-end",
        paddingBottom: inserts.bottom,
      }}
    >
      <FlatList
        data={data ?? []}
        scrollEnabled={false}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <DayBubble day={item} height={height / 7} width={halfWidget} />
        )}
        contentContainerStyle={{
          width: halfWidget,
          height: height,
        }}
        style={{
          position: "absolute",
          left: 0,
          bottom: inserts.bottom,
          zIndex: 1,
        }}
      />
      <FlatList
        data={data ?? []}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <DayRecapList day={item} height={height / 7} />
        )}
        contentContainerStyle={{
          width: WIDTH,
          height: height,
        }}
        scrollEnabled={false}
      />
    </IBubble>
  );
}
