import { View, Text, TouchableOpacity } from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import { SplitPlanDay } from "../../../stores/workout";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { router, useLocalSearchParams } from "expo-router";
import { Fragment } from "react";
import { BlurView } from "expo-blur";

interface SplitDayCardHeaderProps {
  day: SplitPlanDay;
  dayIndex: number;
  workoutCount: number;
  splitId: string;
}

export function SplitDayCardHeader({
  day,
  dayIndex,
  workoutCount,
  splitId,
}: SplitDayCardHeaderProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  const { splitId: routeSplitId } = useLocalSearchParams<{ splitId: string }>();

  const isActiveDay = !day.isRest;

  function handleAddWorkout() {
    router.push({
      pathname: "/splits/[splitId]/[dayIndex]/add",
      params: {
        splitId: routeSplitId || splitId,
        dayIndex: String(dayIndex),
      },
    });
  }

  return (
    <BlurView
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        height: 64,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: theme.text,
          }}
        >
          {t("splits.day")} {dayIndex + 1}
        </Text>
        <Ionicons
          name={day.isRest ? "rainy" : "barbell"}
          size={20}
          color={day.isRest ? theme.secondaryText : theme.fifthBackground}
          style={{ marginLeft: 12 }}
        />
        <Text
          style={{
            fontSize: 12,
            color: day.isRest ? theme.secondaryText : theme.fifthBackground,
            fontWeight: "500",
          }}
        >
          {day.isRest ? t("splits.rest") : t("splits.active")}
        </Text>
      </View>
      {isActiveDay && (
        <Fragment>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500",
                color: theme.secondaryText,
              }}
            >
              {workoutCount}{" "}
              {workoutCount === 1 ? t("splits.workout") : t("splits.workouts")}
            </Text>
          </View>

          <TouchableOpacity onPress={handleAddWorkout}>
            <Ionicons name="add-circle" size={34} color={theme.tint} />
          </TouchableOpacity>
        </Fragment>
      )}
    </BlurView>
  );
}
