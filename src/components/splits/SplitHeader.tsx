import { SplitPlan } from "../../stores/workout";
import { SplitNameInput } from "./SplitNameInput";
import { View } from "react-native";
import { LabeledValue } from "../ui/misc/LabeledValue";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";
import { useTranslation } from "react-i18next";

interface SplitHeaderProps {
  split: SplitPlan;
}

export function SplitHeader({ split }: SplitHeaderProps) {
  const { widgetUnit, fullWidth } = useWidgetUnit();
  const { t } = useTranslation();
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
          label={t("splits.total-days")}
          value={split.splitLength}
          style={{ width: widgetUnit }}
        />
        <LabeledValue
          label={t("splits.active-days")}
          value={split.activeLength}
          style={{ width: widgetUnit }}
        />
      </View>
    </View>
  );
}
