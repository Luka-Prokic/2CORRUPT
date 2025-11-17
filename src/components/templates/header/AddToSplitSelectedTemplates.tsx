import { useSettingsStore } from "../../../stores/settings";
import { useWorkoutStore, WorkoutTemplate } from "../../../stores/workout";
import { IButton } from "../../ui/buttons/IButton";
import { Ionicons } from "@expo/vector-icons";

interface AddToSplitSelectedTemplatesProps {
  selected: WorkoutTemplate[];
  setSelected: (newSelected: WorkoutTemplate[]) => void;
  setMode: (newMode: boolean) => void;
}
export function AddToSplitSelectedTemplates({
  selected,
  setSelected,
  setMode,
}: AddToSplitSelectedTemplatesProps) {
  const { theme } = useSettingsStore();

  const isSomeSelected = selected.length ? true : false;

  function handleDeleteSelectedTemplates() {
    setSelected([]);
    setMode(false);
  }
  return (
    <IButton
      onPress={handleDeleteSelectedTemplates}
      style={{
        height: 24,
        width: 24,
        marginLeft: 8,
      }}
      disabled={!isSomeSelected}
    >
      <Ionicons
        name="flash-outline"
        size={24}
        color={!isSomeSelected ? theme.handle : theme.fifthBackground}
      />
    </IButton>
  );
}
