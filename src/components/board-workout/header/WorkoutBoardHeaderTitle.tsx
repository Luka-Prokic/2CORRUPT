import { TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { SessionName } from "../sheets/session/SessionName";
import { WIDTH } from "../../../features/Dimensions";
import { SessionSheetType } from "../../../app/workout-board";

interface WorkoutBoardHeaderTitleProps {
  listOpen: boolean;
  setListOpen: (listOpen: boolean) => void;
  setListType: (listType: SessionSheetType) => void;
}
export function WorkoutBoardHeaderTitle({
  listOpen,
  setListOpen,
  setListType,
}: WorkoutBoardHeaderTitleProps) {
  const { theme } = useSettingsStore();

  function handlePressTitle() {
    setListOpen(true);
    setListType("session");
  }

  return (
    <TouchableOpacity
      onPress={handlePressTitle}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        padding: 8,
        width: WIDTH - 160,
      }}
      disabled={listOpen}
    >
      <SessionName
        fontSize={18}
        textColor={listOpen ? theme.glow : theme.tint}
      />
    </TouchableOpacity>
  );
}
