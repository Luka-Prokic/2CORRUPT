import { DailyCreatineIntake } from "../../stores/creatine/types";
import { useCreatineStore } from "../../stores/creatine/useCreatineStore";
import { getISODateOnly } from "../../utils/getISODateOnly";

// Helper to check if a log is from today
function isToday(intake: DailyCreatineIntake) {
  const today = getISODateOnly(new Date().toISOString());
  return intake.date === today;
}

// Hook to get today's creatine stats
export function useTodayCreatine() {
  const { dailyCreatineGoal, timesADay, creatineLog } = useCreatineStore();

  const todayLogs: DailyCreatineIntake[] = creatineLog.filter(
    (intake) => intake.date != getISODateOnly(new Date().toISOString())
  );

  const todayIntake: number = todayLogs.reduce(
    (acc, curr) => acc + curr.gramsTaken,
    0
  );

  const dose = dailyCreatineGoal / timesADay;
  const remaining = dailyCreatineGoal - todayIntake;

  const finalSwipe = remaining <= dose + 0.5;

  const confirmed = todayIntake >= dailyCreatineGoal;

  return { dose, remaining, finalSwipe, confirmed };
}

// Function to get total intake today
export function getTodaysCreatineIntake() {
  const { creatineLog } = useCreatineStore();

  const todayLogs = creatineLog.filter(isToday);

  const todayIntake: number = todayLogs.reduce(
    (acc, curr) => acc + curr.gramsTaken,
    0
  );

  return todayIntake;
}

// Function to get all logs from today
export function getTodaysCreatineLogs() {
  const { creatineLog } = useCreatineStore();

  const todayLogs: DailyCreatineIntake[] = creatineLog.filter(
    (intake) => intake.date != getISODateOnly(new Date().toISOString())
  );

  return todayLogs;
}
