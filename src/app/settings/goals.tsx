import { Stack } from "expo-router";
import { Fragment } from "react";
import { ScreenContent } from "../../components/ui/utils/ScreenContent";
import { useTranslation } from "react-i18next";
import { ModalExitButton } from "./../_layout";
import { ScreenView } from "../../components/ui/containers/ScreenView";
import { IText } from "../../components/ui/text/IText";
import { ChangeWaterGoal } from "../../components/settings-app/goals/ChangeWaterGoal";
import { WeeklyWorkoutGoal } from "../../components/settings-app/goals/WeeklyWorkoutGoal";
import { IBubble } from "../../components/ui/containers/IBubble";
import { ChangeCreatineGoal } from "../../components/settings-app/goals/ChangeCreatineGoal";
import { ChangeCreatineFrequency } from "../../components/settings-app/goals/ChangeCreatineFrequency";

export default function GoalsScreen() {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <IText
              text={t("settings.goals")}
              adjustsFontSizeToFit
              numberOfLines={1}
            />
          ),
          headerRight: () => <ModalExitButton />,
        }}
      />

      <ScreenContent>
        <ScreenView
          style={{ paddingHorizontal: 16, gap: 16, paddingBottom: 64 }}
        >
          <IBubble size="flexible" style={{ padding: 16 }}>
            <WeeklyWorkoutGoal
              description={t("settings.goal.weekly-workout-goal-description")}
            />
          </IBubble>
          <IBubble size="flexible" style={{ padding: 16 }}>
            <ChangeWaterGoal />
          </IBubble>
          <IBubble size="flexible" style={{ padding: 16 }}>
            <ChangeCreatineGoal />
          </IBubble>
          <IBubble size="flexible" style={{ padding: 16 }}>
            <ChangeCreatineFrequency />
          </IBubble>
        </ScreenView>
      </ScreenContent>
    </Fragment>
  );
}
