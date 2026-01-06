import { ExerciseInfo, ExerciseTip } from "../../../stores/workout/types";
import { useState } from "react";
import { CenterCardSlider } from "../../ui/sliders/CenterCardSlider";
import { WIDTH } from "../../../utils/Dimensions";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { View } from "react-native";
import { AddTipCard } from "./AddTipCard";
import { TipCard } from "./TipCard";

interface ExerciseTipsFieldProps {
  exercise: ExerciseInfo;
}
export function ExerciseTipsField({ exercise }: ExerciseTipsFieldProps) {
  const { fullWidth } = useWidgetUnit();

  const [selectedCard, setSelectedCard] = useState<number>(0);
  const [newTip, setNewTip] = useState<Partial<ExerciseTip>>({
    title: "",
    tip: "",
  });

  function handleCopyTip(tip: ExerciseTip) {
    setSelectedCard(0);
    setNewTip({
      title: `${tip.title} - Copy`,
      tip: tip.tip,
    });
  }

  return (
    <CenterCardSlider
      cardWidth={WIDTH}
      sliderWidth={WIDTH}
      cardHeight={fullWidth}
      selectedCardIndex={selectedCard}
      initialScrollIndex={selectedCard}
      selectedIndex={selectedCard}
      onSelect={(index) => setSelectedCard(index)}
      data={exercise.metadata?.tips ?? []}
      firstCard={
        <View style={{ width: WIDTH, height: fullWidth, alignItems: "center" }}>
          <AddTipCard newTip={newTip} setNewTip={setNewTip} />
        </View>
      }
      card={({ item }: { item: ExerciseTip }) => (
        <View style={{ width: WIDTH, height: fullWidth, alignItems: "center" }}>
          <TipCard tip={item} onCopy={handleCopyTip} />
        </View>
      )}
    />
  );
}
