import {
  FlatList,
  View,
  Text,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewStyle,
  Animated,
  Pressable,
  TextStyle,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useSettingsStore } from "../../stores/settingsStore";
import { useSideheadAnim } from "../../animations/useSideheadAnim";

interface FilterFlatSliderProps {
  title?: string;
  data: string[];
  onSelect: (item: any) => void;
  startIndex?: number;
  itemWidth?: number;
  contentContainerStyle?: ViewStyle | ViewStyle[];
  itemStyle?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
}

export function FilterFlatSlider({
  title,
  data,
  onSelect,
  startIndex = 0,
  itemWidth = 60,
  contentContainerStyle,
  itemStyle,
  textStyle,
}: FilterFlatSliderProps) {
  const flatListRef = useRef<FlatList>(null);
  const [selectedIndex, setSelectedIndex] = useState(startIndex);
  const { theme } = useSettingsStore();

  const { triggerSideShake, sideheadAnim } = useSideheadAnim();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / itemWidth);
    if (index !== selectedIndex && index >= 0 && index < data.length) {
      setSelectedIndex(index);
      onSelect(data[index]);
    }
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const isSelected = index === selectedIndex;
    return (
      <Pressable onPress={triggerSideShake}>
        <Animated.View
          style={[
            {
              width: itemWidth,
              justifyContent: "center",
              alignItems: "center",
            },
            itemStyle,
            sideheadAnim,
          ]}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: isSelected ? "bold" : "normal",
              color: isSelected ? theme.text : theme.grayText,
              textAlign: "center",
              ...textStyle,
            }}
          >
            {item}
          </Text>
        </Animated.View>
      </Pressable>
    );
  };

  function scrollToIndex(index: number) {
    if (flatListRef.current && index < data.length) {
      flatListRef.current.scrollToOffset({
        offset: index * itemWidth,
        animated: true,
      });
      setSelectedIndex(index);
      onSelect(data[index]);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToIndex(startIndex);
    }, 10); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ gap: 4, justifyContent: "center", alignItems: "center" }}>
      {title && (
        <Text
          style={{ fontSize: 14, fontWeight: "bold", color: theme.grayText }}
        >
          {title}
        </Text>
      )}
      <View style={contentContainerStyle}>
        <FlatList
          ref={flatListRef}
          data={data}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={renderItem}
          snapToInterval={itemWidth}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={{ flex: 1 }}
          horizontal
        />
      </View>
    </View>
  );
}
