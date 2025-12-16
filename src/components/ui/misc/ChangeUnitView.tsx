import { Units } from "../../../stores/settings/types";
import { IText } from "../text/IText";
import { useTranslation } from "react-i18next";
import { SegmentedButtons } from "../buttons/SegmentedButtons";
import { SwitchButton } from "../buttons/SwitchButton";
import { DescriptionText } from "../text/DescriptionText";
import Animated, {
  BaseAnimationBuilder,
  FadeIn,
} from "react-native-reanimated";
import { useSettingsStore } from "../../../stores/settingsStore";

interface ChangeUnitViewProps {
  title?: string;
  unit: Units;
  options?: string[];
  option1?: string;
  option2?: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
  animatedTitleEntering?: BaseAnimationBuilder;
}

export function ChangeUnitView({
  title,
  unit,
  options,
  option1,
  option2,
  value,
  onChange,
  description,
  animatedTitleEntering,
}: ChangeUnitViewProps) {
  const { t } = useTranslation();
  const { theme } = useSettingsStore();

  return (
    <Animated.View
      entering={FadeIn}
      style={{ flex: 1, gap: 16, alignItems: "center" }}
    >
      <Animated.View entering={animatedTitleEntering}>
        <IText text={title} size={32} />
      </Animated.View>

      <IText text={t(`settings.${unit}`)} color={theme.accent} />

      {options && (
        <SegmentedButtons options={options} value={value} onChange={onChange} />
      )}

      {option1 && option2 && (
        <SwitchButton
          option1={option1}
          option2={option2}
          value={value}
          onChange={onChange}
        />
      )}
      {description && <DescriptionText text={description} />}
    </Animated.View>
  );
}
