import { View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { useSettingsStore } from "../../../stores/settingsStore";
import { MidText } from "../text/MidText";
import { BounceButton } from "./BounceButton";

interface SwitchButtonProps {
  option1: string;
  option2?: string; // <-- optional now
  value: string;
  onChange?: (val: string) => void;
  width?: number;
  height?: number;
  style?: ViewStyle;
  haptics?: boolean;
  disabled?: boolean; // optional override
}

export function SwitchButton({
  option1,
  option2,
  value,
  onChange,
  width = 150,
  height = 44,
  style,
  haptics = false,
  disabled = false,
}: SwitchButtonProps) {
  const { theme } = useSettingsStore();

  const singleMode = !option2 || disabled;

  // --- SINGLE OPTION MODE ---
  if (singleMode) {
    return (
      <View
        style={{
          width,
          height,
          borderRadius: height / 2,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background + "40",
          ...style,
        }}
      >
        <MidText
          text={option1.toUpperCase()}
          style={{
            color: theme.tint,
            fontWeight: "bold",
          }}
        />
      </View>
    );
  }

  // --- TWO OPTION MODE (your original code) ---
  const position = useDerivedValue(() => {
    return value === option1 ? 0 : 1;
  }, [value]);

  const knobWidth = width * 0.5;
  const targetX = width - knobWidth;

  const animatedX = useDerivedValue(() => {
    return withSpring(position.value === 0 ? 0 : targetX, {
      mass: 1,
      stiffness: 360,
      damping: 16,
    });
  });

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: animatedX.value }],
  }));

  function toggle() {
    const next = value === option1 ? option2! : option1;
    if (haptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onChange?.(next);
  }

  return (
    <BounceButton
      onPress={toggle}
      style={{
        width,
        height,
        borderRadius: height / 2,
        position: "relative",
        justifyContent: "center",
        backgroundColor: theme.background + "40",
        ...style,
      }}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            width: knobWidth,
            height: height,
            top: 0,
            left: 0,
            borderRadius: height / 2,
            shadowColor: theme.shadow,
            shadowOffset: { width: 2, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            backgroundColor: theme.background + "80",
          },
          knobStyle,
        ]}
      />

      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          width: "100%",
          height: "100%",
        }}
      >
        {[option1, option2].map((option) => (
          <MidText
            key={option}
            style={{
              color: value === option ? theme.tint : theme.tint + "60",
              fontWeight: "bold",
              flex: 1,
              lineHeight: height,
              textAlign: "center",
              textAlignVertical: "center",
            }}
            text={option.toUpperCase()}
          />
        ))}
      </View>
    </BounceButton>
  );
}
