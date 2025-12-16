import { IText } from "../text/IText";
import { useTranslation } from "react-i18next";
import { SegmentedButtons } from "../buttons/SegmentedButtons";
import { DescriptionText } from "../text/DescriptionText";
import { TwoOptionStrobeButtons } from "../buttons/TwoOptionStrobeButtons";
import Animated, {
  BaseAnimationBuilder,
  FadeIn,
} from "react-native-reanimated";
import { useSettingsStore } from "../../../stores/settingsStore";
import { Fragment } from "react";
import { InfoText } from "../text/InfoText";
import { useDisplayedUnits } from "../../../features/translate/useDisplayedUnits";
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
  animatedTitleEntering?: BaseAnimationBuilder;
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
  animatedTitleEntering,
}: ChangeGoalViewProps) {
  const { t } = useTranslation();
  const { units, theme } = useSettingsStore();
  const { fromMl, toMl } = useDisplayedUnits();
  const { fullWidth } = useWidgetUnit();

  return (
    <Animated.View
      entering={FadeIn}
      style={{ flex: 1, gap: 16, alignItems: "center" }}
    >
      <Animated.View entering={animatedTitleEntering}>
        <IText text={title} size={32} style={{ textAlign: "center" }} />
      </Animated.View>

      <IText text={`${fromMl(goal)} ${units.volume}`} color={theme.accent} />

      {options && (
        <SegmentedButtons
          options={options}
          value={Math.max(Math.min(goal, max), min).toString()}
          onChange={(val) =>
            onChange(toMl(Math.max(Math.min(Number(val), max), min)))
          }
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
              units.volume === "fl.oz" ? "~" : ""
            }${fromMl(increment)} ${units.volume}.`}
          />
        </Fragment>
      )}
      {description && <DescriptionText text={description} />}
    </Animated.View>
  );
}
