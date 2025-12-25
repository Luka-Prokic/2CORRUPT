import { useRef, useState, ReactElement, ReactNode } from "react";
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
import { ScrollableDots } from "./ScrollableDots";
import { SlideCard } from "./SlideCard";
import { HapticsMode } from "../../../stores/settings/types";

const AnimatedFlatList = RNAnimated.createAnimatedComponent(
  FlatList
) as unknown as typeof FlatList;

type AnimationType = "card" | "wheel" | "album" | "flat";

interface CenterCardSliderProps<T>
  extends Omit<FlatListProps<T>, "renderItem"> {
  card: ({ item, index }: { item: T; index?: number }) => ReactNode;
  cardWidth?: number;
  cardHeight?: number;
  sliderWidth?: number;
  sliderHeight?: number;
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
  animationType?: AnimationType;
  disableScroll?: boolean;
  hapticFeedback?: boolean;
  startAtMiddle?: boolean;
  hapticsModeType?: HapticsMode;
  paddingStart?: number;
  paddingEnd?: number;
}

export function CenterCardSlider<T>({
  data,
  card,
  keyExtractor,
  cardWidth = 100,
  cardHeight = 100,
  sliderWidth = WIDTH - 32,
  hideDots = false,
  sliderHeight,
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
  startAtMiddle = false,
  hapticsModeType = "max",
  ...flatListProps
}: CenterCardSliderProps<T>) {
  const { theme } = useSettingsStore();
  const scrollX = useRef(new RNAnimated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);
  const triggerHapticsScroll = useHaptics({
    modeType: hapticsModeType,
    hapticType: "rigid",
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

  const initialIndex = startAtMiddle
    ? Math.floor(fullData.length / 2)
    : selectedIndex;

  return (
    <View style={{ position: "relative" }}>
      {showDotsTop && fullData.length > 1 && (
        <ScrollableDots
          dataLength={fullData.length}
          currentIndex={currentIndex}
          style={{
            height: 32,
            width: sliderWidth,
            alignItems: "center",
            ...(Array.isArray(styleDots) ? {} : styleDots),
          }}
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
            return SlideCard({
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
            return SlideCard({
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

          return SlideCard({
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
        getItemLayout={(_, index) => ({
          length: cardWidth,
          offset: cardWidth * index,
          index,
        })}
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
        style={{
          width: sliderWidth || cardWidth,
          height: sliderHeight || cardHeight,
          flexGrow: 0,
          flexShrink: 0,
          flexBasis: sliderHeight || cardHeight,
          ...styleSlider,
        }}
        nestedScrollEnabled
        initialScrollIndex={initialIndex}
        ListEmptyComponent={emptyCard}
      />
      {!hideDots && !showDotsTop && fullData.length > 1 && (
        <ScrollableDots
          dataLength={fullData.length}
          currentIndex={currentIndex}
          style={{
            height: 32,
            width: sliderWidth,
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
