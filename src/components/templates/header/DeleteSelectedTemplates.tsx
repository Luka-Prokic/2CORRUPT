import { useSettingsStore } from "../../../stores/settings";
import { useWorkoutStore, WorkoutTemplate } from "../../../stores/workout";
import { IButton } from "../../ui/buttons/IButton";
import { Ionicons } from "@expo/vector-icons";

interface DeleteSelectedTemplatesProps {
  selected: WorkoutTemplate[];
  setSelected: (newSelected: WorkoutTemplate[]) => void;
}
export function DeleteSelectedTemplates({
  selected,
  setSelected,
}: DeleteSelectedTemplatesProps) {
  const { deleteTemplate } = useWorkoutStore();
  const { theme } = useSettingsStore();

  const isSomeSelected = selected.length ? true : false;

  function handleDeleteSelectedTemplates() {
    selected.map((t: WorkoutTemplate) => deleteTemplate(t.id));
    setSelected([]);
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
        name="trash-outline"
        size={24}
        color={!isSomeSelected ? theme.handle : theme.error}
      />
    </IButton>
  );
}
