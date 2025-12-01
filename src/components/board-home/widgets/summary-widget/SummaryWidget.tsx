import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../stores/settings";
import { hexToRGBA } from "../../../../features/HEXtoRGB";
import { SummaryHeader } from "./SummaryHeader";
import { SummaryFooter } from "./SummaryFooter";
import { ProgressRing } from "../../../ui/misc/ProgressRing";
import { BounceButton } from "../../../ui/buttons/BounceButton";
import { Text } from "react-native";
import { useDracoFont } from "../../../../features/fonts/useDracoFont";
import { useSessionsByDateRange } from "../../../../features/workout";
import { SummaryWeek } from "./SummaryWeek";
import { useWeeklyWorkoutGoal } from "../../../../features/workout/useWorkoutGoal";
import { WeeklyGoalBottomSheet } from "./WeeklyGoalBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useRef } from "react";

export function SummaryWidget() {
  const { widgetUnit } = useWidgetUnit();
  const { theme } = useSettingsStore();
  const { fontFamily } = useDracoFont();
  const weeklyGoalBottomSheetRef = useRef<BottomSheetModal>(null);

  const today = new Date();

  const goal = useWeeklyWorkoutGoal();

  // Get Monday of current week
  const firstDayOfWeek = new Date(today);
  const dayOfWeek = today.getDay(); // Sunday=0 ... Saturday=6
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  firstDayOfWeek.setDate(today.getDate() + diffToMonday);
  firstDayOfWeek.setHours(0, 0, 0, 0);

  // Get Sunday (end of week)
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
  lastDayOfWeek.setHours(23, 59, 59, 999);

  const sessionsThisWeek = useSessionsByDateRange(
    firstDayOfWeek,
    lastDayOfWeek
  );

  function handleWidgetPress() {
    router.push("/summary");
  }

  const presentModal = useCallback(() => {
    weeklyGoalBottomSheetRef.current?.present();
  }, []);

  return (
    <TouchableOpacity
      onPress={handleWidgetPress}
      style={{
        width: widgetUnit,
        height: widgetUnit,
        borderRadius: 32,
        backgroundColor: hexToRGBA(theme.thirdBackground, 0.6),
        borderWidth: 1,
        borderColor: hexToRGBA(theme.thirdBackground, 0.4),
        padding: 4,
        marginBottom: 8,
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <SummaryHeader />
      <ProgressRing
        key={`${goal}-${sessionsThisWeek.length}`}
        compareWith={sessionsThisWeek.length}
        compareTo={goal}
        content={
          <BounceButton
            onPress={presentModal}
            style={{
              backgroundColor: "transaprent",
            }}
          >
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
