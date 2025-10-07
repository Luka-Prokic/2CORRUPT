import { TouchableOpacity } from "react-native";
import { StrobeBlur } from "../../ui/misc/StrobeBlur";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSettingsStore } from "../../../stores/settings/useSettingsStore";

export function SessionExerciseListAddNewButton() {
  const { theme } = useSettingsStore();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.push("/add-exercise")}
      style={{ height: 64 }}
    >
      <StrobeBlur
        colors={[theme.tint, theme.caka, theme.accent, theme.tint]}
        style={{
          borderRadius: 32,
          height: 64,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name="add" size={32} color={theme.text} />
      </StrobeBlur>
    </TouchableOpacity>
  );
}
