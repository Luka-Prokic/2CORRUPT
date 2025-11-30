import { TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { WIDTH } from "../../../features/Dimensions";
import { SessionSheetType } from "../../../app/workout-board";
import { SessionTimer } from "../../ui/timer/SessionTimer";

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
      // disabled={listOpen}
    >
      <SessionTimer
        textStyle={{
          color: listOpen ? theme.glow : theme.tint,
        }}
      />
    </TouchableOpacity>
  );
}
