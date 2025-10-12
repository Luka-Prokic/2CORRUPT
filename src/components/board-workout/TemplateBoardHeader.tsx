import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settingsStore";
import { useUIStore } from "../../stores/ui";
import { router } from "expo-router";
import { useActionSheet } from "../../features/useActionSheet";

interface TemplateBoardHeaderProps {
  listOpen: boolean;
}
export function TemplateBoardHeader({ listOpen }: TemplateBoardHeaderProps) {
  const { theme } = useSettingsStore();
  const { setTypeOfView } = useUIStore();
  const { t, showActionSheet } = useActionSheet();

  // function handleCancelSession() {
  //   showActionSheet({
  //     title: `${t("workout-board.exit-workout")}?`,
  //     message: t("workout-board.exit-workout-message"),
  //     options: [
  //       t("workout-board.continue"),
  //       t("workout-board.exit-workout"),
  //       !isItEmpty && t("workout-board.save-as-template"),
  //     ],
  //     destructiveIndex: 1,
  //     cancelIndex: 0,
  //     onSelect: (buttonIndex) => {
  //       if (buttonIndex === 1 || (buttonIndex === 2 && !isItEmpty)) {
  //         setTypeOfView("home");
  //         cancelSession();
  //         router.back();
  //       }
  //     },
  //   });
  // }

  // function handleCompleteSession() {
  //   showActionSheet({
  //     title: `${t("workout-board.complete-workout")}?`,
  //     message: t("workout-board.complete-workout-message"),
  //     options: [
  //       t("workout-board.continue"),
  //       t("workout-board.complete-workout"),
  //     ],
  //     cancelIndex: 0,
  //     onSelect: (buttonIndex) => {
  //       if (buttonIndex === 1) {
  //         completeSession();
  //         setTypeOfView("home");
  //         router.back();
  //       }
  //     },
  //   });
  // }

  function handleGoBack() {
    setTypeOfView("home");
    router.back();
  }

  function rightHeader() {
    // if (isItEmpty)
    return (
      <TouchableOpacity onPress={handleGoBack}>
        <Ionicons name="arrow-undo-circle" size={44} color={theme.text} />
      </TouchableOpacity>
    );
    // return (
    //   <TouchableOpacity onPress={handleCancelSession}>
    //     <Ionicons name="close-circle" size={44} color={theme.error} />
    //   </TouchableOpacity>
    // );
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        zIndex: 1,
      }}
    >
      {rightHeader()}

      {/* <TouchableOpacity onPress={handleCompleteSession} disabled={isItEmpty}>
        <Ionicons
          name="checkmark-circle"
          size={44}
          color={isItEmpty ? theme.grayText : theme.text}
        />
      </TouchableOpacity> */}
    </View>
  );
}
