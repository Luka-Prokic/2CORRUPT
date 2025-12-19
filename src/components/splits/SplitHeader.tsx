import { SplitPlan } from "../../stores/workout";
import { SplitNameInput } from "./SplitNameInput";
import { View } from "react-native";
import { LabeledValue } from "../ui/misc/LabeledValue";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";
import { useTranslation } from "react-i18next";
import { IBubble } from "../ui/containers/IBubble";

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
        marginBottom: 8,
        width: fullWidth,
      }}
    >
      <SplitNameInput split={split} />

      <View style={{ flexDirection: "row", gap: 8 }}>
        <IBubble size="flexible">
          <LabeledValue
            label={t("splits.total-days")}
            value={split.splitLength}
            style={{ width: widgetUnit, padding: 8 }}
            align="center"
          />
        </IBubble>

        <IBubble size="flexible">
          <LabeledValue
            label={t("splits.active-days")}
            value={split.activeLength}
            style={{ width: widgetUnit, padding: 8 }}
            align="center"
          />
        </IBubble>
      </View>
    </View>
  );
}
