import { Animated, View, Pressable } from "react-native";
import { StrobeBlur, StrobeColors } from "../ui/misc/StrobeBlur";
import { useSettingsStore } from "../../stores/settingsStore";
import { HEIGHT, WIDTH } from "../../features/Dimensions";
import { LinearGradient } from "expo-linear-gradient";
import { hexToRGBA } from "../../features/HEXtoRGB";
import { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FOCUS_HEIGHT = HEIGHT - 120;

interface DashBoardProps {
  listOpen: boolean;
  togglePanel: () => void;
  disabled?: boolean;
  upperSection: React.ReactNode;
  lowerSection: React.ReactNode;
  colors?: StrobeColors;
  tint?: string;
}

export function DashBoard({
  listOpen,
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
    const toValue = listOpen ? -focusHeight + 80 : insets.bottom;
    Animated.spring(animatedY, { toValue, useNativeDriver: true }).start();
  }, [listOpen]);

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
          colors={[
            theme.background,
            theme.background,
            hexToRGBA(theme.background, 0),
          ]}
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
      <View
        style={{
          position: "absolute",
          height: 88,
          padding: 8,
          bottom: 0,
          right: 0,
          left: 0,
          flexDirection: "row",
          backgroundColor: theme.background,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
        }}
      >
        <Pressable
          onPress={togglePanel}
          style={{
            flex: 1,
            alignItems: "center",
          }}
          disabled={disabled}
        >
          <Ionicons
            name={listOpen ? "chevron-down" : "chevron-up"}
            size={34}
            color={disabled ? theme.handle : theme.text}
          />
        </Pressable>
      </View>

      {/*Lower Section */}
      {listOpen && lowerSection}
    </Animated.View>
  );
}
