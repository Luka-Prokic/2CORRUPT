import {
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import { SplitDayHeader } from "../../splits/split-day/SplitDayHeader";
import { Ionicons } from "@expo/vector-icons";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { hexToRGBA } from "../../../utils/HEXtoRGB";

interface SplitNewDayButtonProps extends TouchableOpacityProps {
  index: number;
  style?: ViewStyle | ViewStyle[];
}

export function SplitNewDayButton({
  index,
  style,
  ...props
}: SplitNewDayButtonProps) {
  const { theme } = useSettingsStore();
  const { widgetUnit } = useWidgetUnit();
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.thirdBackground + "80",
        borderColor: theme.thirdBackground + "40",
        borderRadius: 32,
        borderWidth: 1,
        overflow: "hidden",
        height: widgetUnit,
        width: widgetUnit,
        ...style,
      }}
      {...props}
    >
      <SplitDayHeader dayIndex={index} color={theme.info} />

      <Ionicons name="add" size={64} color={theme.tint} />
    </TouchableOpacity>
  );
}
