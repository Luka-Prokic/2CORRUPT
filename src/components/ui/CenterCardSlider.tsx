import React, {
  Fragment,
  useRef,
  useState,
  useEffect,
  ReactElement,
  ReactNode,
} from "react";
import {
  FlatList,
  FlatListProps,
  View,
  ViewStyle,
  Animated,
  Dimensions,
} from "react-native";
import { useSettingsStore } from "../../stores/settings";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList
) as unknown as typeof FlatList;

interface CenterCardSliderProps<T> extends Omit<FlatListProps<T>, "renderItem"> {
  card: ({ item, index }: { item: T; index?: number }) => ReactNode;
  cardWidth: number;
  cardHeight: number;
  hideDots?: boolean;
  styleSlider?: ViewStyle | ViewStyle[];
  styleDots?: ViewStyle | ViewStyle[];
  emptyCard?: ReactElement;
  firstCard?: ReactElement;
  lastCard?: ReactElement;
  firstDot?: ReactNode;
  lastDot?: ReactNode;
  maxDotsShown?: number;
}

export function CenterCardSlider<T>({
  data,
  card,
  keyExtractor,
  cardWidth,
  cardHeight,
  hideDots = false,
  styleSlider,
  styleDots,
  emptyCard,
  firstCard,
  lastCard,
  firstDot,
  lastDot,
  maxDotsShown,
  ...flatListProps
}: CenterCardSliderProps<T>) {
  const { theme } = useSettingsStore();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Include firstCard and lastCard cleanly in the data
  const fullData: (string | T)[] = [
    ...(firstCard ? ["first"] : []),
    ...(data ? Array.from(data) : []),
    ...(lastCard ? ["last"] : []),
  ];

  const defaultKeyExtractor = (item: any, index: number) =>
    item.id ? `${item.id}-${index}` : `${index}`;

  // Calculate spacing to show 3 cards with center card perfectly centered
  // Center card should be at screen center, side cards should peek
  const sideCardPeek = cardWidth * 0.2; // 20% of card width peeking from each side
  const horizontalPadding = (SCREEN_WIDTH - cardWidth) / 2 - sideCardPeek;

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: true,
      listener: (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        // With snapToAlignment="center", calculate which card is centered
        // The centered card is at: offsetX / cardWidth (rounded)
        const newIndex = Math.round(offsetX / cardWidth);
        if (
          newIndex !== currentIndex &&
          newIndex >= 0 &&
          newIndex < fullData.length
        ) {
          setCurrentIndex(newIndex);
        }
      },
    }
  );

  return (
    <Fragment>
      <AnimatedFlatList
        {...flatListProps}
        data={fullData}
        renderItem={({ item, index }) => {
          if (item === "first" && firstCard) {
            return renderCenterCard({
              scrollX,
              index,
              content: firstCard,
              width: cardWidth,
              height: cardHeight,
              totalItems: fullData.length,
              horizontalPadding,
            });
          }

          if (item === "last" && lastCard) {
            return renderCenterCard({
              scrollX,
              index,
              content: lastCard,
              width: cardWidth,
              height: cardHeight,
              totalItems: fullData.length,
              horizontalPadding,
            });
          }

          const adjustedIndex = firstCard ? index - 1 : index;

          return renderCenterCard({
            scrollX,
            index,
            content: card({
              item: item as T,
              index: adjustedIndex,
            }),
            width: cardWidth,
            height: cardHeight,
            totalItems: fullData.length,
            horizontalPadding,
          });
        }}
        keyExtractor={keyExtractor || defaultKeyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth}
        snapToAlignment="center"
        decelerationRate="fast"
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: horizontalPadding,
        }}
        style={styleSlider}
        nestedScrollEnabled
        ListEmptyComponent={emptyCard}
      />
      {!hideDots && fullData.length > 1 && (
        <ScrollableDots
          dataLength={fullData.length}
          currentIndex={currentIndex}
          theme={theme}
          style={{ height: 32, ...(Array.isArray(styleDots) ? {} : styleDots) }}
          firstDot={firstDot}
          lastDot={lastDot}
          maxDotsShown={maxDotsShown}
        />
      )}
    </Fragment>
  );
}

function renderCenterCard({
  scrollX,
  index,
  content,
  width,
  height,
  totalItems,
  horizontalPadding,
}: {
  scrollX: Animated.Value;
  index: number;
  content: React.ReactNode;
  width: number;
  height: number;
  totalItems: number;
  horizontalPadding: number;
}) {
  // With snapToAlignment="center", the scrollX represents the offset
  // When a card is centered, its position relative to scroll is: index * width
  // The card is centered when scrollX + horizontalPadding positions it at screen center
  // Input ranges for animations - account for center alignment
  // We need to handle: left card (index-1), center card (index), right card (index+1)
  const inputRange = [
    (index - 2) * width,
    (index - 1) * width,
    index * width,
    (index + 1) * width,
    (index + 2) * width,
  ];

  // Opacity: center card = 1, side cards = 0.7, outer cards = 0.5
  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.5, 0.7, 1, 0.7, 0.5],
    extrapolate: "clamp",
  });

  // Scale: center card = 1, side cards = 0.9, outer cards = 0.85
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.85, 0.9, 1, 0.9, 0.85],
    extrapolate: "clamp",
  });

  // RotateY: center card = 0deg, side cards = ±15deg, outer cards = ±25deg
  const rotateY = scrollX.interpolate({
    inputRange,
    outputRange: ["-25deg", "-15deg", "0deg", "15deg", "25deg"],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={{
        width,
        height,
        opacity,
        transform: [{ scale }, { perspective: 600 }, { rotateY }],
      }}
    >
      {content}
    </Animated.View>
  );
}

// -------------------------
// ScrollableDots Component (reused from CardSlider)
// -------------------------
interface ScrollableDotsProps {
  dataLength: number;
  currentIndex: number;
  theme: any;
  style?: ViewStyle | ViewStyle[];
  firstDot?: ReactNode;
  lastDot?: ReactNode;
  maxDotsShown?: number;
}

const DOT_WIDTH = 6;
const DOT_MARGIN = 3;

export const ScrollableDots = ({
  dataLength,
  currentIndex,
  theme,
  style,
  firstDot,
  lastDot,
  maxDotsShown = 5,
}: ScrollableDotsProps) => {
  const flatListRef = useRef<FlatList>(null);
  const totalDots = dataLength;
  const dotWidth = DOT_MARGIN * 2 + DOT_WIDTH;
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
            marginHorizontal: DOT_MARGIN,
            transform: [{ scale: isActive ? 1.2 : 0.8 }],
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
          width: DOT_WIDTH,
          height: DOT_WIDTH,
          borderRadius: DOT_MARGIN,
          marginHorizontal: DOT_MARGIN,
          backgroundColor: theme.text,
          transform: [{ scale: isActive ? 1.2 : 0.8 }],
          opacity: isActive ? 1 : 0.4,
        }}
      />
    );
  };

  return (
    <View style={style}>
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
    </View>
  );
};

