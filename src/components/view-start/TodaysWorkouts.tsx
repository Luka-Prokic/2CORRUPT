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

export function TodaysWorkouts() {
  const { activeSplitPlan } = useWorkoutStore();
  const { theme } = useSettingsStore();
  const { t } = useTranslation();

  const now = new Date();

  const workouts = useFindPlannedWorkouts(now);
  const workoutIndexNow = useFindPlannedWorkoutIndexNow();

  if (!workouts || workoutIndexNow === -1) return null;
  if (!activeSplitPlan) return null;

  return (
    <>
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
        {/* <Ionicons name="flash" size={24} color={theme.fifthBackground} /> */}
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
      <InfoText text={t("button.tap-to-start")} style={{ marginTop: 8 }} />
      <InfoText text={t("button.long-press-to-edit")} style={{ marginTop: 8 }} />
    </>
  );
}
