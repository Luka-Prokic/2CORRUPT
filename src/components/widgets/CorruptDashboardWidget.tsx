import React from "react";
import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "../../stores/themeStore";
import WidgetContainer from "./WidgetContainer";
import hexToRGBA from "../../hooks/HEXtoRGB";

interface CorruptDashboardWidgetProps {
  onPress?: () => void;
  style?: ViewStyle;
}

export default function CorruptDashboardWidget({ onPress, style }: CorruptDashboardWidgetProps) {
  const { theme } = useThemeStore();
  
  // Mock data
  const activeSplit = {
    name: "Push Pull Legs",
    days: 6,
    currentDay: 3,
    icon: "fitness-outline"
  };
  
  const workoutStreak = 12;

  return (
    <WidgetContainer style={style} variant="inset">
      <View
        style={{
          flex: 1,
          padding: 12,
          justifyContent: "space-between",
        }}
      >
        {/* Active Split Widget (2x1 horizontal) */}
        <TouchableOpacity
          style={{
            backgroundColor: hexToRGBA(theme.accent, 0.15),
            borderRadius: 16,
            padding: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 1,
            borderColor: hexToRGBA(theme.accent, 0.3),
            marginBottom: 8,
          }}
          activeOpacity={0.8}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: theme.accent,
                marginBottom: 4,
              }}
            >
              ACTIVE SPLIT
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "800",
                color: theme.text,
                marginBottom: 6,
              }}
            >
              {activeSplit.name}
            </Text>
            
            {/* Progress Bar */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: theme.grayText,
                  fontWeight: "600",
                }}
              >
                Day {activeSplit.currentDay} of {activeSplit.days}
              </Text>
              <View
                style={{
                  flex: 1,
                  height: 4,
                  backgroundColor: hexToRGBA(theme.accent, 0.2),
                  borderRadius: 2,
                  marginLeft: 8,
                }}
              >
                <View
                  style={{
                    width: `${(activeSplit.currentDay / activeSplit.days) * 100}%`,
                    height: "100%",
                    backgroundColor: theme.accent,
                    borderRadius: 2,
                  }}
                />
              </View>
            </View>
          </View>
          
          <Ionicons
            name={activeSplit.icon as any}
            size={32}
            color={theme.accent}
          />
        </TouchableOpacity>

        {/* Bottom Row - All Button & Streak */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          {/* All Button Widget (1x1) */}
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: hexToRGBA(theme.tint, 0.1),
              borderRadius: 12,
              padding: 12,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: hexToRGBA(theme.tint, 0.2),
            }}
            activeOpacity={0.8}
          >
            <Ionicons
              name="grid-outline"
              size={24}
              color={theme.tint}
              style={{ marginBottom: 4 }}
            />
            <Text
              style={{
                fontSize: 12,
                fontWeight: "700",
                color: theme.tint,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              ALL
            </Text>
          </TouchableOpacity>

          {/* Workout Streak Widget (1x1) */}
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: hexToRGBA(theme.text, 0.05),
              borderRadius: 12,
              padding: 12,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: hexToRGBA(theme.border, 0.3),
              position: "relative",
            }}
            activeOpacity={0.8}
          >
            {/* Streak Fire Icon */}
            <View
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: hexToRGBA(theme.accent, 0.2),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="flame"
                size={10}
                color={theme.accent}
              />
            </View>
            
            <Text
              style={{
                fontSize: 20,
                fontWeight: "900",
                color: theme.text,
                marginBottom: 2,
              }}
            >
              {workoutStreak}
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: theme.grayText,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                fontWeight: "600",
              }}
            >
              STREAK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </WidgetContainer>
  );
}
