import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { WIDTH } from "../../../../features/Dimensions";
import { ViewStyle } from "react-native";
import { StrobeButton } from "../../../ui/buttons/StrobeButton";

interface TemplateExerciseListAddNewButtonProps {
  style?: ViewStyle | ViewStyle[];
}

export function TemplateExerciseListAddNewButton({
  style,
}: TemplateExerciseListAddNewButtonProps) {
  const { theme } = useSettingsStore();

  function handlePress() {
    router.push({
      pathname: "/add-exercise/[type]",
      params: {
        type: "template",
      },
    });
  }

  return (
    <StrobeButton
      strobeColors={[theme.glow, theme.glow, theme.glow, theme.glow]}
      onPress={handlePress}
      style={{
        height: 64,
        width: WIDTH - 32,
        margin: 16,
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.tint,
        ...style,
      }}
    >
      <Ionicons name="add" size={32} color={theme.border} />
    </StrobeButton>
  );
}
