import React from "react";
import { View, Text, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../stores/settingsStore";
import WidgetContainer from "./WidgetContainer";
import hexToRGBA from "../../../features/HEXtoRGB";

interface StatsWidgetProps {
  onPress?: () => void;
  style?: ViewStyle;
}

export default function StatsWidget({ onPress, style }: StatsWidgetProps) {
  const { theme } = useSettingsStore();

  // Mock data for workout durations (in minutes) over the past 2 weeks
  const workoutDurations = [
    45, 0, 30, 75, 50, 90, 35, 65, 0, 80, 55, 70, 45, 60,
  ]; // Last 14 days (0 = no workout)
  const totalWorkouts = workoutDurations.filter(
    (duration) => duration > 0
  ).length;
  const maxDuration = 120; // 2 hours max for scaling
  const maxHeight = 80; // Max bar height in pixels

  // Day labels for the past 2 weeks
  const dayLabels = [
    "M",
    "T",
    "W",
    "T",
    "F",
    "S",
    "S",
    "M",
    "T",
    "W",
    "T",
    "F",
    "S",
    "S",
  ];

  // Time scale labels (30-minute increments)
  const timeLabels = ["0.5h", "1h", "1.5h", "2h"];

  return (
    <WidgetContainer style={style} variant="inset">
      <View
        style={{
          flex: 1,
          paddingVertical: 16,
          paddingHorizontal: 8,
          justifyContent: "space-between",
        }}
      >
        {/* Title Section */}
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
            Duration
          </Text>
        </View>

        {/* Timeline Chart Visualization */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1, width: "100%" }}>
            {/* Y-axis Time Labels */}
            <View
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                gap: 10,
                justifyContent: "space-between",
              }}
            >
              {timeLabels.reverse().map((label: any, index: number) => (
                <Text
                  key={label}
                  style={{
                    fontSize: 8,
                    color: theme.text,
                    textAlign: "right",
                  }}
                >
                  {label}
                </Text>
              ))}
            </View>

            {/* Chart Area */}
            <View
              style={{
                marginLeft: 18,
                marginTop: 4,
                height: maxHeight,
                position: "relative",
              }}
            >
              {/* Horizontal Grid Lines */}
              {[0, 1, 2, 3].map((line: any) => (
                <View
                  key={line}
                  style={{
                    position: "absolute",
                    top: line * 20,
                    left: 2,
                    right: 0,
                    height: 1,
                    backgroundColor: theme.grayText,
                  }}
                />
              ))}

              {/* Timeline Bars */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  height: maxHeight,
                  paddingHorizontal: 2,
                }}
              >
                {workoutDurations.map((duration: any, index: number) => {
                  const height =
                    duration > 0 ? (duration / maxDuration) * maxHeight : 4; // Minimum height for empty days
                  const isRecent = index >= 7;

                  return (
                    <View
                      key={index}
                      style={{
                        flex: 1,
                        alignItems: "center",
                        marginHorizontal: 1,
                      }}
                    >
                      {/* Workout Duration Bar */}
                      <View
                        style={{
                          width: 6,
                          height: height,
                          backgroundColor:
                            duration > 0
                              ? isRecent
                                ? theme.tint
                                : hexToRGBA(theme.tint, 0.5)
                              : hexToRGBA(theme.grayText, 0.2),
                          borderRadius: 3,
                          marginBottom: 2,
                          zIndex: 1,
                        }}
                      />
                    </View>
                  );
                })}
              </View>
            </View>

            {/* X-axis Day Labels */}
            <View
              style={{
                marginLeft: 18,
                marginTop: 4,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 2,
              }}
            >
              {dayLabels.map((day: any, index: number) => (
                <Text
                  key={index}
                  style={{
                    fontSize: 8,
                    color: theme.text,
                    textAlign: "center",
                    flex: 1,
                    marginHorizontal: 1,
                  }}
                >
                  {day}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </View>
    </WidgetContainer>
  );
}
