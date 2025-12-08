// Types for the modular workout store
export type IsoDateString = string;

// Canonical exercise reference (master data)
export interface ExerciseInfo {
  readonly id: string;
  readonly slug?: string;
  readonly defaultName: string;
  readonly category?: string;
  readonly primaryMuscles?: readonly string[];
  readonly secondaryMuscles?: readonly string[];
  readonly equipment?: readonly string[];
  readonly metadata?: Record<string, any>;
  readonly updatedAt?: IsoDateString;
  readonly userId?: string | null;
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
  readonly primeId: string;
  readonly userId?: string | null;
  name: string;
  description?: string;
  version: number;
  readonly createdAt: IsoDateString;
  updatedAt?: IsoDateString;
  layout: SessionExercise[];
  tags?: string[];
  isPublic?: boolean;
  metadata?: {
    group?: string; // e.g. "Favorites", "Push Day", "UserCreatedGroup1"
    [key: string]: any;
  };
}

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
  noRest?: boolean;
}
export interface SplitPlanWorkout {
  readonly id: string;
  readonly templateId: string;
  readonly createdAt: IsoDateString;
  readonly updatedAt: IsoDateString;
  scheduledAt?: IsoDateString; // ISO date string for scheduled time
}

export interface SplitPlanDay {
  readonly id: string;
  workouts: SplitPlanWorkout[];
  isRest?: boolean;
}

export interface SplitPlan {
  readonly id: string;
  readonly userId?: string | null;
  name: string;
  split: SplitPlanDay[];
  splitLength: number;
  activeLength: number;
  description?: string;
  metadata?: Record<string, any>;
  readonly createdAt: IsoDateString;
  updatedAt?: IsoDateString;
}

export interface SplitPlanHistoryEntry {
  readonly id: string; // unique ID for this history entry
  readonly plan: Readonly<SplitPlan>; // frozen snapshot of the plan at activation
  readonly startDay: number; // index of first active day (0–6)
  readonly startTime: IsoDateString;
  readonly endTime?: IsoDateString;
}

export interface ActiveSplitPlanState {
  plan: SplitPlan;
  startDay: number;
  startTime: IsoDateString;
  endTime?: IsoDateString;
}

export interface SplitPlanSlice {
  // core data
  splitPlans: SplitPlan[];
  activeSplitPlan: ActiveSplitPlanState | null;

  // full activation timeline
  historySplitPlan: SplitPlanHistoryEntry[];

  // CRUD
  createSplitPlan: (plan?: Partial<SplitPlan>) => string;
  editSplitPlan: (planId: string) => SplitPlan | null;
  updateSplitPlanField: <K extends keyof SplitPlan>(
    planId: string,
    field: K,
    value: SplitPlan[K]
  ) => void;
  deleteSplitPlan: (planId: string) => void;

  // day management
  addDayToSplit: (
    planId: string,
    day?: Partial<SplitPlanDay>,
    dayIndex?: number
  ) => void;
  removeDayFromSplit: (planId: string, dayIndex: number) => void;
  reorderSplitDays: (planId: string, newOrder: SplitPlanDay[]) => void;
  updateSplitDayField: <K extends keyof SplitPlanDay>(
    planId: string,
    dayIndex: number,
    field: K,
    value: SplitPlanDay[K]
  ) => void;
  toggleDayRest: (planId: string, dayIndex: number) => void;

  // workout management
  addWorkoutToDay: (
    planId: string,
    dayIndex: number,
    templateId: string
  ) => void;
  removeWorkoutFromDay: (
    planId: string,
    dayIndex: number,
    workoutId: string
  ) => void;
  updateWorkoutInDay: (
    planId: string,
    dayIndex: number,
    workoutId: string,
    updates: Partial<SplitPlanWorkout>
  ) => void;
  swapWorkoutTemplate: (
    planId: string,
    dayIndex: number,
    workoutId: string,
    newTemplateId: string
  ) => void;
  reorderWorkoutsInDay: (
    planId: string,
    dayIndex: number,
    newOrder: string[]
  ) => void;
  reorderWorkoutsInDayAuto: (planId: string, dayIndex: number) => void;

