import { useWidgetUnit } from "../../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../../stores/settingsStore";
import { View } from "react-native";
import { useTurboDriverFont } from "../../../../../features/fonts/useTurboDriverFont";
import { MidText } from "../../../../ui/text/MidText";
import { ShineText } from "../../../../ui/text/ShineText";
import { CreatineSlide } from "./CreatineSlide";
import { DailyCreatineButton } from "./DailyCreatineButton";
import { IBubble } from "../../../../ui/containers/IBubble";
interface CreatineConsumptionCardProps {
  focused?: boolean;
}

export function CreatineConsumptionCard({
  focused,
}: CreatineConsumptionCardProps) {
  const { widgetUnit, fullWidth } = useWidgetUnit();
  const { theme } = useSettingsStore();
  const { fontFamily: fontRubikBubbles } = useTurboDriverFont();

  return (
    <IBubble
      width={fullWidth}
      height={widgetUnit}
      style={{
        width: fullWidth,
        height: widgetUnit,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: theme.fifthAccent + "80",
        backgroundColor: theme.fifthAccent,
        zIndex: 2,
      }}
      styleContent={{
        padding: 8,
        justifyContent: "space-between",
      }}
    >
      <DailyCreatineButton />
      <View
        style={{
          width: fullWidth - 16,
          height: widgetUnit - 80,
          justifyContent: "center",
        }}
      >
        <ShineText
          text="CREATINE"
          style={{
            fontFamily: fontRubikBubbles,
          }}
          color={theme.fifthBackground}
          width={fullWidth - 88}
          constant
          focused={focused}
        />

        <MidText
          text="100% monohydrate"
          style={{
            fontFamily: fontRubikBubbles,
            width: fullWidth - 72,
          }}
          color={theme.accent}
          adjustsFontSizeToFit
          numberOfLines={1}
        />
      </View>

      <CreatineSlide />
    </IBubble>
  );
}
