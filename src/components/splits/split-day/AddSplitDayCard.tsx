import { TouchableOpacity, ViewStyle } from "react-native";
import { SplitPlan, useWorkoutStore } from "../../../stores/workout";
import { useSettingsStore } from "../../../stores/settings";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { BlurView } from "expo-blur";
import { IText } from "../../ui/text/IText";

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
        backgroundColor: theme.thirdBackground + "80",
        borderColor: theme.thirdBackground + "40",
        borderRadius: 32,
        overflow: "hidden",
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
          zIndex: 1,
        }}
      >
        <Ionicons name="add" size={64} color={theme.tint} />
      </TouchableOpacity>

      <BlurView
        style={{
          height: isGridView ? 44 : 64,
          paddingHorizontal: 16,
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <IText
          text={`${t("splits.day")} ${split.split.length + 1}`}
          color={theme.info}
          size={isGridView ? 22 : 28}
        />
      </BlurView>
      <BlurView
        style={{
          height: isGridView ? 44 : 64,
          paddingHorizontal: 16,
          justifyContent: "center",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />
    </Animated.View>
  );
}
