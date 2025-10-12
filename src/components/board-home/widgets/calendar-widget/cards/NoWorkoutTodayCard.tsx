import { useTranslation } from "react-i18next";
import {
  useStartWorkoutNavigation,
  useWorkoutNavigation,
} from "../../../../../features/workout/useStartWorkoutNavigation";
import { useSettingsStore } from "../../../../../stores/settings";
import { Text } from "react-native";
import { useWorkoutStore } from "../../../../../stores/workout";
import { StrobeButton } from "../../../../ui/buttons/StrobeButton";

export function NoWorkoutTodayCard() {
  const { theme } = useSettingsStore();
  const navToWorkoutAndStartIt = useStartWorkoutNavigation();
  const navToWorkout = useWorkoutNavigation();
  const { t } = useTranslation();
  const { activeSession } = useWorkoutStore();
  const isItActive = activeSession !== null;

  function handlePress() {
    if (isItActive) {
      navToWorkoutAndStartIt();
    } else {
      navToWorkout();
    }
  }

  return (
    <StrobeButton
      style={{
        backgroundColor: theme.fifthBackground,
        height: 64,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 24,
        borderWidth: 1,
        borderColor: theme.border,
      }}
      onPress={handlePress}
    >
      <Text style={{ fontSize: 12, fontWeight: "bold", color: theme.border }}>
        {t("calendar.no-workout-today-description")}
      </Text>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: theme.secondaryText,
        }}
      >
        {isItActive ? t("app.continue-workout") : t("calendar.start-now")}
      </Text>
    </StrobeButton>
  );
}
