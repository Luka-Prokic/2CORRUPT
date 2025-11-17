import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settingsStore";
import { router } from "expo-router";
import { Fragment } from "react";
import { SessionSheetType } from "../../../app/workout-board";

interface WorkoutBoardHeaderLeftProps {
  listOpen: boolean;
  setListOpen: (listOpen: boolean) => void;
  setListType: (listType: SessionSheetType) => void;
}
export function WorkoutBoardHeaderLeft({
  listOpen,
  setListOpen,
  setListType,
}: WorkoutBoardHeaderLeftProps) {
  const { theme } = useSettingsStore();

  function handlePressCog() {
    setListOpen(true);
    setListType("session");
  }

  function handleGoBack() {
    router.back();
  }
  
  return (
    <Fragment>
      <TouchableOpacity onPress={handleGoBack}>
        <Ionicons name="chevron-back-circle" size={44} color={theme.text} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePressCog} disabled={listOpen}>
        <Ionicons name="cog" size={44} color={listOpen ? theme.glow : theme.tint} />
      </TouchableOpacity>
    </Fragment>
  );
}
