import { ViewStyle } from "react-native";
import { ReactNode } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { View } from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import Animated, {
  FadeInLeft,
  FadeInUp,
  FadeOutLeft,
  FadeOutUp,
} from "react-native-reanimated";

const DOT_SIZE = 6;
const DOT_MARGIN = 3;

interface ScrollableDotsProps {
  dataLength: number;
  currentIndex: number;
  style?: ViewStyle | ViewStyle[];
  firstDot?: ReactNode;
  lastDot?: ReactNode;
  maxDotsShown?: number;
}

export const ScrollableDots = ({
  dataLength,
  currentIndex,
  style,
  firstDot,
  lastDot,
  maxDotsShown = 5,
}: ScrollableDotsProps) => {
  const { theme } = useSettingsStore();
  const flatListRef = useRef<FlatList>(null);
  const totalDots = dataLength;
  const dotWidth = DOT_MARGIN * 2 + DOT_SIZE;
  const shownDots = totalDots > maxDotsShown ? maxDotsShown : totalDots;
  const windowWidth = dotWidth * shownDots;

  useEffect(() => {
    if (!flatListRef.current) return;
    const offset =
      currentIndex >= maxDotsShown
        ? dotWidth * (currentIndex - maxDotsShown + 1)
        : 0;
    flatListRef.current.scrollToOffset({ offset, animated: true });
  }, [currentIndex, maxDotsShown]);

  const renderDot = (index: number) => {
    const isActive = index === currentIndex;

    if (index === 0 && firstDot) {
      return (
        <View
          style={{
            marginHorizontal: DOT_MARGIN,
            opacity: isActive ? 1 : 0.4,
          }}
        >
          {firstDot}
        </View>
      );
    }
    if (index === totalDots - 1 && lastDot) {
      return (
        <View
          style={{
            marginHorizontal: DOT_MARGIN,
            opacity: isActive ? 1 : 0.4,
          }}
        >
          {lastDot}
        </View>
      );
    }

    return (
      <View
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: DOT_MARGIN,
          marginHorizontal: DOT_MARGIN,
          backgroundColor: theme.text,
          opacity: isActive ? 1 : 0.4,
        }}
      />
    );
  };

  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutUp}
      style={{
        height: DOT_SIZE,
        width: windowWidth,
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    >
      <FlatList
        ref={flatListRef}
        data={Array.from({ length: totalDots })}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ index }) => renderDot(index)}
        contentContainerStyle={{
          alignItems: "center",
          flexDirection: "row",
        }}
        style={{ width: windowWidth }}
      />
    </Animated.View>
  );
};

interface VerticalScrollableDotsProps {
  dataLength: number;
  currentIndex: number;
  style?: ViewStyle | ViewStyle[];
  firstDot?: ReactNode;
  lastDot?: ReactNode;
  maxDotsShown?: number;
  autoSleep?: boolean;
}

export const VerticalScrollableDots = ({
  dataLength,
  currentIndex,
  style,
  firstDot,
  lastDot,
  maxDotsShown = 5,
}: VerticalScrollableDotsProps) => {
  const flatListRef = useRef<FlatList>(null);
  const { theme } = useSettingsStore();

  const totalDots = dataLength;
  const dotHeight = DOT_SIZE + DOT_MARGIN * 2;
  const shownDots = totalDots > maxDotsShown ? maxDotsShown : totalDots;
  const windowHeight = dotHeight * shownDots;

  useEffect(() => {
    if (!flatListRef.current) return;
    const offset =
      currentIndex >= maxDotsShown
        ? dotHeight * (currentIndex - maxDotsShown + 1)
        : 0;
    flatListRef.current.scrollToOffset({ offset, animated: true });
  }, [currentIndex, maxDotsShown]);

  const renderDot = (index: number) => {
    const isActive = index === currentIndex;

    if (index === 0 && firstDot) {
      return (
        <View
          style={{
            marginVertical: DOT_MARGIN,
            opacity: isActive ? 1 : 0.4,
          }}
        >
          {firstDot}
        </View>
      );
    }

    if (index === totalDots - 1 && lastDot) {
      return (
        <View
          style={{
            marginVertical: DOT_MARGIN,
            opacity: isActive ? 1 : 0.4,
          }}
        >
          {lastDot}
        </View>
      );
    }

    if (totalDots <= 1) return null;
    return (
      <View
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: DOT_SIZE / 2,
          marginVertical: DOT_MARGIN,
          backgroundColor: theme.text,
          opacity: isActive ? 1 : 0.4,
        }}
      />
    );
  };

  return (
    <Animated.View
      entering={FadeInLeft}
      exiting={FadeOutLeft}
      style={{
        height: windowHeight,
        width: DOT_SIZE,
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    >
      <FlatList
        ref={flatListRef}
        data={Array.from({ length: totalDots })}
        keyExtractor={(_, index) => index.toString()}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ index }) => renderDot(index)}
        contentContainerStyle={{
          alignItems: "center",
          flexDirection: "column",
        }}
        style={{ height: windowHeight, width: DOT_SIZE, ...style }}
      />
    </Animated.View>
  );
};
