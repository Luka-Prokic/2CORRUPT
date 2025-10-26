import React, { Fragment, useRef, useState, useEffect } from "react";
import { FlatList, View, ViewStyle } from "react-native";
import { Animated } from "react-native";
import { useSettingsStore } from "../../stores/settings";

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList
) as unknown as typeof FlatList;

interface CardSliderProps<T> {
  data: T[];
  card: ({ item }: { item: T }) => React.ReactElement;
  keyExtractor?: (item: T, index: number) => string;
  cardWidth: number;
  cardHeight: number;
  showDots?: boolean;
  styleSlider?: ViewStyle | ViewStyle[];
  styleDots?: ViewStyle | ViewStyle[];
  emptyCard?: React.ReactElement;
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
}: CardSliderProps<T>) {
  const defaultKeyExtractor = (item: any, index: number) =>
    item.id ? `${item.id}-${index}` : `${index}`;

  const { theme } = useSettingsStore();

  const scrollX = useRef(new Animated.Value(0)).current;

  const [currentIndex, setCurrentIndex] = useState(0);

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
          newIndex < data.length
        )
          setCurrentIndex(newIndex);
      },
    }
  );

  return (
    <Fragment>
      <AnimatedFlatList
        data={data}
        renderItem={({ item, index }) =>
          renderCard({
            scrollX,
            index,
            content: card({ item }),
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
      {showDots && data.length > 1 && (
        <ScrollableDots
          dataLength={data.length}
          currentIndex={currentIndex}
          theme={theme}
          style={{ height: 32, ...styleDots }}
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

  // Opacity: fade in/out as cards move in/out of view
  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.8],
    extrapolate: "clamp",
  });

  // Scale: main card is larger, others are smaller
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
        width: width,
        height: height,
        opacity,
        transform: [{ scale }, { perspective: 600 }, { rotateY }],
      }}
    >
      {content}
    </Animated.View>
  );
}

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

  const dotWidth = DOT_MARGIN * 2 + DOT_WIDTH; // space of one dot
  const shownDots = dataLength > maxVisible ? maxVisible : dataLength; // count dots up to maxVisible value
  const windowWidth = dotWidth * shownDots; // window of dots that flatlist provides

  useEffect(() => {
    if (!flatListRef.current) return;

    let offset = 0;

    if (currentIndex >= maxVisible) {
      offset = dotWidth * (currentIndex - maxVisible + 1);
    } else {
      offset = 0;
    }

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
        contentContainerStyle={{
          alignItems: "center",
        }}
        style={{
          width: windowWidth,
        }}
      />
    </View>
  );
};
