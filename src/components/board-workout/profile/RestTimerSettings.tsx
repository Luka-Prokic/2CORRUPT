import { useState } from "react";
import { BounceButton } from "../../../ui/buttons/BounceButton";
import { Text, View } from "react-native";
import { WIDTH } from "../../../../features/Dimensions";
import { hexToRGBA } from "../../../../features/HEXtoRGB";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { Ionicons } from "@expo/vector-icons";

export function RestTimerSettings() {
  const { theme } = useSettingsStore();
  const [noRest, setNoRest] = useState(false);
  const [rest, setRest] = useState(180);

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        // backgroundColor: "blue",
        height: 34,
        width: WIDTH * 0.5 - 20,
        borderRadius: 22,
        overflow: "hidden",
      }}
    >
      <BounceButton
        style={{
          height: 34,
          width: 44,
          borderTopLeftRadius: 22,
          borderBottomLeftRadius: 22,
          backgroundColor: hexToRGBA(theme.grayText, noRest ? 1 : 0.5),
        }}
        onPress={() => {
          setNoRest(!noRest);
        }}
      >
        <Ionicons
          name={noRest ? "checkmark" : "close"}
          size={24}
          color={noRest ? theme.secondaryText : theme.text}
        />
      </BounceButton>
      <BounceButton
        style={{
          height: 34,
          width: WIDTH * 0.5 - 72,
          borderTopRightRadius: 22,
          borderBottomRightRadius: 22,
          backgroundColor: hexToRGBA(theme.grayText, 0.4),
        }}
        disabled={noRest}
      >
        <Ionicons name="stopwatch-outline" size={24} color={theme.text} />
        <Text
          style={{
            color: theme.text,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {rest / 60} min
        </Text>
      </BounceButton>
    </View>
  );
}
