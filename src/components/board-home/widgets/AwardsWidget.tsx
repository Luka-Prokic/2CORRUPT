import { router } from "expo-router";
import { useSettingsStore } from "../../../stores/settings/useSettingsStore";
import { hexToRGBA } from "../../../utils/HEXtoRGB";
import { BounceButton } from "../../ui/buttons/BounceButton";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { Shine } from "../../ui/misc/Shine";
import { IText } from "../../ui/text/IText";
import { View } from "react-native";

export function AwardsWidget() {
  const { theme } = useSettingsStore();
  const { widgetUnit, halfWidget } = useWidgetUnit();
  function handlePress() {
    router.push("/");
  }
  return (
    <View
      style={{
        width: widgetUnit,
        height: widgetUnit,
        justifyContent: "flex-end",
      }}
    >
      <BounceButton
        style={{
          width: widgetUnit,
          height: halfWidget,
          borderRadius: 32,
          backgroundColor: hexToRGBA(theme.fifthAccent, 0.6),
          borderWidth: 1,
          borderColor: hexToRGBA(theme.fifthAccent, 0.4),
        }}
        onPress={handlePress}
        haptics
      >
        <Shine />
        <IText text="AWARDS" color={theme.fifthAccent} />
      </BounceButton>
    </View>
  );
}
