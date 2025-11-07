import { ViewStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { WidgetContainer } from "./WidgetContainer";
import { Fragment } from "react";

interface BlankWidgetProps {
  onPress?: () => void;
  style?: ViewStyle;
}

export function BlankWidget({ onPress, style }: BlankWidgetProps) {
  const { theme } = useSettingsStore();

  return (
    <WidgetContainer style={style}>
      <Fragment />
    </WidgetContainer>
  );
}
