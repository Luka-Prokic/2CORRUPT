import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { SplitPlan, useWorkoutStore } from "../../../stores/workout";
import { useSettingsStore } from "../../../stores/settings";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { useTranslation } from "react-i18next";

interface AddSplitDayCardProps {
  split: SplitPlan;
  style?: ViewStyle | ViewStyle[];
  isGridView?: boolean;
}

export function AddSplitDayCard({
  split,
  style,
  isGridView,
}: AddSplitDayCardProps) {
  const { theme } = useSettingsStore();
  const { addDayToSplit } = useWorkoutStore();
  const { t } = useTranslation();
  function handleAddDay() {
    addDayToSplit(split.id);
  }

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        backgroundColor: hexToRGBA(theme.thirdBackground, 0.5),
        borderColor: theme.border,
        borderRadius: 32,
        borderWidth: 1,
        ...style,
      }}
    >
      <TouchableOpacity
        onPress={handleAddDay}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Ionicons name="add" size={64} color={theme.tint} />
      </TouchableOpacity>

      <View
        style={{
          height: isGridView ? 44 : 64,
          paddingHorizontal: 16,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: theme.info,
          }}
        >
          {t("splits.day")} {split.split.length + 1}
        </Text>
      </View>
    </Animated.View>
  );
}
