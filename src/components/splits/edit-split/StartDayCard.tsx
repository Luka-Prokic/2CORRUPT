import { SplitPlanDay } from "../../../stores/workout";
import { StrobeButton } from "../../ui/buttons/StrobeButton";
import { useSettingsStore } from "../../../stores/settingsStore";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useWorkoutStore } from "../../../stores/workout";

interface StartDayCardProps {
  day: SplitPlanDay;
  setSelectingStartDay: (value: boolean) => void;
  width: number;
  height: number;
  dayIndex: number;
}
export function StartDayCard({
  day,
  setSelectingStartDay,
  width,
  height,
  dayIndex,
}: StartDayCardProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { activeSplitPlan, updateActiveSplitStartDay } = useWorkoutStore();

  const isActiveDay = activeSplitPlan?.startDay === dayIndex;

  function handlePress() {
    updateActiveSplitStartDay(dayIndex);
    setSelectingStartDay(false);
  }

  return (
    <StrobeButton
      onPress={handlePress}
      strobeDisabled={day.isRest}
      style={{
        height: height,
        width: width,
        backgroundColor: day.isRest
          ? theme.handle // rest day color
          : theme.thirdBackground, // normal day
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 32,
        borderWidth: 1,
        borderColor: isActiveDay
          ? theme.tint
          : day.isRest
          ? theme.handle
          : theme.thirdBackground,
      }}
    >
      <Text
        style={{
          color: day.isRest ? theme.info : theme.text,
          fontSize: 22,
          fontWeight: "bold",
        }}
      >
        {isActiveDay && `★ `}
        {`${t("splits.day")} ${dayIndex + 1}`}
      </Text>
    </StrobeButton>
  );
}
