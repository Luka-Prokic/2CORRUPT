import { useWorkoutStore } from "../../stores/workout";
import {
  useFindPlannedWorkouts,
  useFindPlannedWorkoutIndexNow,
} from "../../features/find/useFindPlannedWorkout";
import { PlannedActiveSplitWorkoutCard } from "../splits/planned-workout/PlannedActiveSplitWorkoutCard";
import { WidgetFlatList } from "../ui/sliders/WidgetFlatList";
import { IText } from "../ui/text/IText";
import { View } from "react-native";
import { WIDTH } from "../../utils/Dimensions";
import { useSettingsStore } from "../../stores/settingsStore";
import { InfoText } from "../ui/text/InfoText";
import { useTranslation } from "react-i18next";
import { Fragment } from "react";

export function TodaysWorkouts() {
  const { activeSplitPlan } = useWorkoutStore();
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  const now = new Date();

  const workouts = useFindPlannedWorkouts(now);
  const workoutIndexNow = useFindPlannedWorkoutIndexNow();

  if (!workouts || workoutIndexNow === -1 || !activeSplitPlan) return null;

  return (
    <Fragment>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          height: 44,
          width: WIDTH,
        }}
      >
        <IText text={activeSplitPlan.plan.name} color={theme.text} />
      </View>
      <WidgetFlatList
        data={workouts}
        initialScrollIndex={workoutIndexNow}
        renderItem={({ item }) => (
          <PlannedActiveSplitWorkoutCard
            key={item.id}
            splitPlan={activeSplitPlan.plan}
            workout={item}
            date={now}
          />
        )}
      />
      <InfoText
        text={`${t("button.tap-to-start")} | ${t("button.long-press-to-edit")}`}
        style={{ marginTop: 8 }}
      />
    </Fragment>
  );
}
