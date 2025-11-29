import { DimensionValue, ViewStyle, View } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { MidText } from "../text/MidText";
import { StrobeButton, StrobeButtonProps } from "./StrobeButton";

interface StrobeOptionButtonProps extends StrobeButtonProps {
  title: string;
  width?: DimensionValue;
  height?: DimensionValue;
  icon?: React.ReactNode;
  style?: ViewStyle;
  color?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function StrobeOptionButton({
  title,
  icon,
  width = "100%",
  height = 34,
  style,
  color,
  disabled,
  children,
  ...strobeButtonProps
}: StrobeOptionButtonProps) {
  const { theme } = useSettingsStore();

  function renderContent() {
    if (children) {
      return children;
    }
    return (
      <View
        style={{
          flex: 1,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 8,
        }}
      >
        <MidText text={title} style={{ color: color || theme.text }} />
        <View
          style={{
            flexDirection: "row-reverse",
            alignItems: "center",
            gap: 8,
          }}
        >
          {icon}
        </View>
      </View>
    );
  }

  return (
    <StrobeButton
      {...strobeButtonProps}
      style={{
        width,
        height,
        ...style,
      }}
    >
      {renderContent()}
    </StrobeButton>
  );
}
