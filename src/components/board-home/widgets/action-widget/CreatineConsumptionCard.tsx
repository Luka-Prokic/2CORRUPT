import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { IText } from "../../../ui/text/IText";
import { IButton } from "../../../ui/buttons/IButton";

export function CreatineConsumptionCard() {
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
      <IText text="Creatine Consumption" color={theme.secondaryText} />
    </IButton>
  );
}
