import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settingsStore";

interface ExerciseInfoHeaderRightProps {
  isStats: boolean;
  handlePress: () => void;
}

export function ExerciseInfoHeaderRight({
  isStats,
  handlePress,
}: ExerciseInfoHeaderRightProps) {
  const { theme } = useSettingsStore();
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ionicons
        name={isStats ? "ellipse" : "information-circle"}
        size={44}
        color={theme.text}
      />
      {isStats && (
        <Ionicons
          name={"trophy-outline"}
          size={24}
          color={theme.secondaryText}
          style={{ position: "absolute" }}
        />
      )}
    </TouchableOpacity>
  );
}
