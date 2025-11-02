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
} from "react-native";
import { useSettingsStore } from "../../stores/settings";

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList
) as unknown as typeof FlatList;

interface CardSliderProps<T> extends Omit<FlatListProps<T>, "renderItem"> {
  card: ({ item, index }: { item: T; index?: number }) => ReactNode;
  cardWidth: number;
  cardHeight: number;
  showDots?: boolean;
  styleSlider?: ViewStyle | ViewStyle[];
  styleDots?: ViewStyle | ViewStyle[];
  emptyCard?: ReactElement;
  firstCard?: ReactElement;
}

export function CardSlider<T>({
  data,
  card,
  keyExtractor,
  cardWidth,
  cardHeight,
  showDots = true,
  styleSlider,
  styleDots,
  emptyCard,
  firstCard, // 🆕
  ...flatListProps
}: CardSliderProps<T>) {
  const { theme } = useSettingsStore();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const fullData: T[] = firstCard
    ? [{} as T, ...(data ? Array.from(data) : [])]
    : data
    ? Array.from(data)
    : []; // prepend dummy for layout consistency

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
        }
      },
    }
  );

  return (
    <Fragment>
      <AnimatedFlatList
        {...flatListProps}
        data={fullData}
        renderItem={({ item, index }) =>
          index === 0 && firstCard
            ? renderCard({
                scrollX,
                index,
                content: firstCard,
                width: cardWidth,
                height: cardHeight,
              })
            : renderCard({
                scrollX,
                index,
                content: card({
                  item: firstCard ? data[index - 1] : item,
                  index,
                }),
                width: cardWidth,
                height: cardHeight,
              })
        }
        keyExtractor={keyExtractor || defaultKeyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth}
        decelerationRate="fast"
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={styleSlider}
        nestedScrollEnabled
        ListEmptyComponent={emptyCard}
      />
      {showDots && fullData.length > 1 && (
        <ScrollableDots
          dataLength={fullData.length}
          currentIndex={currentIndex}
          theme={theme}
          style={{ height: 32, ...(Array.isArray(styleDots) ? {} : styleDots) }}
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

// -------------------------
// ScrollableDots Component
// -------------------------
interface ScrollableDotsProps {
  dataLength: number;
  currentIndex: number;
  maxVisible?: number;
  theme: any;
  style?: ViewStyle | ViewStyle[];
}

const DOT_WIDTH = 6;
const DOT_MARGIN = 3;

export const ScrollableDots = ({
  dataLength,
  currentIndex,
  maxVisible = 5,
  theme,
  style,
}: ScrollableDotsProps) => {
  const flatListRef = useRef<FlatList>(null);
  const data = Array.from({ length: dataLength });

  const dotWidth = DOT_MARGIN * 2 + DOT_WIDTH;
  const shownDots = dataLength > maxVisible ? maxVisible : dataLength;
  const windowWidth = dotWidth * shownDots;

  useEffect(() => {
    if (!flatListRef.current) return;

    const offset =
      currentIndex >= maxVisible
        ? dotWidth * (currentIndex - maxVisible + 1)
        : 0;

    flatListRef.current.scrollToOffset({
      offset,
      animated: true,
    });
  }, [currentIndex, maxVisible]);

  return (
    <View style={style}>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ index }) => (
          <View
            style={{
              width: DOT_WIDTH,
              height: DOT_WIDTH,
              borderRadius: DOT_MARGIN,
              marginHorizontal: DOT_MARGIN,
              backgroundColor: theme.text,
              transform: [{ scale: index === currentIndex ? 1.2 : 0.8 }],
              opacity: index === currentIndex ? 1 : 0.4,
            }}
          />
        )}
        contentContainerStyle={{ alignItems: "center" }}
        style={{ width: windowWidth }}
      />
    </View>
  );
};
