import { useRef, useState, useEffect, ReactElement, ReactNode } from "react";
import {
  FlatList,
  FlatListProps,
  View,
  ViewStyle,
  Animated as RNAnimated,
  TextStyle,
} from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import Animated, { BounceIn } from "react-native-reanimated";
import { WIDTH } from "../../../utils/Dimensions";
import { useHaptics } from "../../../features/ui/useHaptics";

const AnimatedFlatList = RNAnimated.createAnimatedComponent(
  FlatList
) as unknown as typeof FlatList;

interface VerticalCardSliderProps<T>
  extends Omit<FlatListProps<T>, "renderItem"> {
  card: ({ item, index }: { item: T; index?: number }) => ReactNode;
  cardWidth?: number;
  cardHeight?: number;
  sliderWidth?: number;
  hideDots?: boolean;
  styleSlider?: ViewStyle | ViewStyle[];
  styleDots?: ViewStyle | ViewStyle[];
  distanceBubbleStyle?: TextStyle | TextStyle[];
  emptyCard?: ReactElement;
  firstCard?: ReactElement;
  lastCard?: ReactElement;
  firstDot?: ReactNode;
  lastDot?: ReactNode;
  maxDotsShown?: number;
  showDotsTop?: boolean;
  selectedIndex?: number;
  onSelect?: (index: number) => void;
  selectedCardIndex?: number;
  showDistanceBubble?: boolean;
  distanceTolerance?: number;
  animationType?: "card" | "wheel";
  disableScroll?: boolean;
  hapticFeedback?: boolean;
}

export function VerticalCardSlider<T>({
  data,
  card,
  keyExtractor,
  cardWidth = 100,
  cardHeight = 100,
  sliderWidth = WIDTH - 32,
  hideDots = false,
  styleSlider,
  styleDots,
  distanceBubbleStyle,
  emptyCard,
  firstCard,
  lastCard,
  firstDot,
  lastDot,
  maxDotsShown = 5,
  showDotsTop = false,
  selectedIndex = 0,
  onSelect,
  selectedCardIndex = 0,
  showDistanceBubble = false,
  distanceTolerance = 0,
  animationType = "card",
  disableScroll = false,
  hapticFeedback = false,
  ...flatListProps
}: VerticalCardSliderProps<T>) {
  const { theme } = useSettingsStore();
  const scrollX = useRef(new RNAnimated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);
  const triggerHapticsScroll = useHaptics({
    modeType: "max",
    hapticType: "medium",
  });

  // Include firstCard and lastCard cleanly in the data
  const fullData: (string | T)[] = [
    ...(firstCard ? ["first"] : []),
    ...(data ? Array.from(data) : []),
    ...(lastCard ? ["last"] : []),
  ];

  const defaultKeyExtractor = (item: any, index: number) =>
    item.id ? `${item.id}-${index}` : `${index}`;

  // Calculate spacing to show 3 cards with center card perfectly centered
  const horizontalPadding = (sliderWidth - cardWidth) / 2;

  const onScroll = RNAnimated.event(
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
          onSelect?.(newIndex);
          if (hapticFeedback) {
            triggerHapticsScroll();
          }
        }
      },
    }
  );

  return (
    <View style={{ position: "relative" }}>
      {showDotsTop && fullData.length > 1 && (
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
      <AnimatedFlatList
        {...flatListProps}
        scrollEnabled={!disableScroll}
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
              animationType,
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
              animationType,
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
            animationType,
          });
        }}
        keyExtractor={keyExtractor || defaultKeyExtractor}
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth}
        snapToAlignment="center"
        decelerationRate="fast"
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: horizontalPadding,
        }}
        style={{
          width: sliderWidth,
          flexGrow: 0,
          flexShrink: 0,
          flexBasis: cardHeight,
          ...styleSlider,
        }}
        nestedScrollEnabled
        ListEmptyComponent={emptyCard}
      />
      {!hideDots && !showDotsTop && fullData.length > 1 && (
        <ScrollableDots
          dataLength={fullData.length}
          currentIndex={currentIndex}
          theme={theme}
          style={{
            height: 32,
            alignItems: "center",
            ...(Array.isArray(styleDots) ? {} : styleDots),
          }}
          firstDot={firstDot}
          lastDot={lastDot}
          maxDotsShown={maxDotsShown}
        />
      )}
      {/* Distance Bubble Indicator */}
      {showDistanceBubble && (
        <DistanceBubble
          currentIndex={currentIndex}
          selectedCardIndex={selectedCardIndex}
          theme={theme}
          style={distanceBubbleStyle}
          distanceTolerance={distanceTolerance}
        />
      )}
    </View>
  );
}

function renderCenterCard({
  scrollX,
  index,
  content,
  width,
  height,
  animationType = "card",
}: {
  scrollX: RNAnimated.Value;
  index: number;
  content: React.ReactNode;
  width: number;
  height: number;
  totalItems: number;
  horizontalPadding: number;
  animationType?: "card" | "wheel";
}) {
  const inputRange = [
    (index - 3) * width,
    (index - 2) * width,
    (index - 1) * width,
    index * width,
    (index + 1) * width,
    (index + 2) * width,
    (index + 3) * width,
  ];

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.4, 0.6, 0.8, 1, 0.8, 0.6, 0.4],
    extrapolate: "clamp",
  });

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.85, 0.9, 0.95, 1, 0.95, 0.9, 0.85],
    extrapolate: "clamp",
  });

  const rotateY =
    animationType === "card"
      ? scrollX.interpolate({
          inputRange,
          outputRange: [
            "-65deg",
            "-35deg",
            "-25deg",
            "0deg",
            "25deg",
            "35deg",
            "65deg",
          ],
          extrapolate: "clamp",
        })
      : scrollX.interpolate({
          inputRange,
          outputRange: [
            "55deg",
            "45deg",
            "35deg",
            "0deg",
            "-35deg",
            "-45deg",
            "-55deg",
          ],
          extrapolate: "clamp",
        });

  return (
    <View
      style={{
        width,
        height,
        overflow: "visible", // ⭐️ ENFORCES TRUE CARD SIZE
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RNAnimated.View
        style={{
          flex: 1,
          opacity,
          transform: [{ scale }, { perspective: 600 }, { rotateY }],
        }}
      >
        {content}
      </RNAnimated.View>
    </View>
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
  vertical?: boolean;
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

function DistanceBubble({
  currentIndex,
  selectedCardIndex,
  theme,
  style,
  distanceTolerance = 0,
}: {
  currentIndex: number;
  selectedCardIndex: number;
  theme: any;
  style?: TextStyle | TextStyle[];
  distanceTolerance?: number;
}) {
  const distance = Math.abs(currentIndex - selectedCardIndex);
  if (distance <= distanceTolerance) return null;

  const isRight = currentIndex > selectedCardIndex;

  return (
    <Animated.Text
      entering={BounceIn}
      style={{
        color: theme.background,
        fontSize: 14,
        fontWeight: "600",
        position: "absolute",
        top: 22,
        transform: [{ translateY: -22 }],
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: theme.text,
        textAlign: "center",
        lineHeight: 22,
        verticalAlign: "middle",
        zIndex: 1,

        right: isRight ? undefined : 0,
        left: isRight ? 0 : undefined,

        ...style,
      }}
    >
      {distance}
    </Animated.Text>
  );
}
