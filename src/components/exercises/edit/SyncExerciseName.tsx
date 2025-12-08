import { StrobeOptionButton } from "../../ui/buttons/StrobeOptionButton";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settingsStore";

interface SyncExerciseNameProps {
  names: string[];
  onSync: () => void;
}

export function SyncExerciseName({ names, onSync }: SyncExerciseNameProps) {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();

  const notSyncedNames =
    names.length > 1 && !names.every((name) => name === names[0]);

  return (
    <StrobeOptionButton
      title={t("exercise.sync-exercise-names")}
      icon={
        <Ionicons
          name="sync"
          size={24}
          color={notSyncedNames ? theme.accent : theme.handle}
        />
      }
      justifyContent="space-between"
      color={notSyncedNames ? theme.accent : theme.handle}
      onPress={onSync}
      strobeDisabled={!notSyncedNames}
      disabled={!notSyncedNames}
    />
  );
}
