import { SessionExerciseList } from "./sheets/exercises/SessionExerciseList";
import { ExerciseProfile } from "./profile/ExerciseProfile";
import { useWorkoutStore } from "../../stores/workoutStore";
import { RestTimerSheet } from "./sheets/rest/RestTimerSheet";
import { ExerciseNameSheet } from "./sheets/name/ExerciseNameSheet";
import { NoExerciseBoard } from "./NoExerciseBoard";
import { SessionSheet } from "./sheets/session/SessionSheet";
import { DashBoard } from "../ui/DashBoard";

export type SessionSheetType = "exercises" | "rest" | "name" | "session";

interface SessionDashboardProps {
  listOpen: boolean;
  listType: SessionSheetType;
  setListOpen: (listOpen: boolean) => void;
  setListType: (listType: SessionSheetType) => void;
}

export function SessionDashboard({
  listOpen,
  listType,
  setListOpen,
  setListType,
}: SessionDashboardProps) {
  const { activeExercise } = useWorkoutStore();

  function togglePanel() {
    setListOpen(!listOpen);
    setListType("exercises");
  }

  function openPanel() {
    setListOpen(true);
  }

  function upperSection() {
    if (!activeExercise) return <NoExerciseBoard />;
    return <ExerciseProfile openPanel={openPanel} setListType={setListType} />;
  }

  function visibleSheet() {
    if (listType === "exercises")
      return <SessionExerciseList togglePanel={togglePanel} />;
    if (listType === "rest") return <RestTimerSheet />;
    if (listType === "name") return <ExerciseNameSheet />;
    if (listType === "session") return <SessionSheet />;
  }

  return (
    <DashBoard
      listOpen={listOpen}
      togglePanel={togglePanel}
      disabled={!activeExercise && !listOpen}
      upperSection={upperSection()}
      lowerSection={listOpen && visibleSheet()}
    />
  );
}
