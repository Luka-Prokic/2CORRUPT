import { Text, TextProps, TextStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import { Fragment } from "react";

interface ITextProps extends TextProps {
  text: string;
  style?: TextStyle | TextStyle[];
  size?: number;
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
  color?: string;
  children?: React.ReactNode;
}

export function IText({
  text,
  style,
  size = 28,
  weight = "bold",
  color,
  children,
  ...rest
}: ITextProps) {
  const { theme } = useSettingsStore();
  return (
    <Text
      style={{
        fontSize: size,
        fontWeight: weight,
        color: color ?? theme.text,
        ...style,
      }}
      {...rest}
    >
      {children ? (
        <Fragment>
          {text} {children}
        </Fragment>
      ) : (
        text
      )}
    </Text>
  );
}
