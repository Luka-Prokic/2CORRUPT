import { TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { WIDTH } from "../../../utils/Dimensions";
import { SessionSheetType } from "../../../app/workout-board";
import { SessionTimer } from "../../ui/timer/SessionTimer";

interface WorkoutBoardHeaderTitleProps {
  listType: SessionSheetType;
  setListType: (listType: SessionSheetType) => void;
}
export function WorkoutBoardHeaderTitle({
  listType,
  setListType,
}: WorkoutBoardHeaderTitleProps) {
  const { theme } = useSettingsStore();

  function handlePressTitle() {
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
    >
      <SessionTimer
        textStyle={{
          color: !!listType ? theme.text : theme.secondaryAccent,
        }}
      />
    </TouchableOpacity>
  );
}
