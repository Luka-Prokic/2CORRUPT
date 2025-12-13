import { View, ViewStyle, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSettingsStore } from "../../../stores/settingsStore";
import { MidText } from "../text/MidText";
import { useHaptics } from "../../../features/ui/useHaptics";
import { useEffect } from "react";
import { useBounceScaleAnim } from "../../../animations/useBounceScaleAnim";

interface SegmentedButtonsProps<T extends string> {
  options: T[];
  value: T;
  onChange: (val: T) => void;
  width?: number;
  height?: number;
  style?: ViewStyle;
  haptics?: boolean;
}

export function SegmentedButtons<T extends string>({
  options,
  value,
  onChange,
  width = 300,
  height = 44,
  style,
  haptics = false,
}: SegmentedButtonsProps<T>) {
  const { theme } = useSettingsStore();
  const triggerHaptics = useHaptics({ modeType: "on", hapticType: "light" });
  const { bounceAnim, bounceIt } = useBounceScaleAnim({ strength: 0.9 });

  const buttonWidth = width / options.length;
  const knobWidth = buttonWidth - 4;
  const selectedIndex = options.indexOf(value);
  const offset =
    selectedIndex === 0
      ? 2
      : selectedIndex === options.length - 1
      ? width - buttonWidth + 2
      : selectedIndex * buttonWidth + 2;
  const knobX = useSharedValue(offset);

  // Animate knob whenever value changes
  useEffect(() => {
    knobX.value = withSpring(offset, {
      mass: 1,
      stiffness: 360,
      damping: 16,
    });
  }, [value]);

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: knobX.value }],
  }));

  function handlePress(option: T) {
    if (value === option) return;
    if (haptics) triggerHaptics();
    onChange(option);
  }
  return (
    <Animated.View
      style={[
        bounceAnim,
        {
          width,
          height,
          borderRadius: height / 2,
          backgroundColor: theme.info + "40",
          flexDirection: "row",
          overflow: "hidden",
          ...style,
        },
      ]}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            height: height - 4,
            width: knobWidth,
            borderRadius: height / 2,
            top: 2,
            left: 0,
            backgroundColor: theme.secondaryBackground,
          },
          knobStyle,
        ]}
      />
      {options.map((option) => (
        <Pressable
          key={option}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 4,
          }}
          onPressIn={bounceIt}
          onPress={() => {
            handlePress(option);
          }}
          disabled={value === option}
        >
          <MidText
            text={option.toUpperCase()}
            style={{
              color: value === option ? theme.tint : theme.tint + "60",
              fontWeight: "bold",
            }}
            adjustsFontSizeToFit
            numberOfLines={1}
          />
        </Pressable>
      ))}
    </Animated.View>
  );
}
