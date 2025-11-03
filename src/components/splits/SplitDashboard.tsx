import { SplitPlan } from "../../stores/workout";
import { SplitNameInput } from "./SplitNameInput";
import { View } from "react-native";
import { useSettingsStore } from "../../stores/settingsStore";
import { LabeledValue } from "../ui/misc/LabeledValue";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";

interface SplitDashboardProps {
  split: SplitPlan;
}

export function SplitDashboard({ split }: SplitDashboardProps) {
  const { theme } = useSettingsStore();
  const { widgetUnit, fullWidth } = useWidgetUnit();
  return (
    <View
      style={{
        gap: 16,
        alignItems: "center",
        marginBottom: 16,
        width: fullWidth,
      }}
    >
      <SplitNameInput split={split} />
      <View style={{ flexDirection: "row", gap: 8 }}>
        <LabeledValue
          label="Total Days"
          value={split.splitLength}
          style={{ width: widgetUnit }}
        />
        <LabeledValue
          label="Active Days"
          value={split.activeLength}
          style={{ width: widgetUnit }}
        />
      </View>
    </View>
  );
}
