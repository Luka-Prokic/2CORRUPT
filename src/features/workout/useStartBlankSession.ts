import { useWorkoutStore } from "../../stores/workout/useWorkoutStore";
import { dummySessionLayout } from "../../config/constants/defaults";
import { WorkoutTemplate } from "../../stores/workout/types";

/**
 * Hook to start a blank/custom workout session
 */

export const useStartBlankSession = () => {
  const { startSession } = useWorkoutStore();

  const startBlankSession = () => {
    const template: WorkoutTemplate = {
      id: Date.now().toString(),
      name: `Workout ${new Date().toLocaleDateString("en-GB")}`, // e.g. "07/10/2025"
      description: "Custom workout",
      version: 1,
      layout: dummySessionLayout,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    startSession(template);
  };
  return { startBlankSession };
};
