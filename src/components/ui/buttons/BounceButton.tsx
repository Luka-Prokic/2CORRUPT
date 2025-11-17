import {
  Text,
  ViewStyle,
  TouchableOpacityProps,
  Pressable,
} from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { useBounceScaleAnim } from "../../../animations/useBounceScaleAnim";
import Animated from "react-native-reanimated";

interface BounceButtonProps
  extends Omit<TouchableOpacityProps, "style" | "onPress"> {
  title?: string;
  children?: React.ReactNode;
  color?: string;
  textColor?: string;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
}

export function BounceButton({
  title,
  children,
  color,
  style,
  textColor,
  onPress,
  ...rest
}: BounceButtonProps) {
  const { theme } = useSettingsStore();
  const { bounceAnim, bounceIt } = useBounceScaleAnim();

  const handlePress = () => {
    onPress?.();
  };

  return (
    <Animated.View
      style={[
        bounceAnim,
        {
          borderRadius: 8,
          overflow: "hidden",
          zIndex: 1,
          backgroundColor: color,
          opacity: rest.disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      <Pressable
        style={[
          {
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 8,
            flex: 1,
          },
        ]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        onPress={handlePress}
        onPressIn={bounceIt}
        {...rest}
      >
        {children ? (
          children
        ) : (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: textColor ?? theme.text,
            }}
          >
            {title}
          </Text>
        )}
      </Pressable>
    </Animated.View>
  );
}
