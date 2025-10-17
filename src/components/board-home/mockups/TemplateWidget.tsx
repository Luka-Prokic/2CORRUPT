import { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settingsStore";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { useWorkoutStore, WorkoutTemplate } from "../../../stores/workout";
import { router } from "expo-router";
import { useUIStore } from "../../../stores/ui";

const { width } = Dimensions.get("window");
const widgetSize = (width - 40) / 2;
const cardWidth = widgetSize * 0.8;
const cardHeight = 74;

interface TemplateCard {
  id: string;
  title: string;
  description: string;
  exercises: number;
  duration: string;
}

export function TemplateWidget() {
  const { theme } = useSettingsStore();
  const scrollX = useRef(new Animated.Value(0)).current;
  const { setTypeOfView } = useUIStore();
  const { editTemplate, startSession } = useWorkoutStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastScrollDirection, setLastScrollDirection] = useState<
    "left" | "right" | null
  >(null);
  const [selectedDotIndex, setSelectedDotIndex] = useState(0);

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
      outputRange: [0.6, 1, 0.6],
      extrapolate: "clamp",
    });

    // Scale: main card is larger, others are smaller
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
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
          transform: [{ scale }],
          backgroundColor: hexToRGBA(theme.primaryBackground, 1),
          borderColor: theme.border,
        }}
      >
        <TouchableOpacity
          style={{
            padding: 6,
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
              marginBottom: 2,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                flex: 1,
                marginRight: 4,
                color: theme.text,
              }}
              numberOfLines={2}
            >
              {item.name}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 8,
              marginBottom: 2,
              color: theme.grayText,
            }}
            numberOfLines={3}
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
              }}
            >
              <Ionicons name="flash-outline" size={14} color={theme.grayText} />
              <Text
                style={{
                  fontSize: 8,
                  marginLeft: 2,
                  color: theme.grayText,
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
            setLastScrollDirection("right");
            // Move dot right, but don't go beyond index 6
            setSelectedDotIndex((prev) => Math.min(6, prev + 1));
          } else if (newIndex < currentIndex) {
            setLastScrollDirection("left");
            // Move dot left, but don't go below index 0
            setSelectedDotIndex((prev) => Math.max(0, prev - 1));
          }

          setCurrentIndex(newIndex);
        }
      },
    }
  );

  // Dynamic counter: shows how many cards are still hidden
  const remainingCount = Math.max(0, templates.length - 1 - currentIndex);

  return (
    <View
      style={{
        borderRadius: 32,
        paddingVertical: 12,
        paddingHorizontal: 2,
        borderWidth: 1,
        justifyContent: "space-between",
        backgroundColor: hexToRGBA(theme.fourthBackground, 0.2),
        borderColor: theme.border,
        width: widgetSize,
        height: widgetSize,
      }}
    >
      {/* Header */}
      <View
        style={{
          marginBottom: 8,
          paddingHorizontal: 8,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", color: theme.text }}>
          Templates
        </Text>
        {/* Add Button */}
        <TouchableOpacity
          style={{
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
          <Ionicons name="add" size={20} color={theme.background} />
        </TouchableOpacity>
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
        style={{ width: "100%" }}
        nestedScrollEnabled={true}
        // Center the first card
        contentOffset={{ x: 0, y: 0 }}
        // Ensure proper centering behavior
        centerContent={false}
      />

      {/* Simple Static Dot Indicator (Max 7 dots) */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          paddingHorizontal: 8,
        }}
      >
        {Array.from({ length: 7 }).map((_, dotIndex) => {
          // No-hop dots logic: dots move adjacent positions, pin at edges
          let actualCardIndex;
          let isActive = false;

          if (templates.length <= 7) {
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
                backgroundColor: theme.accent,
                transform: [{ scale: isActive ? 1.2 : 0.8 }],
                opacity: isActive ? 1 : 0.4,
              }}
            />
          );
        })}

        {/* Counter */}
        <View
          style={{
            marginLeft: 8,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
            backgroundColor: hexToRGBA(theme.accent, 0.2),
            opacity: remainingCount > 0 ? 1 : 0,
          }}
        >
          <Text
            style={{ fontSize: 12, fontWeight: "600", color: theme.accent }}
          >
            +{remainingCount}
          </Text>
        </View>
      </View>
    </View>
  );
}
