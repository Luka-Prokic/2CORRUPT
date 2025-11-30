import { Set } from "../../../../stores/workout/types";
import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { useRef, Fragment } from "react";
import { RirRpeBottomSheet } from "./RirRpeBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { hexToRGBA } from "../../../../features/HEXtoRGB";
import { Ionicons } from "@expo/vector-icons";

interface InputRIRProps {
  set: Set;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export function InputRIR({ set, style, textStyle, disabled }: InputRIRProps) {
  const { theme } = useSettingsStore();
  const { rir } = set;
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
          {rir === 5 ? "5+" : rir ? rir : "-"}
        </Text>
      </TouchableOpacity>

      <RirRpeBottomSheet startMode="rir" set={set} ref={bottomSheetRef} />
    </Fragment>
  );
}
