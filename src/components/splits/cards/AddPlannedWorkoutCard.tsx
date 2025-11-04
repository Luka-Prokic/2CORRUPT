import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settingsStore";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { router, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";

interface AddPlannedWorkoutCardProps {
  dayIndex: number;
}
export function AddPlannedWorkoutCard({
  dayIndex,
}: AddPlannedWorkoutCardProps) {
  const { theme } = useSettingsStore();
  const { splitId } = useLocalSearchParams<{ splitId: string }>();
  const { t } = useTranslation();

  function handleAddWorkout() {
    router.push({
      pathname: "/splits/[splitId]/[dayIndex]/add",
      params: {
        splitId,
        dayIndex,
      },
    });
  }

  return (
    <TouchableOpacity onPress={handleAddWorkout} hitSlop={10}>
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={{
          height: 44,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <Text style={{ color: theme.info, fontSize: 16, fontWeight: "500" }}>
          {t("splits.add-workout")}
        </Text>
        <Ionicons
          name="add"
          size={24}
          color={theme.info}
          style={{ marginHorizontal: 5 }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}
