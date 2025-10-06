import React from "react";
import { Animated, Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../stores/settingsStore";
import Colors from "../../config/constants/Colors";
import useBounceScaleAnim from "../../animations/useBounceScaleAnim";
import { useRouter } from "expo-router";

interface ProfileButtonProps {
  onPress?: () => void;
}

export default function ProfileButton({ onPress }: ProfileButtonProps) {
  const { themeName } = useSettingsStore();
  const theme = Colors[themeName];
  const router = useRouter();
  const { bounceAnim, bounceIt } = useBounceScaleAnim();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push("profile");
    }
  };

  return (
    <Animated.View
      style={[
        bounceAnim,
        {
          width: 88,
          height: 88,
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: "red",
        },
      ]}
    >
      <Pressable
        onPress={handlePress}
        onPressIn={bounceIt}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={{
          // backgroundColor: "blue",
          flex: 1,
        }}
      >
        {/* Glow circle BEHIND icon */}
        <View
          style={{
            position: "absolute",
            height: 80,
            width: 80,
            top: 9,
            left: 9,
            borderRadius: "50%",
            backgroundColor: theme.glow,
            borderWidth: 4,
            borderColor: theme.grayText,
          }}
        />

        {/* Icon ABOVE glow */}
        <Ionicons
          name="person-circle"
          size={94}
          color={theme.grayText}
          style={{ position: "relative", top: 1, left: 2 }}
        />
      </Pressable>
    </Animated.View>
  );
}
