import React, { Fragment, useRef, useState } from "react";
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
}: CardSliderProps<T>) {
  const defaultKeyExtractor = (item: any, index: number) =>
    item.id ? `${item.id}-${index}` : `${index}`;

  const { theme } = useSettingsStore();

  const scrollX = useRef(new Animated.Value(0)).current;

  const [selectedDotIndex, setSelectedDotIndex] = useState(0);
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
        ) {
          // Track scroll direction and update selected dot index
          if (newIndex > currentIndex) {
            // setLastScrollDirection("right");
            // Move dot right, but don't go beyond index 4
            setSelectedDotIndex((prev) => Math.min(4, prev + 1));
          } else if (newIndex < currentIndex) {
            // setLastScrollDirection("left");
            // Move dot left, but don't go below index 0
            setSelectedDotIndex((prev) => Math.max(0, prev - 1));
          }

          setCurrentIndex(newIndex);
        }
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
      />
      {showDots && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            ...styleDots,
          }}
        >
          {Array.from({ length: 5 }).map((_, dotIndex) => {
            // No-hop dots logic: dots move adjacent positions, pin at edges
            let actualCardIndex;
            let isActive = false;

            if (data.length <= 5) {
              // For 7 or fewer cards: direct mapping
              actualCardIndex = dotIndex;
              isActive = dotIndex === currentIndex;
            } else {
              // For more than 7 cards: implement no-hop behavior

              // Calculate window start based on current card and selected dot position
              const windowStart = currentIndex - selectedDotIndex;
              actualCardIndex = windowStart + dotIndex;

              // Check if this is the selected dot
              isActive = dotIndex === selectedDotIndex;

              // Ensure we don't go beyond available cards
              actualCardIndex = Math.min(actualCardIndex, data.length - 1);
            }

            return (
              <View
                key={`dot-${actualCardIndex}-${dotIndex}`}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  marginHorizontal: 3,
                  backgroundColor: theme.text,
                  transform: [{ scale: isActive ? 1.2 : 0.8 }],
                  opacity: isActive ? 1 : 0.4,
                }}
              />
            );
          })}
        </View>
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
