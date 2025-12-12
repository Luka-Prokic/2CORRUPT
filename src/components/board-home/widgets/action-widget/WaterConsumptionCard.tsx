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
        borderColor: theme.thirdBackground + "40",
        backgroundColor: theme.text,
      }}
    >
      <IText text="Water Consumption" color={theme.secondaryText} />
    </IButton>
  );
}
