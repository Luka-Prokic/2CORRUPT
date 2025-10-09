import {
  View,
  TouchableOpacity,
  Text,
  ActionSheetIOS,
  Alert,
  Platform,
  Appearance,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settingsStore";
import { useWorkoutStore } from "../../stores/workoutStore";
import { useUIStore } from "../../stores/ui";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

interface WorkoutBoardHeaderProps {
  listOpen: boolean;
}
export function WorkoutBoardHeader({ listOpen }: WorkoutBoardHeaderProps) {
  const { theme, themeName } = useSettingsStore();
  const { activeSession, cancelSession, completeSession } = useWorkoutStore();
  const { setWorkoutView } = useUIStore();
  const { t } = useTranslation();

  const iOSUserInterfaceStyle = ["light", "oldschool", "peachy"].includes(
    themeName
  )
    ? "light"
    : "dark";

  function handleCancelSession() {
    if (Platform.OS === "ios") {
      // Native iOS action sheet
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [
            t("workout-board.continue"),
            t("workout-board.exit-workout"),
            t("workout-board.save-as-template"),
          ],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 0,
          title: `${t("workout-board.exit-workout")}?`,
          message: t("workout-board.exit-workout-message"),
          userInterfaceStyle: iOSUserInterfaceStyle,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            setWorkoutView(false);
            cancelSession();
            router.back();
          } else if (buttonIndex === 2) {
            setWorkoutView(false);
            cancelSession();
            router.back();
          }
        }
      );
    } else {
      // Fallback for Android
      Alert.alert(
        `${t("workout-board.exit-workout")}?`,
        t("workout-board.exit-workout-message"),
        [
          { text: t("workout-board.continue"), style: "cancel" },
          {
            text: t("workout-board.exit-workout"),
            style: "destructive",
            onPress: () => {
              setWorkoutView(false);
              cancelSession();
              router.back();
            },
          },
          {
            text: t("workout-board.save-as-template"),
            onPress: () => {
              setWorkoutView(false);
              cancelSession();
              router.back();
            },
          },
        ]
      );
    }
  }

  function handleCompleteSession() {
    if (Platform.OS === "ios") {
      // Native iOS action sheet
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [
            t("workout-board.continue"),
            t("workout-board.complete-workout"),
          ],
          cancelButtonIndex: 0,
          title: `${t("workout-board.complete-workout")}?`,
          message: t("workout-board.complete-workout-message"),
          userInterfaceStyle: iOSUserInterfaceStyle,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            completeSession();
            setWorkoutView(false);
            router.back();
          }
        }
      );
    } else {
      // Fallback for Android
      Alert.alert(
        `${t("workout-board.complete-workout")}?`,
        t("workout-board.complete-workout-message"),
        [
          { text: t("workout-board.continue"), style: "cancel" },
          {
            text: t("workout-board.complete-workout"),
            style: "default",
            onPress: () => {
              completeSession();
              setWorkoutView(false);
              router.back();
            },
          },
        ]
      );
    }
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
      <TouchableOpacity onPress={handleCancelSession}>
        <Ionicons name="close-circle" size={44} color={theme.error} />
      </TouchableOpacity>
      <Text
        style={{
          color: listOpen ? theme.glow : theme.grayText,
          fontSize: 18,
          fontWeight: "700",
        }}
      >
        {activeSession.name || t("workout-board.workout")}
      </Text>
      <TouchableOpacity onPress={handleCompleteSession}>
        <Ionicons name="checkmark-circle" size={44} color={theme.text} />
      </TouchableOpacity>
    </View>
  );
}
