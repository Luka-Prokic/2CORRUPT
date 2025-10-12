import { View } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";

interface DashLineProps {
  width?: number;
}

export function DashLine({ width }: DashLineProps) {
  const { theme } = useSettingsStore();

  return (
    <View
      style={{
        borderBottomWidth: 3,
        borderColor: theme.text,
        borderStyle: "dashed",
        height: 0,
        width,
      }}
    />
  );
}
