import { TouchableOpacity, Text } from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { router, useLocalSearchParams } from "expo-router";

interface SplitDayAddWorkoutButtonProps {
  splitId: string;
  dayIndex: number;
  isActiveDay: boolean;
}

export function SplitDayAddWorkoutButton({
  splitId,
  dayIndex,
  isActiveDay,
}: SplitDayAddWorkoutButtonProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { splitId: routeSplitId } = useLocalSearchParams<{ splitId: string }>();

  function handleAddWorkout() {
    router.push({
      pathname: "/splits/[splitId]/[dayIndex]/add",
      params: {
        splitId: routeSplitId || splitId,
        dayIndex: String(dayIndex),
      },
    });
  }

  if (!isActiveDay) return null;

  return (
    <TouchableOpacity
      onPress={handleAddWorkout}
      style={{
        marginTop: 12,
        padding: 16,
        backgroundColor: theme.secondaryBackground,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: theme.border,
        borderStyle: "dashed",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 8,
      }}
    >
      <Ionicons name="add-circle-outline" size={24} color={theme.tint} />
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: theme.tint,
        }}
      >
        {t("button.add")} Workout
      </Text>
    </TouchableOpacity>
  );
}

