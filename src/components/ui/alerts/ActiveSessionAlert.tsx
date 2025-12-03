import { useSettingsStore } from "../../../stores/settings";
import { useWorkoutStore } from "../../../stores/workout";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, ViewStyle } from "react-native";
import { useActionSheet } from "../../../utils/useActionSheet";
import { useUIStore } from "../../../stores/ui";
import { router } from "expo-router";
import { Fragment } from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

interface IconStyle {
  color?: string;
  size?: number;
  name?: any;
}
interface ActiveSessionAlertProps {
  type?: "template" | "session" | "icon";
  style?: ViewStyle | ViewStyle[];
  styleIcon?: IconStyle;
  disabled?: boolean;
}

export function ActiveSessionAlert({
  type = "template",
  style,
  styleIcon,
  disabled,
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
    const destructiveIndex = isItEmpty ? 2 : 3;

    showActionSheet({
      title: `${t("alert.end-workout")}?`,
      message: t("alert.end-workout-message"),
      options,
      destructiveIndex: destructiveIndex,
      cancelIndex: 0,
      onSelect: (buttonIndex) => {
        if (buttonIndex === 1) {
          router.dismissTo("/"), setTypeOfView("workout");
        }
        if (buttonIndex === 2 && !isItEmpty) handlePullTemplate();
        if (buttonIndex === 3 || (isItEmpty && buttonIndex === 2))
          cancelSession();
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
        disabled={disabled}
      >
        <Animated.Text
          entering={FadeIn}
          exiting={FadeOut}
          style={{
            marginVertical: 4,
            color: theme.info,
            fontSize: 16,
            fontWeight: "500",
          }}
        >
          <Ionicons
            name={styleIcon?.name ?? "alert-circle"}
            size={styleIcon?.size ?? 16}
            color={styleIcon?.color ?? theme.error}
          />
          {type !== "icon" && (
            <Fragment>
              {" "}
              {message}{" "}
              {!disabled && (
                <Ionicons name="arrow-up-circle" size={16} color={theme.info} />
              )}
            </Fragment>
          )}
        </Animated.Text>
      </TouchableOpacity>
    );
}
