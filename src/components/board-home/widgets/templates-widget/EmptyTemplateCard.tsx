import { Text, View } from "react-native";
import { useSettingsStore } from "../../../../stores/settings";
import { useWidgetUnit } from "../../../../features/widgets/useWidgetUnit";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useUIStore } from "../../../../stores/ui";
import { useWorkoutStore } from "../../../../stores/workout";
import { Fragment } from "react";
import { StrobeButton } from "../../../ui/buttons/StrobeButton";

export function EmptyTemplateCard() {
  const { theme } = useSettingsStore();
  const { widgetUnit, fullWidth } = useWidgetUnit();
  const { setTypeOfView } = useUIStore();
  const { editTemplate } = useWorkoutStore();

  function handlePress() {
    router.back();
    setTypeOfView("template");
    editTemplate();
  }

  return (
    <StrobeButton
      onPress={handlePress}
      style={{
        width: widgetUnit * 0.8,
        height: widgetUnit - 84,
        marginHorizontal: widgetUnit * 0.1 - 5,
        backgroundColor: theme.fifthBackground,
        borderColor: theme.border,
        borderRadius: 16,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      activeOpacity={0.7}
    >
      <Ionicons name="add" size={44} color={theme.secondaryText} />
    </StrobeButton>
  );
}
