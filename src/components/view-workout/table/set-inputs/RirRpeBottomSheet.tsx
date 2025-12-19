import { forwardRef, useState } from "react";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSettingsStore } from "../../../../stores/settings";
import { CenterCardSlider } from "../../../ui/sliders/CenterCardSlider";
import { useWorkoutStore } from "../../../../stores/workoutStore";
import { Set } from "../../../../stores/workout/types";
import { WIDTH } from "../../../../utils/Dimensions";
import { SwitchButton } from "../../../ui/buttons/SwitchButton";
import { DescriptionText } from "../../../ui/text/DescriptionText";
import { RirRpeCheatSheet } from "./RirRpeCheetSheet";
import { useTranslation } from "react-i18next";
import { InfoText } from "../../../ui/text/InfoText";
import { useHaptics } from "../../../../features/ui/useHaptics";

export type SheetMode = "rir" | "rpe";

interface RirRpeBottomSheetProps {
  set: Set;
  startMode: SheetMode;
}

export const RirRpeBottomSheet = forwardRef<
  BottomSheetModal,
  RirRpeBottomSheetProps
>(({ set, startMode }, ref) => {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<SheetMode>(startMode);
  const { updateSetInActiveExercise } = useWorkoutStore();
  const triggerHapticsHeavy = useHaptics({
    modeType: "on",
    hapticType: "heavy",
  });

  const switchMode = (m: SheetMode) => {
    setMode(m);
  };

  // Values for RIR/RPE
  const values = {
    rir: ["0", "1", "2", "3", "4", "5+"],
    rpe: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  };

  const handleSelect = (item: string) => {
    updateSetInActiveExercise(set.id, {
      [mode]: item === "5+" ? 5 : parseInt(item),
    });
    triggerHapticsHeavy();
  };

  return (
    <BottomSheetModal
      ref={ref}
      enablePanDownToClose
      enableDismissOnClose
      handleIndicatorStyle={{ backgroundColor: theme.info }}
      backgroundStyle={{ backgroundColor: theme.navBackground }}
      keyboardBehavior="fillParent"
      keyboardBlurBehavior="restore"
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="close"
          opacity={0.2}
        />
      )}
      onDismiss={() => setMode(startMode)}
    >
      <BottomSheetView
        style={{
          flex: 1,
          paddingBottom: insets.bottom + 8,
          paddingTop: 8,
        }}
      >
        <InfoText text={t("button.tap-select")} />

        {/* CENTER CARD SLIDER */}
        <CenterCardSlider
          data={values[mode]}
          cardWidth={WIDTH / 5}
          cardHeight={WIDTH / 5}
          selectedIndex={set[mode] ?? 0}
          selectedCardIndex={set[mode] ?? 0}
          distanceTolerance={2}
          sliderWidth={WIDTH}
          animationType="wheel"
          showDistanceBubble={!!set[mode]}
          hideDots
          card={({ item, index }) => (
            <TouchableOpacity
              onPress={() => handleSelect(values[mode][index])}
              style={{
                height: WIDTH / 5,
                width: WIDTH / 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: index === set[mode] ? theme.tint : theme.grayText,
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* RIR/RPE SWITCH */}
        <Switch mode={mode} switchMode={switchMode} />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

function Switch({
  mode,
  switchMode,
}: {
  mode: SheetMode;
  switchMode: (mode: SheetMode) => void;
}) {
  const { activeExercise } = useWorkoutStore();
  const { t } = useTranslation();
  // extract RPE / RIR columns deterministically
  const modes = (activeExercise?.columns ?? [])
    .map((c) => c.toLowerCase())
    .filter((c) => c === "rpe" || c === "rir");

  // nothing found → no UI
  if (modes.length === 0) return null;

  const option1 = modes[0].toUpperCase();
  const option2 = modes[1]?.toUpperCase(); // may be undefined (single mode)

  return (
    <View
      style={{
        alignItems: "center",
        gap: 16,
        paddingHorizontal: 16,
      }}
    >
      <SwitchButton
        option1={option1}
        option2={option2} // undefined → automatically single mode
        value={mode.toUpperCase()}
        onChange={(val) => switchMode(val.toLowerCase() as SheetMode)}
        haptics
      />
      <DescriptionText
        text={
          mode === "rir"
            ? t("workout-view.rir-description")
            : t("workout-view.rpe-description")
        }
      />

      {/* RIR/RPE CHEAT SHEET */}
      <RirRpeCheatSheet mode={mode} />
    </View>
  );
}
