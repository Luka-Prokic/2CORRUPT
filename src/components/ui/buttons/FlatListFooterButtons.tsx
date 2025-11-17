import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settings";

interface FlatListFooterButtonProps {
  onPress: () => void;
  title: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export function FlatListFooterButton({
  onPress,
  title,
  containerStyle,
  textStyle,
}: FlatListFooterButtonProps) {
  const { theme } = useSettingsStore();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          alignItems: "center",
          marginTop: 8,
        },
        containerStyle,
      ]}
    >
      <Text style={[{ fontWeight: "600", color: theme.handle }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
