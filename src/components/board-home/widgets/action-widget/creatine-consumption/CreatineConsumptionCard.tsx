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
import { BounceButton } from "../../../../ui/buttons/BounceButton";
import { Ionicons } from "@expo/vector-icons";
import { useTurboDriverFont } from "../../../../../features/fonts/useTurboDriverFont";
import { MidText } from "../../../../ui/text/MidText";
import { ShineText } from "../../../../ui/text/ShineText";

interface CreatineConsumptionCardProps {
  focused?: boolean;
}

export function CreatineConsumptionCard({
  focused,
}: CreatineConsumptionCardProps) {
  const { widgetUnit, fullWidth } = useWidgetUnit();
  const { theme } = useSettingsStore();
  const { fontFamily } = useDracoFont();
  const { fontFamily: fontRubikBubbles } = useTurboDriverFont();

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
        borderColor: theme.fifthAccent + "80",
        backgroundColor: theme.fifthAccent,
        zIndex: 2,
      }}
      pressable
    >
      <Shine
        style={{
          width: fullWidth,
          height: widgetUnit,
          padding: 8,
        }}
      >
        <BounceButton
          onPress={() => {}}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            padding: 4,
            zIndex: 1,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
          }}
          haptics
        >
          <Ionicons name="ellipse" size={64} color={theme.secondaryAccent} />

          <IText
            text={dailyCreatineGoal.toString() + "g"}
            size={18}
            style={{ position: "absolute" }}
            adjustsFontSizeToFit
            numberOfLines={1}
            color={theme.background}
          />
        </BounceButton>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <ShineText
            text="CREATINE"
            style={{
              fontFamily: fontRubikBubbles,
            }}
            color={theme.fifthBackground}
            size={36}
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

        <View style={{ width: fullWidth - 16, height: 64 }}>
          <IButtonSwipe
            width={fullWidth - 16}
            confirmed={confirmed}
            onSwipeComplete={handleSwipeComplete}
            onCancel={handleSwipeCancel}
            style={{
              backgroundColor: confirmed ? "" : theme.border + "60",
              borderColor: theme.border + "40",
              borderWidth: 1,
            }}
            slideChild={
              <StrobeBlur
                style={{
                  position: "absolute",
                  width: fullWidth - 16,
                  height: 64,
                }}
                disabled={!confirmed}
              >
                <IText
                  text={confirmed ? `DONE` : `+${dose}g`}
                  style={{ fontFamily }}
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
