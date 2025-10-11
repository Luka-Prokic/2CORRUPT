import { View } from "react-native";
import { WorkoutInDayCard } from "./cards/WorkoutInDayCard";
import { NoWorkoutTodayCard } from "./cards/NoWorkoutTodayCard";
import { useSessionsByDate } from "../../../../features/workout/useSessionHistory";
import { Fragment } from "react/jsx-runtime";

interface CalendarListProps {
  selectedDate: Date;
}

export function CalendarList({ selectedDate }: CalendarListProps) {
  const sessionsForDay = useSessionsByDate(selectedDate);
  const isToday = new Date().toDateString() === selectedDate.toDateString();

  console.log(sessionsForDay.map((session) => session.name));
  console.log("selected date", selectedDate);
  console.log("isToday", isToday);

  return (
    <View style={{ flex: 1, paddingTop: 16 }}>
      {isToday ? (
        <Fragment>
          {sessionsForDay.length > 0 ? (
            sessionsForDay.map((session) => (
              <WorkoutInDayCard key={session.id} session={session} />
            ))
          ) : (
            <NoWorkoutTodayCard />
          )}
        </Fragment>
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
