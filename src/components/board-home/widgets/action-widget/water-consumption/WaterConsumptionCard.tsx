import { useWidgetUnit } from "../../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../../stores/settingsStore";
import { IButton } from "../../../../ui/buttons/IButton";
import { WaterContainer } from "./WaterContainer";
import { AnimatedWater } from "./AnimatedWater";
import { WaterUserInterface } from "./WaterUserInterface";
import { useState } from "react";

export function WaterConsumptionCard() {
  const { widgetUnit, fullWidth } = useWidgetUnit();
  const { theme } = useSettingsStore();

  const [drinkAmount, setDrinkAmount] = useState(0); // mocked data
  const increment = 500;
  const goalLiters = 2.4; // mocked data

  return (
    <IButton
      style={{
        height: widgetUnit,
        width: fullWidth,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: theme.accent,
        backgroundColor: theme.info,
        overflow: "hidden",
      }}
      pressable
    >
      <AnimatedWater
        drinkAmount={drinkAmount}
        increment={increment}
        goalLiters={goalLiters}
      />
      <WaterContainer goalLiters={goalLiters}>
        <WaterUserInterface
          drinkAmount={drinkAmount}
          setDrinkAmount={setDrinkAmount}
          increment={increment}
        />
      </WaterContainer>
    </IButton>
  );
}
