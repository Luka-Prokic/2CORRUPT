import { DimensionValue, ViewStyle, View, TextStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { MidText } from "../text/MidText";
import { StrobeButton, StrobeButtonProps } from "./StrobeButton";
import { useTranslation } from "react-i18next";

interface StrobeOptionButtonProps extends StrobeButtonProps {
  title: string;
  width?: DimensionValue;
  height?: DimensionValue;
  icon?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  styleContent?: ViewStyle | ViewStyle[];
  styleTitle?: TextStyle | TextStyle[];
  color?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  stateIndicatorVisible?: boolean;
  state?: boolean;
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
}

export function StrobeOptionButton({
  title,
  icon,
  width = "100%",
  height = 34,
  style,
  styleContent,
  styleTitle,
  color,
  disabled,
  children,
  justifyContent = "flex-start",
  stateIndicatorVisible = false,
  state = false,
  ...strobeButtonProps
}: StrobeOptionButtonProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
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
          justifyContent,
          paddingHorizontal: 8,
          ...styleContent,
        }}
      >
        <MidText
          text={title}
          style={{ color: color || theme.text, ...styleTitle }}
        />

        <View
          style={{
            flexDirection: "row-reverse",
            alignItems: "center",
            gap: 8,
          }}
        >
          {icon}
        </View>

        {stateIndicatorVisible && (
          <MidText
            text={state ? t("button.on") : t("button.off")}
            style={{ color: theme.text, fontSize: 16, fontWeight: "bold" }}
          />
        )}
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
