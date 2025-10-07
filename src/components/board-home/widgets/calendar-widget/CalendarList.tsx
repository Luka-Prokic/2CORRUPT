import { View, Text, TouchableOpacity } from "react-native";
import {WorkoutInDayCard} from "./WorkoutInDayCard";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { useSessionsByDate } from "../../../../features/workout/useSessionHistory";
import { Fragment } from "react/jsx-runtime";
import { useStartWorkoutNavigation } from "../../../../features/workout/useStartWorkoutNavigation";
import { useTranslation } from "react-i18next";

interface CalendarListProps {
  selectedDate: Date;
}

export function CalendarList({ selectedDate }: CalendarListProps) {
  const { theme } = useSettingsStore();
  const startWorkoutNavigation = useStartWorkoutNavigation();
  const { t } = useTranslation();
  const sessionsForDay = useSessionsByDate(selectedDate);
  const isToday = new Date().toDateString() === selectedDate.toDateString();

  return (
    <View style={{ flex: 1, paddingTop: 16 }}>
      {isToday ? (
        <TouchableOpacity
          style={{
            backgroundColor: theme.tint,
            height: 64,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 24,
            borderWidth: 1,
            borderColor: theme.border,
          }}
          onPress={startWorkoutNavigation}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: theme.secondaryText,
            }}
          >
            {t("calendar.start-workout")}
          </Text>
        </TouchableOpacity>
      ) : (
        <Fragment>
          {sessionsForDay.length > 0 ? (
            sessionsForDay.map((session) => (
              <WorkoutInDayCard key={session.id} session={session} />
            ))
          ) : (
            <WorkoutInDayCard />
          )}
        </Fragment>
      )}
    </View>
  );
}
