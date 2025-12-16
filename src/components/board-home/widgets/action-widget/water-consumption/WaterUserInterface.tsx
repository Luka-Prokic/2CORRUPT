import { InfoText } from "../../../../ui/text/InfoText";
import { IText } from "../../../../ui/text/IText";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../../../stores/settingsStore";
import { useWidgetUnit } from "../../../../../features/widgets/useWidgetUnit";
import { useWaterStore } from "../../../../../stores/water";
import { Fragment, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { WaterBottomSheet } from "./bottom-sheet/WaterBottomSheet";
import { useDisplayedUnits } from "../../../../../features/translate/useDisplayedUnits";
import { useTranslation } from "react-i18next";
import { BounceButton } from "../../../../ui/buttons/BounceButton";

export function WaterUserInterface() {
  const { theme, units } = useSettingsStore();
  const { widgetUnit } = useWidgetUnit();
  const { t } = useTranslation();
  const { waterConsumption, increment, setWaterConsumption, dailyWaterGoal } =
    useWaterStore();
  const { fromMl } = useDisplayedUnits();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  function openBottomSheet() {
    bottomSheetRef.current?.present();
  }

  function incrementWaterConsumption() {
    if (waterConsumption + increment > 6000) setWaterConsumption(6000);
    else setWaterConsumption(waterConsumption + increment);
  }

  function decrementWaterConsumption() {
    if (waterConsumption - increment < 0) setWaterConsumption(0);
    else setWaterConsumption(waterConsumption - increment);
  }

  return (
    <Fragment>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          height: widgetUnit,
        }}
      >
        <IText
          text={`${fromMl(waterConsumption)}/${fromMl(dailyWaterGoal)} ${
            units.volume
          }`}
          color={theme.border}
        />

        <BounceButton
          onPress={openBottomSheet}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            padding: 16,
            zIndex: 1,
          }}
        >
          <Ionicons name="ellipse" size={64} color={theme.accent} />
          <Ionicons
            name="pint-outline"
            size={32}
            color={theme.border}
            style={{ position: "absolute" }}
          />
        </BounceButton>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={decrementWaterConsumption}
            disabled={waterConsumption <= 0}
            style={{ opacity: waterConsumption <= 0 ? 0.4 : 1 }}
          >
            <Ionicons name="remove-circle" size={64} color={theme.border} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={incrementWaterConsumption}
            disabled={waterConsumption >= 6000}
            style={{ opacity: waterConsumption >= 6000 ? 0.4 : 1 }}
          >
            <Ionicons name="add-circle" size={64} color={theme.border} />
          </TouchableOpacity>
        </View>
        <InfoText
          text={`${t("settings.goal.increment-description")} ${fromMl(
            increment
          )} ${units.volume}.`}
          color={theme.border}
        />
      </View>
      <WaterBottomSheet ref={bottomSheetRef} />
    </Fragment>
  );
}
