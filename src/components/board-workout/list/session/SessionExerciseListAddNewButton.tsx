import { StrobeBlur } from "../../../ui/misc/StrobeBlur";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { IButton } from "../../../ui/buttons/IButton";
import { WIDTH } from "../../../../features/Dimensions";
import { ViewStyle } from "react-native";

interface SessionExerciseListAddNewButtonProps {
  style?: ViewStyle | ViewStyle[];
}

export function SessionExerciseListAddNewButton({
  style,
}: SessionExerciseListAddNewButtonProps) {
  const { theme } = useSettingsStore();
  return (
    <IButton
      onPress={() => router.push("/add-exercise")}
      style={{ height: 64, width: WIDTH - 32, margin: 16, ...style }}
    >
      <StrobeBlur
        colors={[theme.tint, theme.caka, theme.accent, theme.tint]}
        style={{
          borderRadius: 32,
          height: 64,
          justifyContent: "center",
          alignItems: "center",
          width: WIDTH - 32,
          backgroundColor: theme.secondaryBackground,
        }}
      >
        <Ionicons name="add" size={32} color={theme.text} />
      </StrobeBlur>
    </IButton>
  );
}
