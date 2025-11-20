import { useSettingsStore } from "../../../stores/settings";
import { WorkoutTemplate } from "../../../stores/workout";
import { IButton } from "../../ui/buttons/IButton";
import { Ionicons } from "@expo/vector-icons";
import { AddToSplitBottomSheet } from "../split-options/AddToSplitBottomSheet";
import { useCallback, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

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

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const presentModal = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const isSomeSelected = selected.length ? true : false;

  function handleDeleteSelectedTemplates() {
    // setSelected([]);
    // setMode(false);
    presentModal();
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
      <AddToSplitBottomSheet
        templates={selected}
        startView="list"
        ref={bottomSheetRef}
      />
    </IButton>
  );
}
