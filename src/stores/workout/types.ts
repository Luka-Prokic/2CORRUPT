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
  notes?: string | null;
}

// Unified workout set - replaces PlannedSet and PerformedSet
export interface WorkoutSet {
  readonly id: string;
  reps: number | null;
  weight: number | null;
  restSeconds?: number | null;
  rir?: number | null; // Reps in reserve
  rpe?: number | null;
  notes?: string | null;
  isCompleted?: boolean;
  dropSets?: DropSet[];
}

// Layout items that compose a workout template (simplified)
export type LayoutItem =
  | { readonly type: "exercise"; readonly id: string; readonly name?: string }
  | { readonly type: "superset"; readonly id: string; readonly exerciseIds: readonly string[]; readonly name?: string }
  | { readonly type: "circuit"; readonly id: string; readonly exerciseIds: readonly string[]; readonly rounds?: number; readonly name?: string };

// Workout template (blueprint)
export interface WorkoutTemplate {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly version: number;
  readonly createdAt: IsoDateString;
  readonly updatedAt?: IsoDateString;
  readonly layout: readonly LayoutItem[];
  readonly tags?: readonly string[];
  readonly isPublic?: boolean;
  readonly metadata?: Record<string, any>;
}

// Session snapshot of an exercise with sets
export interface SessionExercise {
  readonly id: string; // snapshot id for session level
  readonly exerciseInfoId?: string | null;
  name: string;
  primaryMuscles: string[];
  secondaryMuscles?: string[];
  equipment?: string[];
  notes?: string | null;
  sets: WorkoutSet[];
}

// Items in an active session (snapshot of layout)
export type SessionLayoutItem =
  | { readonly type: "exercise"; readonly id: string; exercise: SessionExercise }
  | { readonly type: "superset"; readonly id: string; exercises: SessionExercise[]; name?: string }
  | { readonly type: "circuit"; readonly id: string; exercises: SessionExercise[]; rounds?: number };

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
  items: SessionLayoutItem[];
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
  createTemplate: (name: string, description: string | undefined, layout: LayoutItem[]) => void;
  updateTemplate: (templateId: string, updates: Partial<WorkoutTemplate>) => void;
  deleteTemplate: (templateId: string) => void;
  setActiveTemplate: (templateId: string) => void;
}

export interface SessionSlice {
  activeSession: WorkoutSession | null;
  isWorkoutActive: boolean;
  completedSessions: WorkoutSession[];
  startSession: (templateId?: string) => void;
  completeSession: () => void;
  logSet: (layoutItemId: string, reps: number | null, weight: number | null, rpe?: number | null, notes?: string | null) => void;
  updateSet: (setId: string, updates: Partial<WorkoutSet>) => void;
  deleteSet: (setId: string) => void;
  addDropSet: (setId: string, reps: number | null, weight: number | null, notes?: string | null) => void;
  updateDropSet: (setId: string, dropSetId: string, updates: Partial<DropSet>) => void;
  deleteDropSet: (setId: string, dropSetId: string) => void;
  resetSession: () => void;
}

export interface ExerciseSlice {
  addExerciseToSession: (exercise: SessionExercise, afterItemId?: string) => void;
  removeItemFromSession: (layoutItemId: string) => void;
  reorderSessionItems: (fromIndex: number, toIndex: number) => void;
  updateSessionItemNotes: (layoutItemId: string, notes: string | null) => void;
  addSetToExercise: (layoutItemId: string, reps?: number | null, weight?: number | null) => void;
  removeSetFromExercise: (layoutItemId: string, setId: string) => void;
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

export type WorkoutStore = TemplateSlice & SessionSlice & ExerciseSlice & TimerSlice & StatsSlice;