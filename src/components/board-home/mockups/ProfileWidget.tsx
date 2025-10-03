import React from "react";
import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import WidgetContainer from "./WidgetContainer";
import ProfileButton from "../../profile-settings/ProfileButton";
import SettingsButton from "../../app-settings/SettingsButton";
import {username} from "../../../config/constants/defaults";

interface ProfileWidgetProps {
  onPress?: () => void;
  style?: ViewStyle;
}

export default function ProfileWidget({ onPress, style }: ProfileWidgetProps) {
  const { theme } = useSettingsStore();

  return (
    <WidgetContainer style={style} variant="inset">
      <TouchableOpacity
        style={[
          {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <ProfileButton />
          <SettingsButton />
        </View>
        {/* Mini Profile Card */}
        <View
          style={{
            flex: 1,
            margin: 4,
          }}
        >
          {/* Username */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: theme.text,
              textAlign: "left",
              marginLeft: 2,
              marginBottom: 8,
            }}
          >
            {username || "Pencil Neck"}
          </Text>

          {/* Stats Row */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "flex-end",
              width: "100%",
              paddingHorizontal: 12,
            }}
          >
            {/* Workouts */}
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: theme.text,
                  marginBottom: 2,
                }}
              >
                124
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: theme.accent,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Workouts
              </Text>
            </View>

            {/* Member Since */}
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "600",
                  color: theme.tint,
                  marginBottom: 2,
                }}
              >
                SINCE
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: theme.text,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                2024
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </WidgetContainer>
  );
}
