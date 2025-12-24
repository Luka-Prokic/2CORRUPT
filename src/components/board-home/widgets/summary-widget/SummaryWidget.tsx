import { router } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useRef } from "react";

import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../stores/settings";
import { useDracoFont } from "../../../../features/fonts/useDracoFont";
import { useSessionsByDateRange } from "../../../../features/workout";
import { useWeeklyWorkoutGoal } from "../../../../features/workout/useWorkoutGoal";

import { hexToRGBA } from "../../../../utils/HEXtoRGB";
import { SummaryHeader } from "./SummaryHeader";
import { SummaryFooter } from "./SummaryFooter";
import { SummaryWeek } from "./SummaryWeek";
import { WeeklyGoalBottomSheet } from "./WeeklyGoalBottomSheet";

import { ProgressRing } from "../../../ui/misc/ProgressRing";
import { BounceButton } from "../../../ui/buttons/BounceButton";
import { Shine } from "../../../ui/misc/Shine";
import {
  useCurrentWeek,
  getWeekBounds,
} from "../../../../features/calendar/useWeeks";

export function SummaryWidget() {
  const { widgetUnit } = useWidgetUnit();
  const { theme } = useSettingsStore();
  const { fontFamily } = useDracoFont();

  const weeklyGoalBottomSheetRef = useRef<BottomSheetModal>(null);

  const goal = useWeeklyWorkoutGoal();

  const currentWeek = useCurrentWeek();

  const { start, end } = getWeekBounds(currentWeek);

  const sessionsThisWeek = useSessionsByDateRange(start, end);

  const presentModal = useCallback(() => {
    weeklyGoalBottomSheetRef.current?.present();
  }, []);

  function handleWidgetPress() {
    router.push("/summary");
  }

  return (
    <TouchableOpacity
      onPress={handleWidgetPress}
      style={{
        width: widgetUnit,
        height: widgetUnit,
        borderRadius: 32,
        backgroundColor: hexToRGBA(theme.thirdAccent, 0.6),
        borderWidth: 1,
        borderColor: hexToRGBA(theme.thirdAccent, 0.4),
        padding: 4,
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <Shine />

      <SummaryHeader />

      <ProgressRing
        key={`${goal}-${sessionsThisWeek.length}`}
        compareWith={sessionsThisWeek.length}
        compareTo={goal}
        color={theme.thirdAccent}
        loopColor={theme.secondaryAccent}
        content={
          <BounceButton onPress={presentModal}>
            <Text
              style={{
                fontSize: 48,
                fontWeight: "bold",
                color: theme.text,
                fontFamily,
              }}
              adjustsFontSizeToFit
              numberOfLines={1}
              minimumFontScale={0.5}
            >
              {sessionsThisWeek.length}
            </Text>
          </BounceButton>
        }
      />

      <SummaryWeek />
      <SummaryFooter />

      <WeeklyGoalBottomSheet ref={weeklyGoalBottomSheetRef} />
    </TouchableOpacity>
  );
}
