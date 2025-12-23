import { useWidgetUnit } from "../../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../../stores/settingsStore";
import { IButton } from "../../../../ui/buttons/IButton";
import { WaterContainer } from "./WaterContainer";
import { AnimatedWater } from "./AnimatedWater";
import { WaterUserInterface } from "./WaterUserInterface";

interface WaterConsumptionCardProps {
  focused: boolean;
}

export function WaterConsumptionCard({ focused }: WaterConsumptionCardProps) {
  const { widgetUnit, fullWidth } = useWidgetUnit();
  const { theme } = useSettingsStore();

  return (
    <IButton
      style={{
        height: widgetUnit,
        width: fullWidth,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: theme.handle,
        backgroundColor: theme.info,
        overflow: "hidden",
        zIndex: 2,
      }}
      pressable
    >
      <AnimatedWater />
      <WaterContainer>
        <WaterUserInterface focused={focused} />
      </WaterContainer>
    </IButton>
  );
}
