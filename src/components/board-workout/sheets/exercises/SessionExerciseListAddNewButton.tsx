import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { WIDTH } from "../../../../features/Dimensions";
import { ViewStyle } from "react-native";
import { StrobeButton } from "../../../ui/buttons/StrobeButton";

interface SessionExerciseListAddNewButtonProps {
  style?: ViewStyle | ViewStyle[];
}

export function SessionExerciseListAddNewButton({
  style,
}: SessionExerciseListAddNewButtonProps) {
  const { theme } = useSettingsStore();

  function handlePress() {
    router.push({
      pathname: "/add-exercise/[type]",
      params: {
        type: "session",
      },
    });
  }

  return (
    <StrobeButton
      onPress={handlePress}
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
