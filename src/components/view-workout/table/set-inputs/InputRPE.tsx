import { Set } from "../../../../stores/workout/types";
import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { useRef, Fragment } from "react";
import { RirRpeBottomSheet } from "./RirRpeBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { hexToRGBA } from "../../../../features/HEXtoRGB";
import { Ionicons } from "@expo/vector-icons";

interface InputRPEProps {
  set: Set;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export function InputRPE({ set, style, textStyle, disabled }: InputRPEProps) {
  const { theme } = useSettingsStore();
  const { rpe } = set;
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openSheet = () => {
    if (disabled) return;
    bottomSheetRef.current?.present();
  };

  return (
    <Fragment>
      <TouchableOpacity
        onPress={openSheet}
        style={[
          {
            width: 44,
            height: 44,
            alignItems: "center",
            justifyContent: "center",
          },
          style,
        ]}
        disabled={disabled}
      >
        <Ionicons
          name="ellipse"
          color={hexToRGBA(theme.background, disabled ? 0 : 0.4)}
          size={44}
          style={{ position: "absolute" }}
        />
        <Text
          style={[
            {
              fontSize: 16,
              fontWeight: "600",
              color: theme.text,
            },
            textStyle,
          ]}
        >
          {rpe ?? "-"}
        </Text>
      </TouchableOpacity>

      <RirRpeBottomSheet startMode="rpe" set={set} ref={bottomSheetRef} />
    </Fragment>
  );
}
