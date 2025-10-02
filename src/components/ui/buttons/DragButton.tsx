import React from "react";
import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

interface DragButtonProps {
  label: string;
  onSlideComplete: () => void;
  width?: number;
  height?: number;
}

const { width: screenWidth } = Dimensions.get("window");

const DragButton: React.FC<DragButtonProps> = ({
  label,
  onSlideComplete,
  width = 300,
  height = 60,
}) => {
  const translateX = useSharedValue(0);
  const isCompleted = useSharedValue(false);

  const trackWidth = width;
  const knobSize = height - 8; // 4px margin on each side
  const maxTranslateX = trackWidth - knobSize - 8; // 4px margin on each side

  const triggerHapticFeedback = () => {
    // Haptic feedback can be added later if expo-haptics is installed
    console.log("Slide completed!");
  };

  const gestureHandler = (event: PanGestureHandlerGestureEvent) => {
    'worklet';
    const { translationX, state } = event.nativeEvent;
    
    if (state === 2) { // ACTIVE
      const newTranslateX = translationX;
      
      // Constrain the movement within bounds
      if (newTranslateX >= 0 && newTranslateX <= maxTranslateX) {
        translateX.value = newTranslateX;
      } else if (newTranslateX < 0) {
        translateX.value = 0;
      } else {
        translateX.value = maxTranslateX;
      }
    } else if (state === 5) { // END
      const threshold = maxTranslateX * 0.8; // Complete when 80% of the way

      if (translateX.value >= threshold && !isCompleted.value) {
        // Slide completed
        isCompleted.value = true;
        translateX.value = withSpring(maxTranslateX, {
          damping: 15,
          stiffness: 150,
        });
        runOnJS(triggerHapticFeedback)();
        runOnJS(onSlideComplete)();
      } else {
        // Snap back to start
        translateX.value = withSpring(0, {
          damping: 15,
          stiffness: 150,
        });
      }
    }
  };

  const knobAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      shadowOpacity: interpolate(
        translateX.value,
        [0, maxTranslateX],
        [0.2, 0.4],
        Extrapolate.CLAMP
      ),
    };
  });

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const progress = translateX.value / maxTranslateX;
    const backgroundColorOpacity = interpolate(
      progress,
      [0, 1],
      [0.1, 0.3],
      Extrapolate.CLAMP
    );

    return {
      opacity: 1 - backgroundColorOpacity * 0.5,
    };
  });

  const labelAnimatedStyle = useAnimatedStyle(() => {
    const progress = translateX.value / maxTranslateX;
    const opacity = interpolate(
      progress,
      [0, 0.5, 1],
      [1, 0.5, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity,
    };
  });

  return (
    <View style={[styles.container, { width: trackWidth, height }]}>
      <Animated.View style={[styles.track, trackAnimatedStyle]}>
        <LinearGradient
          colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.05)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientTrack}
        />
        <Animated.Text style={[styles.label, labelAnimatedStyle]}>
          {label}
        </Animated.Text>
      </Animated.View>

      <PanGestureHandler 
        onHandlerStateChange={gestureHandler}
        onGestureEvent={gestureHandler}
      >
        <Animated.View style={[styles.knobContainer, knobAnimatedStyle]}>
          <View style={styles.knob}>
            <LinearGradient
              colors={["#ffffff", "#f0f0f0", "#e8e8e8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.knobGradient}
            />
            <View style={styles.knobHighlight} />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignSelf: "center",
  },
  track: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  gradientTrack: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  knobContainer: {
    position: "absolute",
    top: 4,
    left: 4,
  },
  knob: {
    width: 52,
    height: 52,
    borderRadius: 26,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    elevation: 5,
  },
  knobGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  knobHighlight: {
    position: "absolute",
    top: 8,
    left: 8,
    right: 8,
    height: 12,
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 6,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 0.8,
  },
});

export default DragButton;
