import { useSettingsStore } from "../../../stores/settings";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, ViewStyle } from "react-native";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useWorkoutStore } from "../../../stores/workout";

interface IconStyle {
  color?: string;
  size?: number;
  name?: any;
}
interface ActiveSplitAlertProps {
  type?: "info" | "icon";
  style?: ViewStyle | ViewStyle[];
  styleIcon?: IconStyle;
  disabled?: boolean;
}

export function ActiveSplitAlert({
  type = "info",
  style,
  styleIcon,
  disabled,
}: ActiveSplitAlertProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { activeSplitPlan } = useWorkoutStore();
  const activeSplit = activeSplitPlan?.plan.id !== "no-split";

  if (!activeSplit) return null;

  const message = type !== "icon" ? t("splits.active-split-alert") : "";

  return (
    <TouchableOpacity
      style={{ width: "100%", ...style }}
      activeOpacity={1}
      disabled={true} // no click behavior
    >
      <Text
        style={{
          marginVertical: 4,
          color: theme.info,
          fontSize: 14,
          fontWeight: "500",
        }}
      >
        {type !== "icon" ? (
          <Fragment>
            {message}{" "}
            {!disabled && (
              <Ionicons name="lock-closed" size={14} color={theme.info} />
            )}
          </Fragment>
        ) : (
          <Ionicons name="lock-closed" size={14} color={theme.info} />
        )}
      </Text>
    </TouchableOpacity>
  );
}
