import React from "react";
import { View, Text, ViewStyle, TextStyle } from "react-native";
import { WIDTH } from "../../../features/Dimensions";
import { BounceButton } from "./BounceButton";
import { useSettingsStore } from "../../../stores/settings";
import { StrobeBlur } from "../misc/StrobeBlur";
import * as Haptics from "expo-haptics";

interface TwoOptionStrobeButtonsProps {
  labelOne: string;
  labelTwo: string;
  onOptionOne: () => void;
  onOptionTwo: () => void;
  styleOne?: ViewStyle | ViewStyle[];
  styleTwo?: ViewStyle | ViewStyle[];
  styleLabelOne?: TextStyle;
  styleLabelTwo?: TextStyle;
  disabledOne?: boolean;
  disabledTwo?: boolean;
  disabledStrobeOne?: boolean;
  disabledStrobeTwo?: boolean;
  style?: ViewStyle | ViewStyle[];
  width?: number;
  haptics?: boolean;
}

export function TwoOptionStrobeButtons({
  labelOne,
  labelTwo,
  onOptionOne,
  onOptionTwo,
  styleOne,
  styleTwo,
  disabledOne,
  disabledTwo,
  disabledStrobeOne,
  disabledStrobeTwo,
  style,
  styleLabelOne,
  styleLabelTwo,
  width = WIDTH - 32,
  haptics = false,
}: TwoOptionStrobeButtonsProps) {
  const { theme } = useSettingsStore();

  function handleOptionOne() {
    onOptionOne();
    if (haptics) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    }
  }

  function handleOptionTwo() {
    onOptionTwo();
    if (haptics) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    }
  }

  return (
    <View
      style={{
        width: width,
        height: 68,
        paddingVertical: 2,
        flexDirection: "row",
        gap: 8,
        ...style,
      }}
    >
      {/* OP 1 Button */}
      <BounceButton
        style={{
          width: width / 2 - 4,
          height: 64,
          backgroundColor: theme.handle,
          borderTopLeftRadius: 32,
          borderBottomLeftRadius: 32,
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
          overflow: "hidden",
          ...styleOne,
        }}
        onPress={handleOptionOne}
        disabled={disabledOne}
      >
        <StrobeBlur
          tint="light"
          style={{
            width: width / 2 - 4,
            height: 64,
            justifyContent: "center",
            alignItems: "center",
          }}
          disabled={disabledOne || disabledStrobeOne}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: theme.text,
              ...styleLabelOne,
            }}
          >
            {labelOne}
          </Text>
        </StrobeBlur>
      </BounceButton>

      {/* OP 2 Button */}
      <BounceButton
        style={{
          width: width / 2 - 4,
          height: 64,
          backgroundColor: theme.handle,
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          borderTopRightRadius: 32,
          borderBottomRightRadius: 32,
          overflow: "hidden",
          ...styleTwo,
        }}
        onPress={handleOptionTwo}
        disabled={disabledTwo}
      >
        <StrobeBlur
          colors={[
            theme.caka,
            theme.primaryBackground,
            theme.accent,
            theme.tint,
          ]}
          style={{
            width: width / 2 - 4,
            height: 64,
            justifyContent: "center",
            alignItems: "center",
          }}
          disabled={disabledTwo || disabledStrobeTwo}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: theme.text,
              ...styleLabelTwo,
            }}
          >
            {labelTwo}
          </Text>
        </StrobeBlur>
      </BounceButton>
    </View>
  );
}
