import React from "react";
import { Animated } from "react-native";
import { useThemeStore } from "../../stores/themeStore";
import StashTittle from "./StashTittle";

export default function StashHeader() {
  const { theme } = useThemeStore();

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
      <StashTittle />
    </Animated.View>
  );
}
