import { Set } from "../../../../stores/workout/types";
import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { useRef, Fragment } from "react";
import { RirRpeBottomSheet } from "./rir-rpe/RirRpeBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { hexToRGBA } from "../../../../features/HEXtoRGB";

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
            borderRadius: 8,
            backgroundColor: hexToRGBA(theme.background, disabled ? 0 : 0.4),
            alignItems: "center",
            justifyContent: "center",
          },
          style,
        ]}
        disabled={disabled}
      >
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
