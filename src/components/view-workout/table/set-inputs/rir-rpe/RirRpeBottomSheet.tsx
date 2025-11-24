import React, { forwardRef, useState } from "react";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSettingsStore } from "../../../../../stores/settings";
import { CenterCardSlider } from "../../../../ui/CenterCardSlider";
import { useWorkoutStore } from "../../../../../stores/workoutStore";
import * as Haptics from "expo-haptics";
import { Set } from "../../../../../stores/workout/types";
import { WIDTH } from "../../../../../features/Dimensions";

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
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<SheetMode>(startMode);
  const { updateSetInActiveExercise } = useWorkoutStore();

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
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
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
          paddingHorizontal: 16,
          paddingBottom: insets.bottom,
          paddingTop: 8,
        }}
      >
        {/* CENTER CARD SLIDER */}
        <CenterCardSlider
          data={values[mode]}
          cardWidth={WIDTH / 5}
          cardHeight={WIDTH / 5}
          selectedIndex={set[mode] ?? 0}
          selectedCardIndex={set[mode] ?? 0}
          distanceTolerance={2}
          showDistanceBubble
          hideDots
          card={({ item, index }) => (
            <TouchableOpacity
              onPress={() => handleSelect(values[mode][index])}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: index === set[mode] ? theme.text : theme.grayText,
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* HEADER SWITCH */}
        <HeaderSwitch mode={mode} switchMode={switchMode} />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

function HeaderSwitch({
  mode,
  switchMode,
}: {
  mode: SheetMode;
  switchMode: (mode: SheetMode) => void;
}) {
  const { theme } = useSettingsStore();
  const { activeExercise } = useWorkoutStore();
  const modes = activeExercise?.columns.filter(
    (c) => c.toLowerCase() === "rpe" || c.toLowerCase() === "rir"
  );
  if (!modes) return null;
  if (modes.length === 1)
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: theme.handle,
          borderRadius: 22,
          marginBottom: 32,
          height: 44,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: theme.text,
            fontWeight: "600",
          }}
        >
          {modes[0].toUpperCase()}
        </Text>
      </View>
    );

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: theme.border,
        borderRadius: 22,
        marginBottom: 32,
        height: 44,
      }}
    >
      {modes.map((m) => {
        const active = m.toLowerCase() === mode.toLowerCase();
        return (
          <TouchableOpacity
            key={m}
            onPress={() => switchMode(m.toLowerCase() as SheetMode)}
            style={{
              flex: 1,
              backgroundColor: active ? theme.handle : "transparent",
              borderRadius: 22,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: active ? theme.text : theme.handle,
                fontWeight: "600",
              }}
            >
              {m.toUpperCase()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
