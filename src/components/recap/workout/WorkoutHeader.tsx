import { useSettingsStore } from "../../../stores/settingsStore";
import { View, Text, Platform } from "react-native";
import { WorkoutSession } from "../../../stores/workout/types";
import { DashLine } from "../../ui/misc/DashLine";
import { useTranslation } from "react-i18next";

interface WorkoutHeaderProps {
  session: WorkoutSession;
}

export function WorkoutHeader({ session }: WorkoutHeaderProps) {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();
  const fontFamily = Platform.OS === "ios" ? "Menlo" : "monospace";

  return (
    <View style={{ padding: 16 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          color: theme.text,
          fontFamily,
        }}
      >
        {session.totals?.totalSets} sets | {session.totals?.totalReps} reps |{" "}
        {session.totals?.totalVolumeKg} kg
      </Text>

      <Text
        style={{
          fontSize: 52,
          fontWeight: "bold",
          color: theme.text,
          marginTop: 64,
          marginBottom: 8,
          fontFamily,
        }}
      >
        {t("recap.exercises")}
      </Text>

      <DashLine/>
    </View>
  );
}
