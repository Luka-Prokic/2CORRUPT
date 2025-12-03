import { useSettingsStore } from "../../../stores/settingsStore";
import { ThreeDWidget } from "./ThreeDWidget";
import { TriangleModel } from "./TriangleModel";
import { WIDTH } from "../../../utils/Dimensions";

const widgetSize = (WIDTH - 40) / 2;

export function AwardsWidget() {
  const { theme } = useSettingsStore();

  return (
    <ThreeDWidget width={widgetSize} height={widgetSize} variant="compact">
      <TriangleModel
        color={theme.fifthBackground}
        size={1.4}
        rotationSpeed={1}
        onClick={() => {}}
      />
    </ThreeDWidget>
  );
}

// AwardsWidget now uses ThreeDWidget for consistent 3D rendering
// The triangle model is handled by TriangleModel component
// All styling is managed by ThreeDWidget for reusability
