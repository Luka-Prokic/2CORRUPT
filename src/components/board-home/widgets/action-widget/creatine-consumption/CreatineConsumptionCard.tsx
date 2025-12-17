import { useWidgetUnit } from "../../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../../stores/settingsStore";
import { IText } from "../../../../ui/text/IText";
import { IButton } from "../../../../ui/buttons/IButton";
import { useDracoFont } from "../../../../../features/fonts/useDracoFont";
import { View } from "react-native";
import { IButtonSwipe } from "../../../../ui/buttons/IButtonSwipe";
import { useState } from "react";

export function CreatineConsumptionCard() {
  const { widgetUnit, fullWidth } = useWidgetUnit();
  const { theme } = useSettingsStore();
  const { fontFamily } = useDracoFont();

  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  return (
    <IButton
      style={{
        height: widgetUnit,
        width: fullWidth,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: theme.fifthAccent + "40",
        backgroundColor: theme.fifthAccent + "80",
        zIndex: 2,
      }}
      pressable
    >
      <View
        style={{
          width: fullWidth,
          height: widgetUnit,
          padding: 8,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <IText
            text="Creatine"
            style={{
              fontFamily,
            }}
            color={theme.secondaryAccent}
            adjustsFontSizeToFit
            numberOfLines={1}
          />
        </View>

        <View style={{ width: fullWidth - 16, height: 64 }}>
          <IButtonSwipe
            width={fullWidth - 16}
            confirmed={isConfirmed}
            onSwipeComplete={() => {
              setIsConfirmed(true);
            }}
            onCancel={() => {
              setIsConfirmed(false);
            }}
            style={{
              backgroundColor: isConfirmed
                ? theme.secondaryText + "20"
                : theme.secondaryText + "60",
            }}
            haptics
          />
        </View>
      </View>
    </IButton>
  );
}
