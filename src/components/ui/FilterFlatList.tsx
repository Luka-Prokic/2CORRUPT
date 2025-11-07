import { FlatList, Pressable, Text, View, ViewStyle } from "react-native";
import { useRef, useState, memo } from "react";
import { useSettingsStore } from "../../stores/settingsStore";

interface FilterFlatListProps {
  title?: string;
  data: string[];
  startIndex?: number;
  onSelect: (item: string) => void;
  itemHeight?: number;
  contentContainerStyle?: ViewStyle | ViewStyle[];
}

export function FilterFlatList({
  title,
  data,
  startIndex = 0,
  onSelect,
  itemHeight = 60,
  contentContainerStyle,
}: FilterFlatListProps) {
  const flatListRef = useRef<FlatList>(null);
  const { theme } = useSettingsStore();

  const [selectedIndex, setSelectedIndex] = useState(startIndex);

  function handleScroll(offsetY: number) {
    const index = Math.round(offsetY / itemHeight);

    if (index !== selectedIndex && index >= 0 && index < data.length) {
      setSelectedIndex(index);
      onSelect(data[index]);
    }
  }

  const FilterItem = memo(
    ({ item, index }: { item: string; index: number }) => {
      const isSelected = index === selectedIndex;
      return (
        <Pressable>
          <View
            style={{
              height: itemHeight,
              justifyContent: "center",
              alignItems: "center",
            }}
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
          </View>
        </Pressable>
      );
    },
    (prev, next) => prev.index === next.index && prev.item === next.item
  );

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
          renderItem={({ item, index }) => (
            <FilterItem item={item} index={index} />
          )}
          snapToInterval={itemHeight}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          onScroll={(event) => handleScroll(event.nativeEvent.contentOffset.y)}
          scrollEventThrottle={16}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
}
