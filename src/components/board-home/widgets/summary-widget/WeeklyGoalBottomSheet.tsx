import { IBottomSheet } from "../../../ui/IBottomSheet";
import { WeeklyWorkoutGoal } from "../../../settings-app/goals/WeeklyWorkoutGoal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { DescriptionText } from "../../../ui/text/DescriptionText";
import { TextButton } from "../../../ui/buttons/TextButton";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../../../../stores/settings";
import { router } from "expo-router";

interface WeeklyGoalBottomSheetProps {
  ref: React.RefObject<BottomSheetModal>;
}

export function WeeklyGoalBottomSheet({ ref }: WeeklyGoalBottomSheetProps) {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();

  function navigateToGoals() {
    router.push("/settings/goals");
    (ref as React.RefObject<BottomSheetModal>)?.current?.close();
  }

  return (
    <IBottomSheet ref={ref}>
      <WeeklyWorkoutGoal />
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
        text={t("splits.set-your-fitness-goals")}
        color={theme.accent}
        onPress={navigateToGoals}
      />
    </IBottomSheet>
  );
}
