import {
  FlatList,
  FlatListProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
  ViewStyle,
} from "react-native";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useSettingsStore } from "../../../stores/settingsStore";
import { WIDTH } from "../../../utils/Dimensions";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";

interface WidgetFlatListProps extends FlatListProps<any> {
  width?: number;
  height?: number;
}

export function WidgetFlatList({
  contentContainerStyle,
  width = WIDTH,
  height = (WIDTH - 40) / 2,
  ...props
}: WidgetFlatListProps) {
  const flatListRef = useRef<FlatList>(null);
  const { theme } = useSettingsStore();
  const { fullWidth } = useWidgetUnit();

  const [currentIndex, setCurrentIndex] = useState(
    props.initialScrollIndex || 0
  );

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y; // vertical scroll
    const index = Math.round(y / height);
    setCurrentIndex(index);
  };

  return (
    <View
      style={{
        width,
        height,
        alignItems: "center",
        flexDirection: "row",
        paddingLeft: 16,
        gap: 4,
      }}
    >
      <FlatList
        ref={flatListRef}
        snapToInterval={height}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        scrollEventThrottle={16}
        scrollEnabled={props.data?.length > 1}
        initialScrollIndex={props.initialScrollIndex}
        onScroll={onScroll}
        getItemLayout={(_, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
        {...props}
        style={{
          height: height,
          width: fullWidth,
          flexGrow: 0,
          flexShrink: 0,
          borderRadius: 32,
          backgroundColor: theme.thirdBackground,
          overflow: "hidden",
          ...(props.style as ViewStyle),
        }}
      />
      <VerticalScrollableDots
        dataLength={props.data?.length ?? 0}
        currentIndex={currentIndex}
        theme={theme}
      />
    </View>
  );
}

interface VerticalScrollableDotsProps {
  dataLength: number;
  currentIndex: number;
  theme: any;
  style?: ViewStyle | ViewStyle[];
  firstDot?: ReactNode;
  lastDot?: ReactNode;
  maxDotsShown?: number;
}

const DOT_SIZE = 6;
const DOT_MARGIN = 3;

export const VerticalScrollableDots = ({
  dataLength,
  currentIndex,
  theme,
  style,
  firstDot,
  lastDot,
  maxDotsShown = 5,
}: VerticalScrollableDotsProps) => {
  const flatListRef = useRef<FlatList>(null);
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
            transform: [{ scale: isActive ? 1.2 : 0.8 }],
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
            transform: [{ scale: isActive ? 1.2 : 0.8 }],
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
          transform: [{ scale: isActive ? 1.2 : 0.8 }],
          opacity: isActive ? 1 : 0.4,
        }}
      />
    );
  };

  return (
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
      style={{ height: windowHeight, width: DOT_SIZE * 1.2, ...style }}
    />
  );
};
