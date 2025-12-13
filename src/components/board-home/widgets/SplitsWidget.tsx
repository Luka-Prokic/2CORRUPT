import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { hexToRGBA } from "../../../utils/HEXtoRGB";
import { useSettingsStore } from "../../../stores/settings";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Animated, { FadeOut, FadeIn } from "react-native-reanimated";
import { useWorkoutStore } from "../../../stores/workout";
import { useTranslation } from "react-i18next";
import { BounceButton } from "../../ui/buttons/BounceButton";
import { MidText } from "../../ui/text/MidText";
import { InfoText } from "../../ui/text/InfoText";

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
    <BounceButton
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
        <MidText
          text={activeSplitPlan?.plan.name}
          color={noSplit ? theme.info : theme.text}
        />
        <InfoText
          text={t("button.active").toLowerCase()}
          color={noSplit ? theme.info : theme.tint}
        />
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
    </BounceButton>
  );
}
