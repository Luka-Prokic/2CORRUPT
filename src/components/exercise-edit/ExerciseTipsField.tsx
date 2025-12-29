import { StrobeOptionButton } from "../ui/buttons/StrobeOptionButton";
import { IBubble } from "../ui/containers/IBubble";
import { useSettingsStore } from "../../stores/settingsStore";
import { IText } from "../ui/text/IText";
import { Ionicons } from "@expo/vector-icons";
import { ExerciseInfo, ExerciseTip } from "../../stores/workout/types";
import { useWorkoutStore } from "../../stores/workout/useWorkoutStore";
import { nanoid } from "nanoid/non-secure";
import { useState } from "react";
import { InfoText } from "../ui/text/InfoText";
import { CenterCardSlider } from "../ui/sliders/CenterCardSlider";
import { WIDTH } from "../../utils/Dimensions";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";
import { View } from "react-native";
import { Input } from "../ui/input/Input";

interface ExerciseTipsFieldProps {
  exercise: ExerciseInfo;
}
export function ExerciseTipsField({ exercise }: ExerciseTipsFieldProps) {
  const { theme } = useSettingsStore();
  const { fullWidth } = useWidgetUnit();

  return (
    <CenterCardSlider
      cardWidth={WIDTH}
      sliderWidth={WIDTH}
      cardHeight={fullWidth}
      data={exercise.metadata?.tips ?? []}
      firstCard={
        <View style={{ width: WIDTH, height: fullWidth, alignItems: "center" }}>
          <ExerciseAddTipCard />
        </View>
      }
      card={({ item }: { item: ExerciseTip }) => (
        <View style={{ width: WIDTH, height: fullWidth, alignItems: "center" }}>
          <ExerciseTipItem tip={item} />
        </View>
      )}
    />
  );
}

function ExerciseTipItem({ tip }: { tip: ExerciseTip }) {
  const { fullWidth } = useWidgetUnit();

  return (
    <IBubble width={fullWidth} height={fullWidth}>
      <IText text={tip.title} />
      <IText text={tip.tip} />
    </IBubble>
  );
}

function ExerciseAddTipCard() {
  const { addExerciseTip } = useWorkoutStore();
  const { theme } = useSettingsStore();
  const { fullWidth } = useWidgetUnit();

  const [newTip, setNewTip] = useState<Partial<ExerciseTip>>({
    title: "",
    tip: "",
  });

  function handleAddTip() {
    addExerciseTip({
      title: newTip.title,
      tip: newTip.tip,
    });
  }

  return (
    <IBubble
      width={fullWidth}
      height={fullWidth}
      styleContent={{ justifyContent: "space-between", paddingTop: 16 }}
    >
      <InfoText text="Create a new tip" />
      <Input
        placeholder="Tip Title"
        value={newTip.title}
        onChangeText={(text) => setNewTip({ ...newTip, title: text })}
        style={{ width: fullWidth - 32 }}
      />
      <Input
        placeholder="Tip Description"
        value={newTip.tip}
        onChangeText={(text) => setNewTip({ ...newTip, tip: text })}
      />
      <StrobeOptionButton
        title="Add Tip"
        onPress={handleAddTip}
        icon={<Ionicons name="add-outline" size={24} color={theme.tint} />}
        justifyContent="center"
      />
    </IBubble>
  );
}
