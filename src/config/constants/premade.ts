import {
  SessionExercise,
  WorkoutSession,
  WorkoutTemplate,
} from "../../stores/workout/types";
import { nanoid } from "nanoid/non-secure";

const now = new Date();
// 1 → today
const start = new Date(now.getTime() - 80 * 60 * 1000).toISOString();
const end = now.toISOString();

// 2 → yesterday
const start2 = new Date(
  now.getTime() - 24 * 60 * 60 * 1000 - 90 * 60 * 1000
).toISOString();
const end2 = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

// 3 → day before yesterday
const start3 = new Date(
  now.getTime() - 2 * 24 * 60 * 60 * 1000 - 70 * 60 * 1000
).toISOString();
const end3 = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString();

//
// --- EXERCISES ---
//

const makeSet = (reps: number, weight: number) => ({
  id: `set-${nanoid()}`,
  reps,
  weight,
  isCompleted: true,
});

const overheadPressExample: SessionExercise = {
  id: "ex-ohp-23123123",
  exerciseInfoId: "ex-ohp",
  name: "Overhead Press",
  prefix: "Barbell",
  primaryMuscles: ["front delts", "side delts"],
  secondaryMuscles: ["triceps", "rear delts"],
  equipment: ["barbell"],
  notes: "Focus on strict form, avoid arching back",
  sets: [makeSet(8, 60), makeSet(6, 62.5), makeSet(5, 65)],
  columns: ["Reps", "Weight"],
  restTime: 90,
  noRest: false,
};

const benchPressExample: SessionExercise = {
  id: "ex-bench-press-" + nanoid(),
  exerciseInfoId: "ex-bench-press",
  name: "Barbell Bench Press",
  prefix: "Barbell",
  primaryMuscles: ["mid chest"],
  secondaryMuscles: ["triceps", "front delts"],
  equipment: ["barbell", "bench"],
  notes: "Pause slightly on the chest for better control",
  sets: [makeSet(10, 80), makeSet(8, 85), makeSet(6, 90)],
  columns: ["Reps", "Weight"],
  restTime: 120,
  noRest: false,
};

const barbellRowExample: SessionExercise = {
  id: "ex-barbell-row-" + nanoid(),
  exerciseInfoId: "ex-barbell-row",
  name: "Barbell Row",
  prefix: "Barbell",
  primaryMuscles: ["lats", "rear delts"],
  secondaryMuscles: ["biceps", "mid traps"],
  equipment: ["barbell"],
  notes: "Keep back parallel to the floor and pull explosively",
  sets: [makeSet(8, 70), makeSet(8, 75), makeSet(6, 80)],
  columns: ["Reps", "Weight"],
  restTime: 90,
  noRest: false,
};

const backSquatExample: SessionExercise = {
  id: "ex-back-squat-" + nanoid(),
  exerciseInfoId: "ex-back-squat",
  name: "Back Squat",
  prefix: "Barbell",
  primaryMuscles: ["quads", "glutes"],
  secondaryMuscles: ["hamstrings", "core"],
  equipment: ["barbell", "rack"],
  notes: "Full depth, maintain upright torso",
  sets: [makeSet(8, 100), makeSet(6, 110), makeSet(5, 115)],
  columns: ["Reps", "Weight"],
  restTime: 150,
  noRest: false,
};

const deadliftExample: SessionExercise = {
  id: "ex-deadlift-" + nanoid(),
  exerciseInfoId: "ex-deadlift",
  name: "Conventional Deadlift",
  prefix: "Barbell",
  primaryMuscles: ["hamstrings", "glutes", "lower back"],
  secondaryMuscles: ["mid traps", "forearms"],
  equipment: ["barbell"],
  notes: "Reset every rep, keep bar close to the shins",
  sets: [makeSet(5, 130), makeSet(5, 135), makeSet(3, 140)],
  columns: ["Reps", "Weight"],
  restTime: 180,
  noRest: false,
};

