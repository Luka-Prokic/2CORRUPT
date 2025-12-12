import { Text, TouchableOpacity } from "react-native";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { hexToRGBA } from "../../../utils/HEXtoRGB";
import { useSettingsStore } from "../../../stores/settings";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Animated, { FadeOut, FadeIn } from "react-native-reanimated";
import { useWorkoutStore } from "../../../stores/workout";
import { useTranslation } from "react-i18next";

export function SplitsWidget() {
  const { widgetUnit, halfWidget } = useWidgetUnit();
  const { theme } = useSettingsStore();
  const { activeSplitPlan } = useWorkoutStore();
  const noSplit = activeSplitPlan?.plan?.id === "no-split";
  const { t } = useTranslation();

  function handleWidgetPress() {
    router.push("/splits/list");
  }

  return (
    <TouchableOpacity
      onPress={handleWidgetPress}
      style={{
        width: widgetUnit,
        height: halfWidget,
        borderRadius: 32,
        backgroundColor: hexToRGBA(theme.thirdBackground, 0.6),
        borderWidth: 1,
        borderColor: hexToRGBA(theme.thirdBackground, 0.4),
        padding: 16,
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: noSplit ? theme.info : theme.text,
          }}
        >
          {activeSplitPlan?.plan.name}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "600",
            color: noSplit ? theme.info : theme.tint,
          }}
        >
          {t("button.active").toLowerCase()}
        </Text>
      </Animated.View>

      <Ionicons
        name={noSplit ? "flash-outline" : "flash"}
        size={44}
        color={noSplit ? theme.info : theme.fifthBackground}
        style={{
          shadowColor: theme.fifthBackground,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: noSplit ? 0 : 0.6,
          shadowRadius: 16,
          elevation: noSplit ? 0 : 10,
        }}
      />
    </TouchableOpacity>
  );
}
