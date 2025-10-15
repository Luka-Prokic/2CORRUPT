import {
  FlatList,
  View,
  Text,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewStyle,
  Animated,
  Pressable,
} from "react-native";
import { useEffect, useRef, useState, memo } from "react";
import { useSettingsStore } from "../../stores/settingsStore";
import { useBobheadAnim } from "../../animations/useBobheadAnim";

interface FilterFlatListProps {
  title?: string;
  data: string[];
  startIndex?: number;
  onSelect: (item: any) => void;
  itemHeight?: number;
  contentContainerStyle?: ViewStyle | ViewStyle[];
}

export const FilterFlatList = memo(function FilterFlatList({
  title,
  data,
  startIndex = 0,
  onSelect,
  itemHeight = 60,
  contentContainerStyle,
}: FilterFlatListProps) {
  const flatListRef = useRef<FlatList>(null);
  const [selectedIndex, setSelectedIndex] = useState(startIndex);
  const { theme } = useSettingsStore();

  console.log(selectedIndex);
  const { triggerShake, bobheadAnim } = useBobheadAnim();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / itemHeight);
    if (index !== selectedIndex && index >= 0 && index < data.length) {
      setSelectedIndex(index);
      onSelect(data[index]);
    }
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const isSelected = index === selectedIndex;
    return (
      <Pressable onPress={triggerShake}>
        <Animated.View
          style={[
            {
              height: itemHeight,
              justifyContent: "center",
              alignItems: "center",
            },
            bobheadAnim,
          ]}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: isSelected ? "bold" : "normal",
              color: isSelected ? theme.text : theme.grayText,
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
        offset: index * itemHeight,
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
          snapToInterval={itemHeight}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
});
