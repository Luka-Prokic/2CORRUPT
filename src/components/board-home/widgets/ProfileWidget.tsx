import { View, Text, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../../stores/settingsStore";
import { ProfileButton } from "../../settings-profile/ProfileButton";
import { SettingsButton } from "../../settings-app/SettingsButton";
import { hexToRGBA } from "../../../features/HEXtoRGB";
import { useWidgetUnit } from "../../../features/widgets/useWidgetUnit";
import { useUserStore } from "../../../stores/userStore";
import { useStatsStore } from "../../../stores/stats";
import { useTranslation } from "react-i18next";
import { useWorkoutStore } from "../../../stores/workout/useWorkoutStore";

export function ProfileWidget() {
  const { theme } = useSettingsStore();
  const { widgetUnit } = useWidgetUnit();
  const { user } = useUserStore();
  const { totalWorkouts } = useStatsStore();
  const { completedSessions } = useWorkoutStore();
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={[
        {
          justifyContent: "center",
          alignItems: "center",
          borderColor: theme.border,
          borderRadius: 44,
          borderWidth: 1,
          width: widgetUnit,
          height: widgetUnit,
          backgroundColor: hexToRGBA(theme.fourthBackground, 0.2),
          marginBottom: 8,
        },
      ]}
      onPress={() => {}}
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
          marginTop: 24,
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
          {user?.username || t("app.no-username")}
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
          {/* Member Since */}
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: "600",
                color: theme.tint,
                textTransform: "uppercase",
                marginBottom: 2,
              }}
            >
              {t("app.since")}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: theme.text,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {(user?.joinDate && new Date(user.joinDate).getFullYear()) ||
                t("app.no-date")}
            </Text>
          </View>
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
              {totalWorkouts || completedSessions.length || 0}
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: theme.accent,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {t("app.workouts")}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
