import { View } from "react-native";
import { StrobeBlur } from "../../../ui/misc/StrobeBlur";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import { WorkoutSession } from "../../../../stores/workout/types";
import { useTranslation } from "react-i18next";

interface WorkoutInDayCardProps {
  session?: WorkoutSession;
}

export function WorkoutInDayCard({ session }: WorkoutInDayCardProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const isRestDay = !session;
  const title = isRestDay
    ? t("calendar.rest-day")
    : session.name || t("calendar.workout");
  const description = isRestDay ? "" : session.notes || "";
  const exerciseCount = !isRestDay ? session.layout?.length || 0 : 0;

  return (
    <StrobeBlur
      style={{
        padding: 16,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: theme.border,
        height: 64,
      }}
      colors={[theme.caka, theme.primaryBackground, theme.accent, theme.tint]}
      duration={5000}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 8,
        }}
      >
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
          }}
        >
          <Ionicons
            name={isRestDay ? "bandage" : "barbell"}
            size={32}
            color={isRestDay ? theme.tabIconDefault : theme.accent}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 4,
              color: theme.text,
            }}
          >
            {title}
          </Text>
          {!isRestDay && (
            <Text
              style={{
                fontSize: 12,
                marginTop: 2,
                opacity: 0.7,
                color: theme.grayText,
              }}
            >
              {exerciseCount} exercises
            </Text>
          )}
        </View>
      </View>

      {!isRestDay && description !== "" && (
        <Text
          style={{
            fontSize: 12,
            marginTop: 8,
            lineHeight: 16,
            opacity: 0.7,
            color: theme.grayText,
          }}
        >
          {description}
        </Text>
      )}
    </StrobeBlur>
  );
}
