import { Stack } from "expo-router";
import { Fragment } from "react";
import { ScreenContent } from "../../components/ui/utils/ScreenContent";
import { useTranslation } from "react-i18next";
import { ModalExitButton } from "./../_layout";
import { IText } from "../../components/ui/text/IText";
import { IBubble } from "../../components/ui/containers/IBubble";
import { ChangeCreatineGoalBubble } from "../../components/settings-app/goals/ChangeCreatineGoal";
import { ChangeCreatineFrequencyBubble } from "../../components/settings-app/goals/ChangeCreatineFrequency";
import { ModalView } from "../../components/ui/containers/ModalView";
import { ChangeWaterGoalBubble } from "../../components/settings-app/goals/ChangeWaterGoal";
import { WeeklyWorkoutGoalBubble } from "../../components/settings-app/goals/WeeklyWorkoutGoal";

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
        <ModalView
          style={{ paddingHorizontal: 16, gap: 16, paddingBottom: 64 }}
        >
          <WeeklyWorkoutGoalBubble />
          <ChangeWaterGoalBubble />
          <ChangeCreatineGoalBubble />
          <ChangeCreatineFrequencyBubble />
        </ModalView>
      </ScreenContent>
    </Fragment>
  );
}
