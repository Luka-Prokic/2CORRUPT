import { ExerciseTip } from "../../../stores/workout/types";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { useTranslation } from "react-i18next";
import { InfoText } from "../../ui/text/InfoText";
import { InputField } from "../../ui/input/InputField";
import { IBubble } from "../../ui/containers/IBubble";
import { StrobeOptionButton } from "../../ui/buttons/StrobeOptionButton";
import { Ionicons } from "@expo/vector-icons";

interface AddTipCardProps {
  newTip: Partial<ExerciseTip>;
  setNewTip: (tip: Partial<ExerciseTip>) => void;
}
export function AddTipCard({ newTip, setNewTip }: AddTipCardProps) {
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
      <InputField
        placeholder="Tip Title"
        value={newTip.title || ""}
        onChangeText={(text) => setNewTip({ ...newTip, title: text })}
      />
      <InputField
        placeholder="Tip Description"
        value={newTip.tip || ""}
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
