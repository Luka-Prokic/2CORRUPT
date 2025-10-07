import { Animated } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { CorruptTittle } from "./CorruptTittle";

export function CorruptHeader() {
  const { theme } = useSettingsStore();

  return (
    <Animated.View
      style={{
        height: 88,
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 10,
        backgroundColor: theme.background,
      }}
    >
      <CorruptTittle />
    </Animated.View>
  );
}
