import { Text, TextStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import { Fragment } from "react";

export function DescriptionText({
  text,
  style,
  short = false,
  children,
}: {
  text: string;
  style?: TextStyle | TextStyle[];
  short?: boolean; // if true, max 3 lines
  children?: React.ReactNode;
}) {
  const { theme } = useSettingsStore();
  return (
    <Text
      numberOfLines={short ? 3 : undefined} // limit to 3 lines if short
      ellipsizeMode={short ? "tail" : undefined} // show ellipsis if truncated
      style={{
        color: theme.info,
        fontSize: 16,
        fontWeight: "500",
        letterSpacing: -0.5,
        lineHeight: 18,
        textAlign: "center",
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
