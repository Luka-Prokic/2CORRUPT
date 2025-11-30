import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../../stores/settingsStore";
import { IBubble } from "../ui/containers/IBubbleView";
import { Ionicons } from "@expo/vector-icons";
import { MidText } from "../ui/text/MidText";
import { View } from "react-native";
import { InfoText } from "../ui/text/InfoText";
import { useWidgetUnit } from "../../features/widgets/useWidgetUnit";
import { CenterCardSlider } from "../ui/sliders/CenterCardSlider";
import { SwitchButton } from "../ui/buttons/SwitchButton";

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
  const { widgetUnit, fullWidth } = useWidgetUnit();

  return (
    <IBubble size="flexible">
      <MidText
        text={t(`settings.units`)}
        style={{
          lineHeight: 64,
        }}
      />
      <CenterCardSlider
        data={UNITS_SETTINGS}
        cardHeight={widgetUnit}
        cardWidth={widgetUnit}
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
    </IBubble>
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
  const { widgetUnit } = useWidgetUnit();
  const { t } = useTranslation();

  const current = units[unit]; // "kg" or "lbs", etc.
  const isOption1 = current === option1;

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "space-between",
        width: widgetUnit,
        height: widgetUnit,
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
        width={widgetUnit * 0.9}
        haptics
      />
    </View>
  );
}
