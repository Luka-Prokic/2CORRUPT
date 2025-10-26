import { Text, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useUIStore } from "../../../stores/ui";
import { useWorkoutStore } from "../../../stores/workout";
import { TextButton } from "../../ui/buttons/TextButton";
import { useTranslation } from "react-i18next";

export function CreateTemplateButton() {
  const { theme } = useSettingsStore();
  const { setTypeOfView } = useUIStore();
  const { editTemplate } = useWorkoutStore();
  const { t } = useTranslation();

  function handlePress() {
    router.back();
    router.back();
    setTypeOfView("template");
    editTemplate();
  }

  return (
    <TouchableOpacity onPress={handlePress} style={{ padding: 10 }}>
      <Text style={{ fontSize: 16, color: theme.tint }}>
        {t("button.create")}
      </Text>
    </TouchableOpacity>
  );

  // return (
  //   <TouchableOpacity onPress={handlePress}>
  //     <Ionicons name="add-circle" size={44} color={theme.tint} />
  //   </TouchableOpacity>
  // );
}
