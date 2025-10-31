import { useSettingsStore } from "../../../stores/settings";
import { useWorkoutStore } from "../../../stores/workout";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, ViewStyle } from "react-native";
import { useActionSheet } from "../../../features/useActionSheet";
import { useUIStore } from "../../../stores/ui";
import { router } from "expo-router";

interface ActiveSessionAlertProps {
  type?: "template" | "session";
  style?: ViewStyle | ViewStyle[];
}

export function ActiveSessionAlert({
  type = "template",
  style,
}: ActiveSessionAlertProps) {
  const { theme } = useSettingsStore();
  const { t, showActionSheet } = useActionSheet();
  const {
    activeSession,
    cancelSession,
    editTemplate,
    updateTemplateField,
    confirmTemplate,
  } = useWorkoutStore();
  const { setTypeOfView } = useUIStore();
  const isItEmpty = !activeSession?.layout.length;

  const handlePullTemplate = () => {
    const templateId = editTemplate();

    const newLayout = activeSession.layout.map((ex) => ({
      ...ex,
      sets: ex.sets.map((set) => ({
        ...set,
        isCompleted: false,
      })),
    }));

    updateTemplateField(templateId, "layout", newLayout);
    updateTemplateField(templateId, "name", activeSession.name);
    updateTemplateField(templateId, "description", activeSession.notes);
    confirmTemplate();
    cancelSession();
  };

  function handleAcitveSession() {
    const options = [
      t("button.cancel"),
      `${t("button.continue")} ${t("workout-board.workout")}`,
      !isItEmpty && t("workout-board.save-as-template"),
      t("alert.end-workout"),
    ].filter(Boolean);

    showActionSheet({
      title: `${t("alert.end-workout")}?`,
      message: t("alert.end-workout-message"),
      options,
      destructiveIndex: 3,
      cancelIndex: 0,
      onSelect: (buttonIndex) => {
        if (buttonIndex === 1) {
          router.dismissTo("/"), setTypeOfView("workout");
        }
        if (buttonIndex === 2 && !isItEmpty) handlePullTemplate();
        if (buttonIndex === 3) cancelSession();
      },
    });
  }

  let message = "";

  switch (type) {
    case "session":
      message = t("sessions.active-session-warning");
      break;
    case "template":
      message = t("templates.active-session-warning");
      break;
    default:
      message = "";
  }

  if (activeSession)
    return (
      <TouchableOpacity
        onPress={handleAcitveSession}
        style={{ width: "100%", ...style }}
      >
        <Text
          style={{
            marginVertical: 4,
            color: theme.info,
            fontSize: 14,
            fontWeight: "500",
          }}
        >
          <Ionicons name="alert-circle" size={14} color={theme.error} />{" "}
          {message}{" "}
          <Ionicons name="arrow-up-circle" size={14} color={theme.info} />
        </Text>
      </TouchableOpacity>
    );
}
