import { LinearGradient } from "expo-linear-gradient";
import { useSettingsStore } from "../../../stores/settingsStore";
import { StyleSheet, ViewStyle } from "react-native";

interface ShineProps {
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
  color?: string;
}
export function Shine({ style, children, color }: ShineProps) {
  const { theme } = useSettingsStore();

  const shineColor = color ?? theme.shadow;
  return (
    <LinearGradient
      colors={[
        shineColor + "10",
        theme.glow + "00",
        theme.glow + "00",
        theme.glow + "00",
        theme.glow + "00",
        shineColor + "10",
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
