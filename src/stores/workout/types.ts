// Types for the modular workout store
export type IsoDateString = string;

// Canonical exercise reference (master data)
export interface ExerciseInfo {
  readonly id: string;
  readonly slug?: string;
  readonly defaultName: string;
  readonly category?: string;
  readonly primaryMuscles: readonly string[];
  readonly secondaryMuscles?: readonly string[];
  readonly equipment?: readonly string[];
  readonly metadata?: Record<string, any>;
  readonly updatedAt?: IsoDateString;
}

// Drop set - simplified set for additional reps after main set
export interface DropSet {
  readonly id: string;
  reps: number | null;
  weight: number | null;
}

// Unified workout set - replaces PlannedSet and PerformedSet
export interface Set {
  readonly id: string;
  reps: number | null;
  weight: number | null;
  restSeconds?: number | null;
  rir?: number | null; // Reps in reserve
  rpe?: number | null;
  isCompleted?: boolean;
  dropSets?: DropSet[];
}

// Workout template (blueprint)
export interface WorkoutTemplate {
  readonly id: string;
  name: string;
  description?: string;
  version: number;
  readonly createdAt: IsoDateString;
  updatedAt?: IsoDateString;
  layout: SessionExercise[];
  tags?: readonly string[];
  isPublic?: boolean;
  metadata?: Record<string, any>;
}

export type ExerciseColumns = "Reps" | "Weight" | "RIR" | "RPE";

// Session snapshot of an exercise with sets
export interface SessionExercise {
  readonly id: string; // snapshot id for session level
  exerciseInfoId?: string | null;
  name: string;
  prefix?: string; // new prefix field
  primaryMuscles: string[];
  secondaryMuscles?: string[];
  equipment?: string[];
  notes?: string | null;
  sets: Set[];
  columns?: ExerciseColumns[];
  restTime?: number | null;
}

// Workout session (single source of truth for a performed workout)
export interface WorkoutSession {
  readonly id: string;
  readonly userId?: string | null;
  readonly templateId?: string | null;
  readonly templateVersion?: number | null;
  name: string;
  readonly startTime: IsoDateString;
  endTime?: IsoDateString | null;
  isActive: boolean;
  layout: SessionExercise[];
  totals?: {
    totalSets?: number;
    totalReps?: number;
    totalVolumeKg?: number;
    durationSeconds?: number;
  };
  notes?: string | null;
  readonly createdAt: IsoDateString;
  updatedAt?: IsoDateString;
}

// Slice contracts
export interface TemplateSlice {
  templates: WorkoutTemplate[];
  activeTemplateId: string | null;
  createTemplate: (
    name: string,
    description: string | undefined,
    layout: SessionExercise[]
  ) => string;
  updateTemplate: (
    templateId: string,
    updates: Partial<WorkoutTemplate>
  ) => void;
  deleteTemplate: (templateId: string) => void;
  getTemplateById: (templateId: string) => WorkoutTemplate | null;
  setActiveTemplate: (templateId: string) => void;
}

export interface SessionSlice {
  activeSession: WorkoutSession | null;
  isWorkoutActive: boolean;
  completedSessions: WorkoutSession[];
  startSession: (template?: WorkoutTemplate) => void;
  completeSession: () => void;
  cancelSession: () => void;
  addExerciseToSession: (
    exercise: SessionExercise,
    afterItemId?: string
  ) => void;
  removeExercisesFromSession: (exerciseIds: string[]) => void;
  reorderSessionItems: (newOrder: SessionExercise[]) => void;
}

export interface ExerciseSlice {
  activeExercise: SessionExercise | null;
  exercises: ExerciseInfo[];
  setActiveExercise: (exerciseId: string) => void;
  clearActiveExercise: () => void;
  syncActiveExerciseToSession: () => void;
  updateActiveExercise: (updates: Partial<SessionExercise>) => void;
  addSetToActiveExercise: (
    reps?: number | null,
    weight?: number | null
  ) => void;
  updateSetInActiveExercise: (setId: string, updates: Partial<Set>) => void;
  removeSetFromActiveExercise: (setId: string) => void;
  addDropSetToActiveExercise: (
    setId: string,
    reps: number | null,
    weight: number | null
  ) => void;
  updateDropSetInActiveExercise: (
    setId: string,
    dropSetId: string,
    updates: Partial<DropSet>
  ) => void;
  removeDropSetFromActiveExercise: (setId: string, dropSetId: string) => void;
  swapExerciseInActiveExercise: (exerciseId: string) => void;
}

export interface TimerSlice {
  restTimer: number;
  isTimerRunning: boolean;
  timerInterval?: NodeJS.Timeout;
  startTimer: (duration: number) => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

export interface StatsSlice {
  getActiveSessionStats: () => {
    totalSets: number;
    totalReps: number;
    totalVolumeKg: number;
    durationSeconds: number;
  } | null;
}

export interface FlowSlice {
  // Computed flags for UI
  isThereNext: boolean;
  isTherePrev: boolean;

  // Navigation actions
  goToNextExercise: () => void;
  goToPreviousExercise: () => void;

  updateNavigationFlags: () => void;
  // Optional utility function
  getActiveExerciseIndex: () => number | null;
}

export type WorkoutStore = TemplateSlice &
  SessionSlice &
  ExerciseSlice &
  TimerSlice &
  StatsSlice &
  FlowSlice;
