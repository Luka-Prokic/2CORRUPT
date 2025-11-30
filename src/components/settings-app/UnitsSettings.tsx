import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../../stores/settingsStore";
import { Ionicons } from "@expo/vector-icons";
import { MidText } from "../ui/text/MidText";
import { Pressable } from "react-native";
import { InfoText } from "../ui/text/InfoText";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";
import { CenterCardSlider } from "../ui/sliders/CenterCardSlider";
import { SwitchButton } from "../ui/buttons/SwitchButton";
import { ExpandableBubble } from "../ui/containers/ExpendableBubble";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { StrobeOptionButton } from "../ui/buttons/StrobeOptionButton";
import { StrobeBlur } from "../ui/misc/StrobeBlur";

const UNITS_SETTINGS = [
  {
    icon: "scale",
    option1: "kg",
    option2: "lbs",
    unit: "weight",
  },
  {
    icon: "body",
    option1: "cm",
    option2: "in",
    unit: "length",
  },
  {
    icon: "water",
    option1: "ml",
    option2: "fl.oz",
    unit: "volume",
  },
  {
    icon: "thermometer",
    option1: "°C",
    option2: "°F",
    unit: "temperature",
  },
] as const;

export function UnitsSettings() {
  const { t } = useTranslation();
  const { fullWidth } = useWidgetUnit();

  return (
    <ExpandableBubble
      collapsedChildren={collapsedChildren()}
      expandedChildren={expandedChildren()}
      expandedHeight={128 + fullWidth / 2}
      collapsedHeight={108}
    >
      <MidText
        text={t(`settings.units`)}
        style={{
          lineHeight: 64,
        }}
      />
    </ExpandableBubble>
  );
}

function collapsedChildren() {
  const { t } = useTranslation();
  const { units } = useSettingsStore();
  const { themeMode } = useSettingsStore();

  return (
    <StrobeBlur
      tint={themeMode}
      style={{
        height: 44,
        width: "100%",
      }}
      styleContent={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MidText
        text={`${t(`units.weight.${units.weight}`)} | ${t(
          `units.length.${units.length}`
        )} | ${t(`units.volume.${units.volume}`)} | ${t(
          `units.temperature.${units.temperature}`
        )}`}
      />
    </StrobeBlur>
  );
}

function expandedChildren() {
  const { t } = useTranslation();
  const { fullWidth } = useWidgetUnit();

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <CenterCardSlider
        data={UNITS_SETTINGS}
        cardHeight={fullWidth / 2}
        cardWidth={fullWidth / 2}
        card={({ item }) => (
          <UnitCard
            icon={item.icon}
            option1={item.option1}
            option2={item.option2}
            unit={item.unit}
          />
        )}
      />

      <InfoText
        text={t(`settings.units-info`)}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
      />
    </Animated.View>
  );
}

function UnitCard({
  icon,
  option1,
  option2,
  unit,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  option1: string;
  option2: string;
  unit: "weight" | "length" | "volume" | "temperature";
}) {
  const { units, setUnits, theme } = useSettingsStore();
  const { fullWidth } = useWidgetUnit();
  const { t } = useTranslation();

  const current = units[unit]; // "kg" or "lbs", etc.

  return (
    <Pressable
      style={{
        alignItems: "center",
        justifyContent: "space-between",
        width: fullWidth / 2,
        height: fullWidth / 2,
        backgroundColor: theme.text + "10",
        padding: 16,
        borderRadius: 16,
      }}
    >
      <MidText text={t(`settings.${unit}`)} />
      <Ionicons name={icon} size={32} color={theme.info} />

      <SwitchButton
        option1={option1}
        option2={option2}
        value={current}
        onChange={(val) =>
          setUnits({
            ...units,
            [unit]: val,
          })
        }
        width={fullWidth / 2 - 16}
        haptics
      />
    </Pressable>
  );
}