const dipsExample: SessionExercise = {
  id: "ex-dips-" + nanoid(),
  exerciseInfoId: "ex-dips",
  name: "Weighted Dips",
  prefix: "Bodyweight",
  primaryMuscles: ["mid chest"],
  secondaryMuscles: ["triceps", "front delts"],
  equipment: ["dip-bar"],
  notes: "Slight forward lean to target chest",
  sets: [makeSet(10, 10), makeSet(8, 15), makeSet(6, 20)],
  columns: ["Reps", "Weight"],
  restTime: 90,
  noRest: false,
};

//
// --- MOCK SESSIONS ---
//

export const mockSession: WorkoutSession = {
  id: "mock-one",
  name: "Mock 1",
  startTime: start,
  endTime: end,
  isActive: true,
  layout: [benchPressExample, overheadPressExample, barbellRowExample],
  notes: "Mock push-pull session for testing",
  createdAt: now.toISOString(),
  updatedAt: now.toISOString(),
};

export const mockSessionTwo: WorkoutSession = {
  id: "mock-two",
  name: "Mock 2",
  startTime: start2,
  endTime: end2,
  isActive: true,
  layout: [backSquatExample, deadliftExample],
  notes: "Mock lower body day",
  createdAt: now.toISOString(),
  updatedAt: now.toISOString(),
};

export const mockSessionThree: WorkoutSession = {
  id: "mock-three",
  name: "Mock 3",
  startTime: start3,
  endTime: end3,
  isActive: true,
  layout: [dipsExample, overheadPressExample],
  notes: "Mock upper body finisher session",
  createdAt: now.toISOString(),
  updatedAt: now.toISOString(),
};

export const makeTemplateSet = (
  reps: number,
  weight: number,
  isCompleted: boolean = true
) => ({
  id: `set-${nanoid()}`,
  reps,
  weight,
  isCompleted,
});

export const templatePushDay: WorkoutTemplate = {
  id: `template-push-${nanoid()}`,
  primeId: "template-push",
  name: "Push Day",
  description:
    "Classic push workout focusing on chest, shoulders, and triceps.",
  version: 1,
  createdAt: new Date().toISOString(),
  layout: [
    {
      id: `ex-bench-${nanoid()}`,
      exerciseInfoId: "ex-bench-press",
      name: "Barbell Bench Press",
      prefix: "Barbell",
      primaryMuscles: ["mid chest"],
      secondaryMuscles: ["triceps", "front delts"],
      equipment: ["barbell", "bench"],
      sets: [
        makeTemplateSet(8, 70, false),
        makeTemplateSet(6, 80, false),
        makeTemplateSet(5, 85, false),
      ],
      columns: ["Reps", "Weight"],
      restTime: 120,
    },
    {
      id: `ex-ohp-${nanoid()}`,
      exerciseInfoId: "ex-ohp",
      name: "Overhead Press",
      prefix: "Barbell",
      primaryMuscles: ["front delts"],
      secondaryMuscles: ["triceps", "side delts"],
      equipment: ["barbell"],
      sets: [
        makeTemplateSet(8, 40, false),
        makeTemplateSet(6, 45, false),
        makeTemplateSet(5, 50, false),
      ],
      columns: ["Reps", "Weight"],
      restTime: 90,
    },
    {
      id: `ex-dips-${nanoid()}`,
      exerciseInfoId: "ex-dips",
      name: "Weighted Dips",
      prefix: "Bodyweight",
      primaryMuscles: ["mid chest"],
      secondaryMuscles: ["triceps"],
      equipment: ["dip-bar"],
      sets: [
        makeTemplateSet(10, 0, false),
        makeTemplateSet(8, 10, false),
        makeTemplateSet(6, 15, false),
      ],
      columns: ["Reps", "Weight"],
      restTime: 90,
    },
  ],
  tags: ["Push", "Chest", "Shoulders"],
};

