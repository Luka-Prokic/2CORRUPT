import React, { useRef, useEffect } from "react";
import { View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { scheduleOnRN } from "react-native-worklets";
import { HEIGHT } from "../../utils/Dimensions";

const COLLAPSED_INDEX = 0;
const EXPANDED_INDEX = 1;
const DRAG_THRESHOLD = 24;

const FOCUS_HEIGHT = HEIGHT - 120;

export function DashBoardTwo({
  sheetOpen,
  togglePanel,
  disabled,
  upperSection,
  lowerSection,
}) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Upper section pan gesture
  const upperPan = Gesture.Pan()
    .enabled(!disabled)
    .onEnd((e) => {
      if (e.translationY < -DRAG_THRESHOLD) {
        scheduleOnRN(bottomSheetRef.current?.snapToIndex, EXPANDED_INDEX);
      } else if (e.translationY > DRAG_THRESHOLD) {
        scheduleOnRN(bottomSheetRef.current?.snapToIndex, COLLAPSED_INDEX);
      }
    });

  // Parallax style
  const animatedIndex = useRef({ value: sheetOpen ? 1 : 0 }).current;
  const upperParallaxStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          animatedIndex.value,
          [0, 1],
          [0, -FOCUS_HEIGHT * 0.25],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  // Sync sheetOpen → BottomSheet
  useEffect(() => {
    scheduleOnRN(
      bottomSheetRef.current?.snapToIndex,
      sheetOpen ? EXPANDED_INDEX : COLLAPSED_INDEX
    );
  }, [sheetOpen]);

  return (
    <View style={{ flex: 1 }}>
      <GestureDetector gesture={upperPan}>
        <Animated.View style={[{ height: FOCUS_HEIGHT }, upperParallaxStyle]}>
          {upperSection}
        </Animated.View>
      </GestureDetector>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[88, "80%"]}
        index={COLLAPSED_INDEX}
        onChange={(index) => {
          animatedIndex.value = index; // update for parallax
          if (index === EXPANDED_INDEX && !sheetOpen) togglePanel();
          if (index === COLLAPSED_INDEX && sheetOpen) togglePanel();
        }}
        enableOverDrag={false}
        enablePanDownToClose={false}
        enableHandlePanningGesture={!disabled}
        enableContentPanningGesture={!disabled}
      >
        {sheetOpen && lowerSection}
      </BottomSheet>
    </View>
  );
}
