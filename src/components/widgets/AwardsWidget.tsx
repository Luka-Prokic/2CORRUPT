import React from "react";
import { useThemeStore } from "../../stores/themeStore";
import ThreeDWidget from "./ThreeDWidget";
import TriangleModel from "./TriangleModel";
import { Dimensions } from "react-native";

interface AwardsWidgetProps {
  size?: "small" | "medium" | "large";
}

const { width } = Dimensions.get("window");
const widgetSize = (width - 40) / 2;

export default function AwardsWidget({
  size = "medium",
}: AwardsWidgetProps) {
  const { theme } = useThemeStore();

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          container: { padding: 12 },
          triangleSize: 0.3,
          text: { fontSize: 12 },
          canvasHeight: 60,
        };
      case "large":
        return {
          container: { padding: 0 },
          triangleSize: 1.4,
          text: { fontSize: 16 },
          canvasHeight: 160,
        };
      default:
        return {
          container: { padding: 16 },
          triangleSize: 0.4,
          text: { fontSize: 14 },
          canvasHeight: 80,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <ThreeDWidget
      width={widgetSize}
      height={widgetSize}
      variant="compact"
    >
      <TriangleModel
        color={theme.fifthBackground}
        size={sizeStyles.triangleSize}
        rotationSpeed={1}
        onClick={() => {}}
      />
    </ThreeDWidget>
  );
}

// AwardsWidget now uses ThreeDWidget for consistent 3D rendering
// The triangle model is handled by TriangleModel component
// All styling is managed by ThreeDWidget for reusability
