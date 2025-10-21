import { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settingsStore";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { useWorkoutStore, WorkoutTemplate } from "../../../stores/workout";
import { router } from "expo-router";
import { useUIStore } from "../../../stores/ui";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { BounceButton } from "../../ui/buttons/BounceButton";

export function TemplateWidget() {
  const { theme } = useSettingsStore();
  const scrollX = useRef(new Animated.Value(0)).current;
  const { setTypeOfView } = useUIStore();
  const { editTemplate, startSession } = useWorkoutStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedDotIndex, setSelectedDotIndex] = useState(0);
  const { widgetUnit } = useWidgetUnit();

  const cardWidth = widgetUnit * 0.8;
  const cardHeight = widgetUnit - 84;
  const { templates } = useWorkoutStore();

  function handleTemplatePress(template: WorkoutTemplate) {
    router.back();
    setTypeOfView("workout");
    startSession(template);
  }

  function onAddTemplate() {
    router.back();
    setTypeOfView("template");
    editTemplate();
  }

  const renderTemplateCard = ({
    item,
    index,
  }: {
    item: WorkoutTemplate;
    index: number;
  }) => {
    const inputRange = [
      (index - 1) * cardWidth,
      index * cardWidth,
      (index + 1) * cardWidth,
    ];

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

    const tags = item.tags?.map((tag, i) => {
      if (item.tags.length > i + 1) return `${tag}, `;
      return `${tag}`;
    });

    return (
      <Animated.View
        style={{
          width: cardWidth,
          height: cardHeight,
          borderRadius: 16,
          borderWidth: 1,
          opacity,
          transform: [
            { scale },
            { perspective: 600 }, // important for 3D depth
            { rotateY },
          ],
          backgroundColor: theme.fifthBackground,
          borderColor: theme.border,
        }}
      >
        <TouchableOpacity
          style={{
            padding: 8,
            height: cardHeight,
            justifyContent: "space-between",
          }}
          onPress={() => handleTemplatePress(item)}
          activeOpacity={0.7}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                flex: 1,
                color: theme.secondaryBackground,
              }}
              numberOfLines={2}
            >
              {item.name}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "500",
              color: theme.border,
            }}
            adjustsFontSizeToFit
            numberOfLines={3}
            minimumFontScale={0.5}
          >
            {tags}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <Text
                style={{
                  fontSize: 8,
                  fontWeight: "bold",
                  color: theme.secondaryText,
                }}
              >
                {item.layout?.length} exercises
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

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
          newIndex < templates.length
        ) {
          // Track scroll direction and update selected dot index
          if (newIndex > currentIndex) {
            // setLastScrollDirection("right");
            // Move dot right, but don't go beyond index 6
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

  function handleWidgetPress() {
    router.push("/templates");
  }

  return (
    <TouchableOpacity
      onPress={handleWidgetPress}
      style={{
        borderRadius: 32,
        padding: 4,
        borderWidth: 1,
        backgroundColor: hexToRGBA(theme.fourthBackground, 0.2),
        borderColor: theme.border,
        width: widgetUnit,
        height: widgetUnit,
      }}
    >
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 8,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 34,
          width: widgetUnit,
          // marginBottom: 8,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", color: theme.text }}>
          Templates
        </Text>
        <Ionicons name="chevron-forward" color={theme.accent} size={24} />
      </View>

      {/* Horizontal Card List */}
      <Animated.FlatList
        data={templates}
        renderItem={renderTemplateCard}
        keyExtractor={(item: WorkoutTemplate, index: number) =>
          `${item.id}-${index}`
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth}
        decelerationRate="fast"
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={{ width: widgetUnit - 10 }}
        nestedScrollEnabled={true}
      />

      {/* Simple Static Dot Indicator (Max 7 dots) */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 10,
          width: widgetUnit - 42,
          height: 32,
        }}
      >
        {Array.from({ length: 5 }).map((_, dotIndex) => {
          // No-hop dots logic: dots move adjacent positions, pin at edges
          let actualCardIndex;
          let isActive = false;

          if (templates.length <= 5) {
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
            actualCardIndex = Math.min(actualCardIndex, templates.length - 1);
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
      {/* Add Button */}
      <BounceButton
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          width: 32,
          height: 32,
          borderRadius: 16,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: theme.shadow,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 4,
          backgroundColor: theme.tint,
        }}
        onPress={onAddTemplate}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={24} color={theme.background} />
      </BounceButton>
    </TouchableOpacity>
  );
}
