import { BlurView } from "expo-blur";
import { useWidgetUnit } from "../../../../../features/widgets/useWidgetUnit";
import { useSettingsStore } from "../../../../../stores/settingsStore";

export function ActiveSessionFooter() {
  const { fullWidth } = useWidgetUnit();
  const { theme } = useSettingsStore();

  return (
    <BlurView
      style={{
        width: fullWidth,
        height: 44,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        left: 0,
      }}
    ></BlurView>
  );
}
