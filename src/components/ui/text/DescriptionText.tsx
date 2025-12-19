import { Text, TextProps, TextStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import { Fragment } from "react";

interface DescriptionTextProps extends TextProps {
  text: string;
  style?: TextStyle | TextStyle[];
  short?: boolean; // if true, max 3 lines
  children?: React.ReactNode;
  color?: string;
  align?: "left" | "center" | "right";
  weight?:
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "bold"
    | "800"
    | "900";
}

export function DescriptionText({
  text,
  style,
  short = false,
  children,
  color,
  align = "center",
  weight = "500",
  ...props
}: DescriptionTextProps) {
  const { theme } = useSettingsStore();
  return (
    <Text
      {...props}
      numberOfLines={short ? 3 : undefined} // limit to 3 lines if short
      ellipsizeMode={short ? "tail" : undefined} // show ellipsis if truncated
      style={{
        color: color ?? theme.info,
        fontSize: 16,
        fontWeight: weight,
        letterSpacing: -0.5,
        lineHeight: 18,
        textAlign: align,
        ...style,
      }}
    >
      {children ? (
        <Fragment>
          {children} {text}
        </Fragment>
      ) : (
        text
      )}
    </Text>
  );
}
