import { Text, View } from "react-native";
import { useSettingsStore } from "../../../stores/settings/useSettingsStore";
import { WIDTH } from "../../../features/Dimensions";

export function SessionTimer() {
  const { theme } = useSettingsStore();

  return (
    <View
      style={{
        height: 64,
        width: WIDTH,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 56,
          fontWeight: "bold",
          color: theme.text,
        }}
      >
        09:41
      </Text>
    </View>
  );
}
