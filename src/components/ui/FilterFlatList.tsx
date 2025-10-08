import {
  FlatList,
  View,
  Text,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewStyle,
} from "react-native";
import { useRef, useState } from "react";
import { useSettingsStore } from "../../stores/settingsStore";

interface FilterFlatListProps {
  title?: string;
  data: string[];
  onSelect: (item: any) => void;
  itemHeight?: number;
  contentContainerStyle?: ViewStyle | ViewStyle[];
}

export function FilterFlatList({
  title,
  data,
  onSelect,
  itemHeight = 60,
  contentContainerStyle,
}: FilterFlatListProps) {
  const flatListRef = useRef<FlatList>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { theme } = useSettingsStore();

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
      <View
        style={{
          height: itemHeight,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16, // keep fixed
            fontWeight: isSelected ? "bold" : "normal",
            color: isSelected ? theme.text : theme.grayText,
          }}
        >
          {item}
        </Text>
      </View>
    );
  };

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
}
