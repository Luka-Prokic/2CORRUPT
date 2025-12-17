import {
  FlatList,
  FlatListProps,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
  ViewStyle,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useSettingsStore } from "../../../stores/settingsStore";
import { WIDTH } from "../../../utils/Dimensions";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { VerticalScrollableDots } from "./ScrollableDots";

interface WidgetFlatListProps extends FlatListProps<any> {
  width?: number;
  height?: number;
  staticDots?: boolean;
  hidenDots?: boolean;
}

export function WidgetFlatList({
  contentContainerStyle,
  width = WIDTH,
  height = (WIDTH - 40) / 2,
  staticDots = false,
  hidenDots = false,
  ...props
}: WidgetFlatListProps) {
  const flatListRef = useRef<FlatList>(null);
  const { theme } = useSettingsStore();
  const { fullWidth } = useWidgetUnit();

  const [sleep, setSleep] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(
    props.initialScrollIndex || 0
  );

  const sleepTimeoutRef = useRef<number | null>(null);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / height);
    setCurrentIndex(index);

    // Always reset the sleep timer
    setSleep(false);
    if (sleepTimeoutRef.current) clearTimeout(sleepTimeoutRef.current);

    sleepTimeoutRef.current = setTimeout(() => {
      setSleep(true);
      sleepTimeoutRef.current = null;
    }, 1000);
  };

  useEffect(() => {
    sleepTimeoutRef.current = setTimeout(() => {
      setSleep(true);
      sleepTimeoutRef.current = null;
    }, 1000);

    return () => {
      if (sleepTimeoutRef.current) clearTimeout(sleepTimeoutRef.current);
    };
  }, []);

  return (
    <View
      style={{
        width,
        height,
        alignItems: "center",
        flexDirection: "row",
        paddingLeft: 16,
        gap: 4,
      }}
    >
      <FlatList
        ref={flatListRef}
        snapToInterval={height}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        scrollEventThrottle={16}
        scrollEnabled={props.data?.length > 1}
        initialScrollIndex={props.initialScrollIndex}
        onScroll={onScroll}
        getItemLayout={(_, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
        {...props}
        style={{
          height: height,
          width: fullWidth,
          flexGrow: 0,
          flexShrink: 0,
          borderRadius: 32,
          backgroundColor: theme.thirdBackground,
          overflow: "hidden",
          zIndex: 2,
          ...(props.style as ViewStyle),
        }}
      />
      {!sleep && !staticDots && !hidenDots && (
        <VerticalScrollableDots
          dataLength={props.data?.length ?? 0}
          currentIndex={currentIndex}
        />
      )}
    </View>
  );
}
