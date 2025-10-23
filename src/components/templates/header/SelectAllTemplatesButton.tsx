import { useTranslation } from "react-i18next";
import { IButton } from "../../ui/buttons/IButton";
import { useWorkoutStore, WorkoutTemplate } from "../../../stores/workout";
import { useSettingsStore } from "../../../stores/settings";

interface SelectAllTemplatesButtonProps {
  selected: WorkoutTemplate[];
  setSelected: (newSelected: WorkoutTemplate[]) => void;
}

export function SelectAllTemplatesButton({
  selected,
  setSelected,
}: SelectAllTemplatesButtonProps) {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();
  const { templates } = useWorkoutStore();

  const allSelected =
    selected.length === templates.length &&
    templates.every((t) => selected.some((s) => s.id === t.id));

  function selectAll() {
    setSelected(templates);
  }
  return (
    <IButton
      title={t("app.all")}
      onPress={selectAll}
      style={{
        height: 44,
        width: 44,
      }}
      textColor={allSelected ? theme.handle : theme.info}
      disabled={allSelected}
    />
  );
}
