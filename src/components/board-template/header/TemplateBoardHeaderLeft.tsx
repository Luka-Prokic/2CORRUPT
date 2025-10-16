import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useUIStore } from "../../../stores/ui";
import { router } from "expo-router";
import { Fragment } from "react";

export function TemplateBoardHeaderLeft() {
  const { theme } = useSettingsStore();
  const { setTypeOfView } = useUIStore();

  function handleGoBack() {
    setTypeOfView("home");
    router.back();
  }

  return (
    <Fragment>
      <TouchableOpacity onPress={handleGoBack}>
        <Ionicons name="chevron-back-circle" size={44} color={theme.text} />
      </TouchableOpacity>
    </Fragment>
  );
}
