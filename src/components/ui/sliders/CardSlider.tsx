import { Fragment, useRef, useState, ReactElement, ReactNode } from "react";
import { FlatList, FlatListProps, ViewStyle, Animated } from "react-native";
import { ScrollableDots } from "./ScrollableDots";

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList
) as unknown as typeof FlatList;

interface CardSliderProps<T> extends Omit<FlatListProps<T>, "renderItem"> {
  card: ({ item, index }: { item: T; index?: number }) => ReactNode;
  cardWidth: number;
  cardHeight: number;
  sliderWidth?: number;
  sliderHeight?: number;
  hideDots?: boolean;
  styleSlider?: ViewStyle | ViewStyle[];
  styleDots?: ViewStyle | ViewStyle[];
  emptyCard?: ReactElement;
  firstCard?: ReactElement;
  lastCard?: ReactElement;
  firstDot?: ReactNode;
  lastDot?: ReactNode;
  maxDotsShown?: number; // 🆕 new prop
  showDotsTop?: boolean;
  selectedIndex?: number;
  onSelect?: (index: number) => void;
}

export function CardSlider<T>({
  data,
  card,
  keyExtractor,
  cardWidth,
  cardHeight,
  sliderWidth,
  sliderHeight,
  hideDots = false,
  styleSlider,
  styleDots,
  emptyCard,
  firstCard, // 🆕
  lastCard, // 🆕
  firstDot, // 🆕
  lastDot, // 🆕
  maxDotsShown = 5, // 🆕
  showDotsTop = false,
  selectedIndex = 0,
  onSelect,
  ...flatListProps
}: CardSliderProps<T>) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);

  // ✅ Include firstCard and lastCard cleanly in the data
  const fullData: (string | T)[] = [
    ...(firstCard ? ["first"] : []),
    ...(data ? [...(data as T[])] : []),
    ...(lastCard ? ["last"] : []),
  ];

  const defaultKeyExtractor = (item: any, index: number) =>
    item.id ? `${item.id}-${index}` : `${index}`;

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: true,
      listener: (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(offsetX / cardWidth);
        if (
          newIndex !== currentIndex &&
          newIndex >= 0 &&
          newIndex < fullData.length
        ) {
          setCurrentIndex(newIndex);
          onSelect?.(newIndex);
        }
      },
    }
  );

  return (
    <Fragment>
      {showDotsTop && fullData.length > 1 && (
        <ScrollableDots
          dataLength={fullData.length}
          currentIndex={currentIndex}
          style={{
            height: 32,
            width: cardWidth,
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
        data={fullData}
        renderItem={({ item, index }) => {
          if (item === "first" && firstCard) {
            return renderCard({
              scrollX,
              index,
              content: firstCard,
              width: cardWidth,
              height: cardHeight,
            });
          }

          if (item === "last" && lastCard) {
            return renderCard({
              scrollX,
              index,
              content: lastCard,
              width: cardWidth,
              height: cardHeight,
            });
          }

          const adjustedIndex = firstCard ? index - 1 : index;

          return renderCard({
            scrollX,
            index,
            content: card({
              item: item as T,
              index: adjustedIndex,
            }),
            width: cardWidth,
            height: cardHeight,
          });
        }}
        keyExtractor={keyExtractor || defaultKeyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth}
        decelerationRate="fast"
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={{
          width: sliderWidth || cardWidth,
          height: sliderHeight || cardHeight,
          flexGrow: 0,
          flexShrink: 0,
          flexBasis: sliderHeight || cardHeight,
          ...styleSlider,
        }}
        nestedScrollEnabled
        ListEmptyComponent={emptyCard}
      />
      {!hideDots && !showDotsTop && fullData.length > 1 && (
        <ScrollableDots
          dataLength={fullData.length}
          currentIndex={currentIndex}
          style={{
            height: 32,
            width: cardWidth,
            alignItems: "center",
            ...(Array.isArray(styleDots) ? {} : styleDots),
          }}
          firstDot={firstDot}
          lastDot={lastDot}
          maxDotsShown={maxDotsShown}
        />
      )}
    </Fragment>
  );
}

function renderCard({
  scrollX,
  index,
  content,
  width,
  height,
}: {
  scrollX: Animated.Value;
  index: number;
  content: React.ReactNode;
  width: number;
  height: number;
}) {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.8],
    extrapolate: "clamp",
  });

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.95, 1, 0.95],
    extrapolate: "clamp",
  });

  const rotateY = scrollX.interpolate({
    inputRange,
    outputRange: ["-30deg", "0deg", "30deg"],
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
