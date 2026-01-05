import { StrobeOptionButton } from "../ui/buttons/StrobeOptionButton";
import { IBubble } from "../ui/containers/IBubble";
import { useSettingsStore } from "../../stores/settingsStore";
import { IText } from "../ui/text/IText";
import { Ionicons } from "@expo/vector-icons";
import { ExerciseInfo, ExerciseTip } from "../../stores/workout/types";
import { useWorkoutStore } from "../../stores/workout/useWorkoutStore";
import { useState } from "react";
import { InfoText } from "../ui/text/InfoText";
import { CenterCardSlider } from "../ui/sliders/CenterCardSlider";
import { WIDTH } from "../../utils/Dimensions";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";
import { Pressable, View } from "react-native";
import { Input } from "../ui/input/Input";
import { BlurView } from "expo-blur";
import { useTranslation } from "react-i18next";

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
          <ExerciseAddTipCard newTip={newTip} setNewTip={setNewTip} />
        </View>
      }
      card={({ item }: { item: ExerciseTip }) => (
        <View style={{ width: WIDTH, height: fullWidth, alignItems: "center" }}>
          <ExerciseTipItem tip={item} onCopy={handleCopyTip} />
        </View>
      )}
    />
  );
}

interface ExerciseTipItemProps {
  tip: ExerciseTip;
  onCopy: (tip: ExerciseTip) => void;
}

function ExerciseTipItem({ tip, onCopy }: ExerciseTipItemProps) {
  const { fullWidth } = useWidgetUnit();
  const { theme } = useSettingsStore();
  const { removeExerciseTip } = useWorkoutStore();

  function handleDeleteTip() {
    removeExerciseTip(tip.id);
  }
  function handleCopyTip() {
    onCopy(tip);
  }
  return (
    <IBubble
      width={fullWidth}
      height={fullWidth}
      styleContent={{ justifyContent: "space-between", paddingTop: 16 }}
    >
      <IText text={tip.title} />
      <IText text={tip.tip} />
      <BlurView
        intensity={100}
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: 34,
          width: fullWidth,
          paddingHorizontal: 16,
        }}
      >
        <Pressable onPress={handleDeleteTip}>
          <Ionicons name="trash-outline" size={24} color={theme.error} />
        </Pressable>
        <Pressable onPress={handleCopyTip}>
          <Ionicons name="arrow-undo-outline" size={24} color={theme.accent} />
        </Pressable>
      </BlurView>
    </IBubble>
  );
}

interface ExerciseAddTipCardProps {
  newTip: Partial<ExerciseTip>;
  setNewTip: (tip: Partial<ExerciseTip>) => void;
}
function ExerciseAddTipCard({ newTip, setNewTip }: ExerciseAddTipCardProps) {
  const { addExerciseTip } = useWorkoutStore();
  const { theme } = useSettingsStore();
  const { fullWidth } = useWidgetUnit();
  const { t } = useTranslation();

  function handleAddTip() {
    addExerciseTip({
      title: newTip.title,
      tip: newTip.tip,
    });
    setNewTip({
      title: "",
      tip: "",
    });
  }

  const isReadyToAdd = newTip.title && newTip.tip;

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
      />
      <Input
        placeholder="Tip Description"
        value={newTip.tip}
        onChangeText={(text) => setNewTip({ ...newTip, tip: text })}
      />
      <StrobeOptionButton
        title={t("button.add")}
        onPress={handleAddTip}
        icon={
          <Ionicons
            name="add-outline"
            size={24}
            color={isReadyToAdd ? theme.tint : theme.handle}
          />
        }
        color={isReadyToAdd ? theme.tint : theme.handle}
        disabled={!isReadyToAdd}
        justifyContent="center"
      />
    </IBubble>
  );
}
