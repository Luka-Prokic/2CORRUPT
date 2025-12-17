import { LinearGradient } from "expo-linear-gradient";
import { useSettingsStore } from "../../../stores/settingsStore";
import { StyleSheet, ViewStyle } from "react-native";

export function Shine({
  style,
  children,
}: {
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
}) {
  const { theme } = useSettingsStore();
  return (
    <LinearGradient
      colors={[
        theme.shadow + "10",
        theme.glow + "00",
        theme.glow + "00",
        theme.glow + "00",
        theme.glow + "00",
        theme.shadow + "10",
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        ...StyleSheet.absoluteFillObject,
        borderRadius: 32,
        ...style,
      }}
    >
      {children}
    </LinearGradient>
  );
}
