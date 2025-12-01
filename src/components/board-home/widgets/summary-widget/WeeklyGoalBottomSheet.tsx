import { forwardRef } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useSettingsStore } from "../../../../stores/settings";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TextButton } from "../../../ui/buttons/TextButton";
import { Text } from "react-native";
import { TwoOptionStrobeButtons } from "../../../ui/buttons/TwoOptionStrobeButtons";
import { useTranslation } from "react-i18next";
import { useWorkoutStore } from "../../../../stores/workout";
import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { useWeeklyWorkoutGoal } from "../../../../features/workout/useWorkoutGoal";
import { ActiveSplitAlert } from "../../../ui/alerts/ActiveSplitAlert";
import { IText } from "../../../ui/text/IText";
import { MidText } from "../../../ui/text/MidText";
import { router } from "expo-router";
import { DescriptionText } from "../../../ui/text/DescriptionText";

export const WeeklyGoalBottomSheet = forwardRef<BottomSheetModal>(({}, ref) => {
  const { theme } = useSettingsStore();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { activeSplitPlan, updateWeeklyGoal } = useWorkoutStore();
  const { fullWidth } = useWidgetUnit();
  const goal = useWeeklyWorkoutGoal();
  const activeSplit = activeSplitPlan?.plan.id !== "no-split";

  function incrementGoal() {
    updateWeeklyGoal(goal + 1);
  }

  function decrementGoal() {
    if (goal > 1) updateWeeklyGoal(goal - 1);
  }

  function navigateToGoals() {
    router.push("/settings/goals");
    (ref as React.RefObject<BottomSheetModal>)?.current?.close();
  }

  return (
    <BottomSheetModal
      ref={ref}
      enablePanDownToClose
      enableDismissOnClose
      keyboardBehavior="fillParent"
      keyboardBlurBehavior="restore"
      handleIndicatorStyle={{ backgroundColor: theme.info }}
      backgroundStyle={{ backgroundColor: theme.navBackground }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="close"
          opacity={0.2}
        />
      )}
    >
      <BottomSheetView
        style={[
          {
            flex: 1,
            padding: 16,
            paddingVertical: 32,
            justifyContent: "flex-start",
            borderTopColor: theme.border,
            borderTopWidth: 1,
            paddingBottom: insets.bottom,
            alignItems: "center",
          },
        ]}
      >
        <IText text={t("splits.weekly-goal")} />

        <Text
          style={{
            fontSize: 52,
            fontWeight: "bold",
            color: theme.text,
          }}
        >
          {goal}
        </Text>
        <MidText
          text={goal === 1 ? t("splits.workout") : t("splits.workouts")}
          style={{ marginBottom: 16 }}
        />

        <ActiveSplitAlert style={{ marginBottom: 16, paddingHorizontal: 16 }} />
        <TwoOptionStrobeButtons
          haptics
          labelOne="-"
          labelTwo="+"
          styleOne={{ backgroundColor: theme.border }}
          styleTwo={{ backgroundColor: theme.border }}
          onOptionOne={decrementGoal}
          onOptionTwo={incrementGoal}
          width={fullWidth - 32}
          disabledOne={activeSplit || activeSplitPlan.plan.activeLength === 1}
          disabledTwo={activeSplit}
        />

        <DescriptionText
          text={t("splits.set-your-fitness-goals-description")}
          style={{
            margin: 8,
            marginHorizontal: 16,
            fontSize: 16,
            lineHeight: 18,
          }}
        />
        <TextButton
          title={t("splits.set-your-fitness-goals")}
          color={theme.accent}
          onPress={navigateToGoals}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
});
