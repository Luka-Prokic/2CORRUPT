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
  return (
    <StrobeButton
      onPress={() => router.push("/add-exercise")}
      style={{
        height: 64,
        width: WIDTH - 32,
        margin: 16,
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.secondaryBackground,
        ...style,
      }}
    >
      <Ionicons name="add" size={32} color={theme.text} />
    </StrobeButton>
  );
}
