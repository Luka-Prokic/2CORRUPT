import { useTranslation } from "react-i18next";
import { useSettingsStore } from "../../stores/settingsStore";
import { IBubble } from "../ui/containers/IBubbleView";
import { ToggleButton } from "../ui/buttons/ToggleButton";
import { Ionicons } from "@expo/vector-icons";
import { MidText } from "../ui/text/MidText";
import { View } from "react-native";
import { InfoText } from "../ui/text/InfoText";

export function UnitsSettings() {
  const { t } = useTranslation();
  const { units, setUnits, theme } = useSettingsStore();

  return (
    <IBubble size="flexible">
      <MidText
        text={t(`settings.units`)}
        style={{
          lineHeight: 64,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: 16,
        }}
      >
        <Ionicons name="scale" size={32} color={theme.grayText} />
        <ToggleButton
          haptics
          activeText={t(`units.weight.kg`)}
          inactiveText={t(`units.weight.lbs`)}
          isActive={units.weight === "kg"}
          onToggle={() => {
            setUnits({
              ...units,
              weight: units.weight === "kg" ? "lbs" : "kg",
            });
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: 16,
        }}
      >
        <Ionicons name="body" size={32} color={theme.grayText} />
        <ToggleButton
          haptics
          activeText={t(`units.length.cm`)}
          inactiveText={t(`units.length.in`)}
          isActive={units.length === "cm"}
          onToggle={() => {
            setUnits({
              ...units,
              length: units.length === "cm" ? "in" : "cm",
            });
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: 16,
        }}
      >
        <Ionicons name="water" size={32} color={theme.grayText} />
        <ToggleButton
          haptics
          activeText={t(`units.volume.ml`)}
          inactiveText={t(`units.volume.fl.oz`)}
          isActive={units.volume === "ml"}
          onToggle={() => {
            setUnits({
              ...units,
              volume: units.volume === "ml" ? "fl.oz" : "ml",
            });
          }}
        />
      </View>
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
