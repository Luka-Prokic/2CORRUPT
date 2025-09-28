import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  DimensionValue,
} from "react-native";
import { useThemeStore } from "../../../stores/themeStore"; import Colors from "../../../config/constants/Colors";

interface IListProps {
  width?: DimensionValue;
  background?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
  label?: string;
  hrStart?: "Standard" | "Custom" | "None";
}

const IList: React.FC<IListProps> = ({
  width = "100%",
  background = "transparent",
  children,
  style,
  label,
  hrStart = "Standard",
}) => {
  const { themeName } = useThemeStore(); const theme = Colors[themeName];

  const childrenWithBreaks = React.Children.toArray(children).map(
    (child, index, array) => (
      <View key={index} style={{ flexDirection: "column", width: "100%" }}>
        {child}
        {index < array.length - 1 && (
          <View
            style={
              hrStart === "Standard" ? styles.viewStandard : styles.viewCustom
            }
          >
            {hrStart !== "None" && (
              <View
                style={[styles.hr, { backgroundColor: theme.grayText }, style]}
              />
            )}
          </View>
        )}
      </View>
    )
  );

  return (
    <View style={[styles.container]}>
      {label && (
        <Text style={[styles.label, { color: theme.grayText, width }]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.bubble,
          {
            width,
            backgroundColor: background,
          },
          style,
        ]}
      >
        {childrenWithBreaks}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    userSelect: "none",
  },
  bubble: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  viewStandard: {
    width: "100%",
  },
  viewCustom: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 42,
    width: "100%",
  },

  label: {
    fontSize: 12,
    textTransform: "uppercase",
    padding: 2,
    paddingLeft: 8,
  },
  hr: {
    height: 1,
    opacity: 0.2,
    width: "100%",
  },
});

export default IList;
