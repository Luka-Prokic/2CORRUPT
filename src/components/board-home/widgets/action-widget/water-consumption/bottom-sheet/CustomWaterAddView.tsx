import { useState } from "react";
import { View } from "react-native";
import { TextButton } from "../../../../../ui/buttons/TextButton";
import { useSettingsStore } from "../../../../../../stores/settings";
import { StrobeButton } from "../../../../../ui/buttons/StrobeButton";
import { useTranslation } from "react-i18next";
import { CenterCardSlider } from "../../../../../ui/sliders/CenterCardSlider";
import { WIDTH } from "../../../../../../utils/Dimensions";
import Animated, { FadeIn } from "react-native-reanimated";
import { useWaterStore } from "../../../../../../stores/water";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { InfoText } from "../../../../../ui/text/InfoText";
import { IBubble } from "../../../../../ui/containers/IBubble";
import { LabeledValue } from "../../../../../ui/misc/LabeledValue";

// ml-based water options
const WATER_ADD_OPTIONS_ML = [
  { title: "50 ml", value: 50 },
  { title: "100 ml", value: 100 },
  { title: "200 ml", value: 200 },
  { title: "250 ml", value: 250 },
  { title: "300 ml", value: 300 },
  { title: "400 ml", value: 400 },
  { title: "500 ml", value: 500 },
  { title: "1000 ml", value: 1000 },
];

// oz-based water options (commonly used)
const WATER_ADD_OPTIONS_OZ = [
  { title: "4 fl.oz", value: 118 },
  { title: "6 fl.oz", value: 177 },
  { title: "8 fl.oz", value: 237 },
  { title: "12 fl.oz", value: 355 },
  { title: "16 fl.oz", value: 473 },
  { title: "20 fl.oz", value: 591 },
  { title: "32 fl.oz", value: 946 },
];

interface CustomWaterAddViewProps {
  setMode: (mode: "custom" | "change-unit" | "change-goal") => void;
  ref: React.RefObject<BottomSheetModal>;
}

export function CustomWaterAddView({ setMode, ref }: CustomWaterAddViewProps) {
  const { theme, units } = useSettingsStore();
  const { t } = useTranslation();
  const {
    waterConsumption,
    setWaterConsumption,
    setIncrement,
    dailyWaterGoal,
  } = useWaterStore();

  const [selectedOption, setSelectedOption] = useState<number>(0);

  // Select the appropriate options based on the unit setting
  const WATER_ADD_OPTIONS =
    units.volume === "fl.oz" ? WATER_ADD_OPTIONS_OZ : WATER_ADD_OPTIONS_ML;

  function handleSelectOption(index: number) {
    setSelectedOption(index);
  }

  function handleAddWater() {
    setWaterConsumption(
      waterConsumption + WATER_ADD_OPTIONS[selectedOption].value
    );
    ref.current?.close();
  }

  function handleSetAmount(amount: number) {
    setIncrement(amount);
    ref.current?.close();
  }

  return (
    <Animated.View entering={FadeIn} style={{ flex: 1, alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: 32,
          gap: 32,
        }}
      >
        <IBubble onPress={() => setMode("change-unit")} size="flexible">
          <LabeledValue
            label={t("units.change-unit")}
            value={units.volume}
            align="center"
            style={{ padding: 8 }}
          />
        </IBubble>
        <IBubble onPress={() => setMode("change-goal")} size="flexible">
          <LabeledValue
            label={t("settings.goal.change-goal")}
            value={dailyWaterGoal}
            align="center"
            style={{ padding: 8 }}
          />
        </IBubble>
      </View>

      {/* Slider component */}
      <CenterCardSlider
        data={WATER_ADD_OPTIONS}
        cardWidth={WIDTH / 3}
        sliderWidth={WIDTH}
        cardHeight={64}
        maxDotsShown={WATER_ADD_OPTIONS.length}
        onSelect={handleSelectOption}
        hapticsModeType="on"
        hapticFeedback
        animationType="flat"
        card={({ item, index }) => (
          <StrobeButton
            title={item.title}
            onPress={() => handleSelectOption(index)}
            onLongPress={() => handleSetAmount(item.value)}
            style={{
              width: WIDTH / 3 - 4,
              height: 64,
              borderRadius: 32,
              backgroundColor:
                selectedOption === index
                  ? theme.text
                  : theme.secondaryBackground,
            }}
            strobeDisabled={selectedOption === index}
            textColor={selectedOption === index ? theme.border : theme.text}
          />
        )}
      />

      {/* Info Text */}
      <InfoText text={t("settings.goal.hold-to-set-as-default-increment")} />

      {/* Add Water Button */}
      <StrobeButton
        title={t("button.add")}
        onPress={handleAddWater}
        style={{
          marginVertical: 16,
          width: WIDTH - 32,
          height: 64,
          borderRadius: 32,
          backgroundColor: theme.tint,
          marginTop: 32,
        }}
        textColor={theme.background}
      />
      <InfoText text={t("settings.goal.add-to-daily-intake")} />
    </Animated.View>
  );
}