export const templatePullDay: WorkoutTemplate = {
  id: `template-pull-${nanoid()}`,
  primeId: "template-pull",
  name: "Pull Day",
  description: "Back-focused session with rowing and pulling variations.",
  version: 1,
  createdAt: new Date().toISOString(),
  layout: [
    {
      id: `ex-row-${nanoid()}`,
      exerciseInfoId: "ex-barbell-row",
      name: "Barbell Row",
      prefix: "Barbell",
      primaryMuscles: ["lats", "rear delts"],
      secondaryMuscles: ["biceps", "mid traps"],
      equipment: ["barbell"],
      sets: [
        makeTemplateSet(8, 60, false),
        makeTemplateSet(8, 65, false),
        makeTemplateSet(6, 70, false),
      ],
      columns: ["Reps", "Weight"],
      restTime: 120,
    },
    {
      id: `ex-pulldown-${nanoid()}`,
      name: "Lat Pulldown",
      prefix: "Cable",
      primaryMuscles: ["lats"],
      secondaryMuscles: ["biceps"],
      equipment: ["cable"],
      sets: [
        makeTemplateSet(12, 50, false),
        makeTemplateSet(10, 55, false),
        makeTemplateSet(8, 60, false),
      ],
      columns: ["Reps", "Weight"],
      restTime: 90,
    },
    {
      id: `ex-curl-${nanoid()}`,
      name: "Dumbbell Curl",
      prefix: "Dumbbell",
      primaryMuscles: ["biceps"],
      equipment: ["dumbbell"],
      sets: [
        makeTemplateSet(12, 12, false),
        makeTemplateSet(10, 14, false),
        makeTemplateSet(8, 16, false),
      ],
      columns: ["Reps", "Weight"],
      restTime: 60,
    },
  ],
  tags: ["Pull", "Back", "Biceps"],
};

export const templateLegsDay: WorkoutTemplate = {
  id: `template-legs-${nanoid()}`,
  primeId: "template-legs",
  name: "Leg Day",
  description: "Strength-focused lower-body session.",
  version: 1,
  createdAt: new Date().toISOString(),
  layout: [
    {
      id: `ex-squat-${nanoid()}`,
      exerciseInfoId: "ex-back-squat",
      name: "Barbell Back Squat",
      primaryMuscles: ["quads", "glutes"],
      secondaryMuscles: ["hamstrings"],
      equipment: ["barbell", "rack"],
      sets: [
        makeTemplateSet(8, 90, false),
        makeTemplateSet(6, 100, false),
        makeTemplateSet(5, 110, false),
      ],
      columns: ["Reps", "Weight"],
      restTime: 150,
    },
    {
      id: `ex-deadlift-${nanoid()}`,
      exerciseInfoId: "ex-deadlift",
      name: "Barbell Romanian Deadlift",
      primaryMuscles: ["hamstrings"],
      secondaryMuscles: ["glutes", "lower back"],
      equipment: ["barbell"],
      sets: [
        makeTemplateSet(8, 80, false),
        makeTemplateSet(8, 90, false),
        makeTemplateSet(6, 95, false),
      ],
      columns: ["Reps", "Weight"],
      restTime: 150,
    },
    {
      id: `ex-lunge-${nanoid()}`,
      name: "Dumbbell Lunges",
      primaryMuscles: ["quads", "glutes"],
      equipment: ["dumbbell"],
      sets: [
        makeTemplateSet(10, 20, false),
        makeTemplateSet(10, 22, false),
        makeTemplateSet(10, 24, false),
      ],
      columns: ["Reps", "Weight"],
      restTime: 90,
    },
  ],
  tags: ["Legs", "Lower Body"],
};

export const templateUpperDay: WorkoutTemplate = {
  id: `template-upper-${nanoid()}`,
  primeId: "template-upper",
  name: "Upper Day",
  description: "Balanced upper-body session combining pressing and pulling.",
  version: 1,
  createdAt: new Date().toISOString(),
  layout: [
    { ...benchPressExample, id: `ex-${nanoid()}` },
    { ...barbellRowExample, id: `ex-${nanoid()}` },
    { ...overheadPressExample, id: `ex-${nanoid()}` },
  ],
  tags: ["Upper", "Balanced"],
};

export const templateFullBody: WorkoutTemplate = {
  id: `template-full-${nanoid()}`,
  primeId: "template-full",
  name: "Full Body",
  description: "Simple full-body program using compound movements.",
  version: 1,
  createdAt: new Date().toISOString(),
  layout: [
    { ...backSquatExample, id: `ex-${nanoid()}` },
    { ...benchPressExample, id: `ex-${nanoid()}` },
    { ...barbellRowExample, id: `ex-${nanoid()}` },
  ],
  tags: ["Full Body", "Strength"],
};
