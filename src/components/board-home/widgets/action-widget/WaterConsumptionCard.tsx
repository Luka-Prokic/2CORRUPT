import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { IButton } from "../../../ui/buttons/IButton";
import { IText } from "../../../ui/text/IText";

export function WaterConsumptionCard() {
  const { widgetUnit, fullWidth } = useWidgetUnit();
  const { theme } = useSettingsStore();

  return (
    <IButton
      style={{
        height: widgetUnit,
        width: fullWidth,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: theme.tint + "40",
        backgroundColor: theme.tint + "80",
      }}
      pressable
    >
      <IText text="Water Consumption" color={theme.secondaryText} />
    </IButton>
  );
}