  // activation & history
  setActiveSplitPlan: (
    plan: SplitPlan,
    startDay?: number,
    startTime?: IsoDateString
  ) => void;
  updateActiveSplitStartDay: (newStartDay: number) => void;
  endActiveSplitPlan: (endTime?: IsoDateString) => void;

  // getters
  getSplitById: (planId: string) => SplitPlan | undefined;
  getActiveSplitStartDay: () => number | null;

  // nosplit
  updateWeeklyGoal: (newGoal: number) => void;
}

export interface TemplateSlice {
  // Current templates
  templates: WorkoutTemplate[];

  // History of all previous versions
  historyTemplates: WorkoutTemplate[];

  // Currently active template
  activeTemplate: WorkoutTemplate | null;

  /**
   * Create a new template or a draft copy of an existing one.
   * Returns the new template's ID.
   */
  createTemplate: (template?: WorkoutTemplate) => string;

  // Sets an existing template (by id) or a new one as activeTemplate
  editTemplate: (templateId?: string) => string | null;

  updateTemplateField: <K extends keyof WorkoutTemplate>(
    templateId: string,
    field: K,
    value: WorkoutTemplate[K]
  ) => void;

  confirmTemplate: () => void;

  discardTemplate: () => void;

  setActiveTemplate: (template: WorkoutTemplate) => void;

  addExerciseToTemplate: (
    exercise: SessionExercise,
    afterItemId?: string
  ) => void;
  removeExercisesFromTemplate: (exerciseIds: string[]) => void;
  reorderTemplateItems: (newOrder: SessionExercise[]) => void;

  deleteTemplate: (templateId: string) => void;

  cloneTemplate: (templateId: string, tempName: string) => void;

  getTemplateById: (templateId: string) => WorkoutTemplate | null;
}

export interface SessionSlice {
  activeSession: WorkoutSession | null;
  completedSessions: WorkoutSession[];
  startSession: (template?: WorkoutTemplate, session?: WorkoutSession) => void;
  completeSession: () => void;
  cancelSession: () => void;
  addExerciseToSession: (
    exercise: SessionExercise,
    afterItemId?: string
  ) => void;
  removeExercisesFromSession: (exerciseIds: string[]) => void;
  removeSession: (sessionId: string) => void;
  reorderSessionItems: (newOrder: SessionExercise[]) => void;
  updateSessionField: <K extends keyof WorkoutSession>(
    sessionId: string,
    field: K,
    value: WorkoutSession[K]
  ) => void;
  getSessionById: (sessionId: string) => WorkoutSession | null;
}

export interface ExerciseSlice {
  activeExercise: SessionExercise | null;
  exercises: ExerciseInfo[];
  setActiveExercise: (exerciseId: string) => void;
  clearActiveExercise: () => void;
  syncActiveExerciseToSession: () => void;
  syncActiveExerciseToTemplate: () => void;
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

  getExerciseById: (exerciseId: string) => ExerciseInfo | null;
}

export interface DraftSlice {
  draftExercise: ExerciseInfo | null;
  placeholderExercise: ExerciseInfo | null; // used only as reference exercise// readonly

  startDraftExercise: (exercise?: ExerciseInfo) => void; // create OR edit
  updateDraftExercise: (updates: Partial<ExerciseInfo>) => void;
  clearDraftExercise: () => void;
  saveDraftExercise: () => void; // moves into exercises[]

  setPlaceholderExercise: (exercise: ExerciseInfo) => void;
  clearPlaceholderExercise: () => void;

  removeExercise: (exerciseId: string) => void; // removes from exercises[] // only user made ones
}
export interface RestSlice {
  restingExerciseId: string | null;
  restingSetId: string | null;

  startRestTime: number | null; // seconds since epoch
  estEndRestTime: number | null; // estimated end time in seconds

  startRest: (exerciseId: string, setId: string, duration: number) => void;
  endRest: (seconds?: number) => void;

  updateEstEndRestTime: (newEndSec: number) => void;
  extendEstEndRestTime: (amount: number) => void;
  reduceEstEndRestTime: (amount: number) => void;
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
  RestSlice &
  StatsSlice &
  FlowSlice &
  SplitPlanSlice &
  DraftSlice;
