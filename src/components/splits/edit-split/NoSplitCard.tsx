import { useSettingsStore } from "../../../stores/settings";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import { useWorkoutStore } from "../../../stores/workout";
import { TwoOptionStrobeButtons } from "../../ui/buttons/TwoOptionStrobeButtons";
import { InfoText } from "../../ui/text/InfoText";
import { TextButton } from "../../ui/buttons/TextButton";
import { useWeeklyWorkoutGoal } from "../../../features/workout/useWorkoutGoal";
import { useTranslation } from "react-i18next";
import { StrobeButton } from "../../ui/buttons/StrobeButton";
import { ActiveSplitAlert } from "../../ui/alerts/ActiveSplitAlert";
import { XLText } from "../../ui/text/XLText";
import { MidText } from "../../ui/text/MidText";
import { router } from "expo-router";

export function NoSplitCard() {
  const { theme } = useSettingsStore();
  const { fullWidth, widgetUnit } = useWidgetUnit();
  const { activeSplitPlan, updateWeeklyGoal } = useWorkoutStore();
  const { t } = useTranslation();

  const isActive = activeSplitPlan?.plan?.id === "no-split";

  const [expanded, setExpanded] = useState(false);
  const height = useSharedValue(widgetUnit);

  const goal = useWeeklyWorkoutGoal();

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  function toggleExpand() {
    if (!isActive) return; // 🚫 block toggle if inactive
    expanded ? collapse() : expand();
  }

  useEffect(() => {
    if (!isActive) collapse();
  }, [isActive]);

  function expand() {
    height.value = withTiming(fullWidth, { duration: 300 });
    setExpanded(true);
  }

  function collapse() {
    height.value = withTiming(widgetUnit, { duration: 300 });
    setExpanded(false);
  }

  function incrementGoal() {
    updateWeeklyGoal(goal + 1);
  }

  function decrementGoal() {
    if (goal > 1) updateWeeklyGoal(goal - 1);
  }

  function navigateToGoals() {
    router.replace("/settings/goals");
  }

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={[
        animatedStyle,
        {
          width: fullWidth,
          justifyContent: "center",
        },
      ]}
    >
      <StrobeButton
        onPress={toggleExpand}
        style={{
          height: "100%",
          width: fullWidth,
          backgroundColor: isActive ? theme.thirdBackground : theme.handle,
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: 32,
          opacity: isActive ? 1 : 0.7, // 🟣 subtle visual cue for inactive
        }}
        strobeDisabled={!isActive}
        pressable
      >
        {isActive && (
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={32}
            color={isActive ? theme.text : theme.grayText}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
            }}
          />
        )}

        <XLText text={t("splits.weekly-goal")} />

        {!expanded ? (
          <Animated.View entering={FadeIn} style={{ alignItems: "center" }}>
            <MidText
              text={`${goal} ${
                goal === 1 ? t("splits.workout") : t("splits.workouts")
              }`}
            />
            <ActiveSplitAlert
              style={{ marginBottom: 16, paddingHorizontal: 16 }}
            />
          </Animated.View>
        ) : (
          <Animated.View entering={FadeIn} style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 52,
                fontWeight: "bold",
                color: theme.text,
              }}
            >
              {goal}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                color: theme.text,
                marginBottom: 16,
              }}
            >
              {goal === 1 ? t("splits.workout") : t("splits.workouts")}
            </Text>

            <ActiveSplitAlert
              style={{ marginBottom: 16, paddingHorizontal: 16 }}
            />

            <TwoOptionStrobeButtons
              labelOne="-"
              labelTwo="+"
              styleOne={{ backgroundColor: theme.border }}
              styleTwo={{ backgroundColor: theme.border }}
              onOptionOne={decrementGoal}
              onOptionTwo={incrementGoal}
              width={fullWidth - 32}
              disabledOne={activeSplitPlan.plan.activeLength === 1}
              disabledStrobeOne={true}
              disabledStrobeTwo={true}
            />

            <InfoText
              text={t("splits.set-your-fitness-goals-description")}
              style={{
                margin: 8,
                marginHorizontal: 16,
                fontSize: 16,
                lineHeight: 18,
                color: theme.text,
              }}
            />

            <TextButton
              title={t("splits.set-your-fitness-goals")}
              color={theme.fifthBackground}
              onPress={navigateToGoals}
            />
          </Animated.View>
        )}
      </StrobeButton>
    </Animated.View>
  );
}
