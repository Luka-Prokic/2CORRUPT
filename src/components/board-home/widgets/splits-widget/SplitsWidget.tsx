import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { hexToRGBA } from "../../../../utils/HEXtoRGB";
import { useSettingsStore } from "../../../../stores/settings";
import { router } from "expo-router";
import { useWorkoutStore } from "../../../../stores/workout";
import { useTranslation } from "react-i18next";
import { BounceButton } from "../../../ui/buttons/BounceButton";
import { MidText } from "../../../ui/text/MidText";
import { InfoText } from "../../../ui/text/InfoText";
import { Shine } from "../../../ui/misc/Shine";
import { SplitFlash } from "./SplitFlash";
import Animated, { FadeOut, FadeIn } from "react-native-reanimated";

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
      }}
      haptics
    >
      <Shine
        style={{
          width: widgetUnit,
          height: halfWidget,
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
            weight="bold"
          />
          <InfoText
            text={t("button.active").toLowerCase()}
            color={noSplit ? theme.info : theme.tint}
          />
        </Animated.View>
        <SplitFlash noSplit={noSplit} />
      </Shine>
    </BounceButton>
  );
}
