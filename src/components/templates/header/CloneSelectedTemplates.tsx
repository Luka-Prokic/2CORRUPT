import { useSettingsStore } from "../../../stores/settings";
import { useWorkoutStore, WorkoutTemplate } from "../../../stores/workout";
import { IButton } from "../../ui/buttons/IButton";
import { Ionicons } from "@expo/vector-icons";

interface CloneSelectedTemplatesProps {
  selected: WorkoutTemplate[];
  setSelected: (newSelected: WorkoutTemplate[]) => void;
  setMode: (newMode: boolean) => void;
}
export function CloneSelectedTemplates({
  selected,
  setSelected,
  setMode,
}: CloneSelectedTemplatesProps) {
  const { cloneTemplate } = useWorkoutStore();
  const { theme } = useSettingsStore();

  const isSomeSelected = selected.length ? true : false;

  function handleDeleteSelectedTemplates() {
    selected.map((t: WorkoutTemplate) =>
      cloneTemplate(t.id, t.name + (t.version + 1))
    );
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
        name="duplicate-outline"
        size={24}
        color={!isSomeSelected ? theme.handle : theme.accent}
      />
    </IButton>
  );
}
