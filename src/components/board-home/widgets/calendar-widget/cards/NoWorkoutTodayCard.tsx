import { useTranslation } from "react-i18next";
import { useStartWorkoutNavigation } from "../../../../../features/workout/useStartWorkoutNavigation";
import { useSettingsStore } from "../../../../../stores/settings";
import { Text, TouchableOpacity } from "react-native";
import { StrobeBlur } from "../../../../ui/misc/StrobeBlur";

export function NoWorkoutTodayCard() {
  const { theme } = useSettingsStore();
  const startWorkoutNavigation = useStartWorkoutNavigation();
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.fifthBackground,
        height: 64,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 24,
        borderWidth: 1,
        borderColor: theme.border,
      }}
      onPress={startWorkoutNavigation}
    >
      <StrobeBlur
        style={{
          padding: 16,
          borderRadius: 24,
          borderWidth: 1,
          borderColor: theme.border,
          height: 64,
          width: "100%",
        }}
        colors={[theme.caka, theme.primaryBackground, theme.accent, theme.tint]}
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
          {t("calendar.start-now")}
        </Text>
      </StrobeBlur>
    </TouchableOpacity>
  );
}
