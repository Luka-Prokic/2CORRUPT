import { Animated, Pressable } from "react-native";
import { StrobeBlur, StrobeColors } from "../ui/misc/StrobeBlur";
import { useSettingsStore } from "../../stores/settingsStore";
import { HEIGHT, WIDTH } from "../../utils/Dimensions";
import { LinearGradient } from "expo-linear-gradient";
import { hexToRGBA } from "../../utils/HEXtoRGB";
import { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FOCUS_HEIGHT = HEIGHT - 120;

interface DashBoardProps {
  sheetOpen: boolean;
  togglePanel: () => void;
  disabled?: boolean;
  upperSection: React.ReactNode;
  lowerSection: React.ReactNode;
  colors?: StrobeColors;
  tint?: string;
}

export function DashBoard({
  sheetOpen,
  togglePanel,
  disabled,
  upperSection,
  lowerSection,
  colors,
  tint,
}: DashBoardProps) {
  const { theme } = useSettingsStore();
  const insets = useSafeAreaInsets();
  const animatedY = useRef(new Animated.Value(0)).current;

  const focusHeight = FOCUS_HEIGHT - insets.bottom;

  useEffect(() => {
    const toValue = sheetOpen ? -focusHeight + 80 : insets.bottom;
    Animated.spring(animatedY, { toValue, useNativeDriver: true }).start();
  }, [sheetOpen]);

  const lightText = hexToRGBA(theme.text, 0.2);
  return (
    <Animated.View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        transform: [{ translateY: animatedY }],
      }}
    >
      <StrobeBlur
        colors={colors || [lightText, lightText, lightText, lightText]}
        tint="auto"
        size={HEIGHT / 2}
        style={{
          height: focusHeight,
          backgroundColor: tint || theme.thirdBackground,
        }}
      >
        <LinearGradient
          colors={[theme.background, theme.background, theme.background + "10"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            height: focusHeight,
            width: WIDTH,
            alignItems: "center",
          }}
        >
          {/*Upper Section */}
          {upperSection}
        </LinearGradient>
      </StrobeBlur>

      {/* Toggle Panel */}

      <Pressable
        onPress={togglePanel}
        style={{
          position: "absolute",
          height: 88,
          padding: 16,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: theme.background,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          alignItems: "center",
        }}
        disabled={disabled}
      >
        <Ionicons
          name={sheetOpen ? "chevron-down" : "chevron-up"}
          size={32}
          color={disabled ? theme.handle : theme.text}
        />
      </Pressable>

      {/*Lower Section */}
      {sheetOpen && lowerSection}
    </Animated.View>
  );
}
