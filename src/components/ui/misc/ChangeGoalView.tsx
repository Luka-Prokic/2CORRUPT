import { IText } from "../text/IText";
import { useTranslation } from "react-i18next";
import { SegmentedButtons } from "../buttons/SegmentedButtons";
import { DescriptionText } from "../text/DescriptionText";
import { TwoOptionStrobeButtons } from "../buttons/TwoOptionStrobeButtons";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSettingsStore } from "../../../stores/settingsStore";
import { Fragment } from "react";
import { InfoText } from "../text/InfoText";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";

interface ChangeGoalViewProps {
  title?: string;
  goal: number;
  options?: string[];
  option1?: string;
  option2?: string;
  increment?: number;
  value: number;
  onChange: (value: number) => void;
  description?: string;
  min?: number;
  max?: number;
  unit?: string;
}

export function ChangeGoalView({
  title,
  goal,
  options,
  option1,
  option2,
  increment,
  onChange,
  description,
  min,
  max,
  unit,
}: ChangeGoalViewProps) {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();
  const { fullWidth } = useWidgetUnit();

  return (
    <Animated.View
      entering={FadeIn}
      style={{ flex: 1, gap: 16, alignItems: "center" }}
    >
      <IText text={title} style={{ textAlign: "center" }} />

      <IText text={`${goal} ${unit}`} color={theme.accent} size={52} />

      {options && (
        <SegmentedButtons
          options={options}
          value={Math.max(Math.min(goal, max), min).toString()}
          onChange={(val) => onChange(Number(val))}
          width={fullWidth - 32}
          haptics
        />
      )}

      {option1 && option2 && (
        <Fragment>
          <TwoOptionStrobeButtons
            labelOne={option1}
            labelTwo={option2}
            onOptionOne={() => onChange(Math.max(goal - increment, min))}
            onOptionTwo={() => onChange(Math.min(goal + increment, max))}
            disabledOne={goal <= min}
            disabledTwo={goal >= max}
            styleOne={{ backgroundColor: theme.border }}
            styleTwo={{ backgroundColor: theme.border }}
            width={fullWidth - 32}
            haptics
          />
          <InfoText
            text={`${t("settings.goal.increment-description")} ${
              unit === "fl.oz" ? "~" : ""
            }${increment} ${unit}.`}
          />
        </Fragment>
      )}
      {description && <DescriptionText text={description} />}
    </Animated.View>
  );
}
