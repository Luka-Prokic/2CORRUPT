import { ExerciseInfo, ExerciseTip } from "../../../stores/workout/types";
import { useState } from "react";
import { CenterCardSlider } from "../../ui/sliders/CenterCardSlider";
import { WIDTH } from "../../../utils/Dimensions";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { AddTipCard } from "./AddTipCard";
import { TipCard } from "./TipCard";
import { useTranslation } from "react-i18next";

interface ExerciseTipsFieldProps {
  exercise: ExerciseInfo;
}
export function ExerciseTipsField({ exercise }: ExerciseTipsFieldProps) {
  const { fullWidth } = useWidgetUnit();
  const { t } = useTranslation();

  const [selectedCard, setSelectedCard] = useState<number>(0);
  const [newTip, setNewTip] = useState<Partial<ExerciseTip>>({
    title: "",
    tip: "",
  });

  function handleCopyTip(tip: ExerciseTip) {
    setSelectedCard(0);
    setNewTip({
      title: `${tip.title} - ${t("button.copy")}`,
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
      firstCard={<AddTipCard newTip={newTip} setNewTip={setNewTip} />}
      card={({ item }: { item: ExerciseTip }) => (
        <TipCard tip={item} onCopy={handleCopyTip} />
      )}
    />
  );
}
