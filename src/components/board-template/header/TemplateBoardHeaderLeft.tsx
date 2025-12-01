import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settingsStore";
import { router } from "expo-router";
import { Fragment } from "react";

interface TemplateBoardHeaderLeftProps {
  listOpen: boolean;
}

export function TemplateBoardHeaderLeft({
  listOpen,
}: TemplateBoardHeaderLeftProps) {
  const { theme } = useSettingsStore();

  function handlePressCog() {
    router.push("/settings/workout");
  }

  function handleGoBack() {
    router.back();
  }
  return (
    <Fragment>
      <TouchableOpacity onPress={handleGoBack}>
        <Ionicons name="chevron-back-circle" size={44} color={theme.text} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePressCog}>
        <Ionicons
          name="cog"
          size={44}
          color={listOpen ? theme.glow : theme.grayText}
        />
      </TouchableOpacity>
    </Fragment>
  );
}
