import { SessionTimer } from "../ui/timer/SessionTimer";
import { Text } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";

export function BottomLabel() {
  const { theme } = useSettingsStore();

  return (
    <Text
      style={{
        marginTop: 6,
        color: theme.text,
        fontSize: 14,
        fontWeight: "500",
      }}
    >
      On Going Workout:{" "}
      <SessionTimer
        textStyle={{ fontSize: 14, fontWeight: "500", color: theme.text }}
      />
    </Text>
  );
}
