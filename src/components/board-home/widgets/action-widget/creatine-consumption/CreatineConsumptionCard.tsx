import { useWidgetUnit } from "../../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../../stores/settingsStore";
import { IText } from "../../../../ui/text/IText";
import { IButton } from "../../../../ui/buttons/IButton";
import { useDracoFont } from "../../../../../features/fonts/useDracoFont";
import { View } from "react-native";
import { IButtonSwipe } from "../../../../ui/buttons/IButtonSwipe";
import { useCreatineStore } from "../../../../../stores/creatine";
import { Shine } from "../../../../ui/misc/Shine";
import { StrobeBlur } from "../../../../ui/misc/StrobeBlur";

export function CreatineConsumptionCard() {
  const { widgetUnit, fullWidth } = useWidgetUnit();
  const { theme } = useSettingsStore();
  const { fontFamily } = useDracoFont();

  const {
    creatineConsumption,
    dailyCreatineGoal,
    timesADay,
    addCreatine,
    resetCreatine,
  } = useCreatineStore();

  const dose = dailyCreatineGoal / timesADay;
  const remaining = dailyCreatineGoal - creatineConsumption;

  const finalSwipe = remaining <= dose;

  const confirmed = creatineConsumption >= dailyCreatineGoal;

  function handleSwipeComplete() {
    addCreatine();
  }

  function handleSwipeCancel() {
    resetCreatine();
  }

  return (
    <IButton
      style={{
        height: widgetUnit,
        width: fullWidth,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: theme.fifthAccent,
        backgroundColor: theme.fifthAccent + "80",
        zIndex: 2,
      }}
      pressable
    >
      <Shine
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
            confirmed={confirmed}
            onSwipeComplete={handleSwipeComplete}
            onCancel={handleSwipeCancel}
            style={{
              backgroundColor: confirmed ? "" : theme.text + "20",
              borderColor: theme.text + "20",
              borderWidth: 1,
            }}
            slideChild={
              <StrobeBlur
                style={{
                  position: "absolute",
                  width: fullWidth - 16,
                }}
                disabled={!confirmed}
              >
                <IText
                  text={
                    confirmed
                      ? `DONE`
                      : `${creatineConsumption} / ${dailyCreatineGoal}`
                  }
                  size={24}
                />
              </StrobeBlur>
            }
            haptics
            finalSwipe={finalSwipe}
          />
        </View>
      </Shine>
    </IButton>
  );
}
