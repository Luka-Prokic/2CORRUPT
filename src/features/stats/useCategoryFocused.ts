// workoutFocus.ts
// --------------------------------------------------
// Determines high-level workout focus (push / pull / etc)
// based on selected MUSCLE CATEGORIES (not individual muscles).
//
// Philosophy:
// muscles  → categories  → focus
// --------------------------------------------------

import { MuscleCategory } from "../../stores/workout";

/**
 * These MUST match your defaultMuscleCategories ids
 */
export type MuscleCategoryId =
  | "full-body"
  | "chest"
  | "shoulders"
  | "back"
  | "arms"
  | "legs"
  | "core";

/**
 * Semantic workout focus labels
 */
export type WorkoutFocus =
  | "push"
  | "pull"
  | "upper-body"
  | "lower-body"
  | "full-body"
  | "core"
  | "arms"
  | "mixed";

/**
 * Rule definition
 *
 * - includes: categories that MUST be present
 * - excludes: categories that MUST NOT be present
 *
 * Rules are evaluated in order.
 * First match wins.
 */
export interface FocusRule {
  focus: WorkoutFocus;
  includes: MuscleCategoryId[];
  excludes?: MuscleCategoryId[];
}

/**
 * EDIT THIS to tune workout logic
 */
export const FOCUS_RULES: FocusRule[] = [
  // Explicit override
  {
    focus: "full-body",
    includes: ["full-body"],
  },

  // Push
  {
    focus: "push",
    includes: ["chest", "shoulders"],
    excludes: ["back"],
  },

  // Pull
  {
    focus: "pull",
    includes: ["back", "arms"],
    excludes: ["chest"],
  },

  // Upper body
  {
    focus: "upper-body",
    includes: ["chest", "back", "shoulders"],
  },

  // Legs
  {
    focus: "lower-body",
    includes: ["legs"],
    excludes: ["chest", "back", "shoulders"],
  },

  // Core
  {
    focus: "core",
    includes: ["core"],
    excludes: ["legs", "chest", "back"],
  },

  // Arms-only day
  {
    focus: "arms",
    includes: ["arms"],
    excludes: ["chest", "back", "shoulders", "legs"],
  },
];

/**
 * Resolve workout focus from selected categories
 */
export function getWorkoutFocus(
  categories: MuscleCategory["id"][]
): WorkoutFocus {
  if (!categories.length) return "mixed";

  const set = new Set(categories);

  for (const rule of FOCUS_RULES) {
    const includesAll = rule.includes.every((id) => set.has(id));
    const excludesAny = rule.excludes?.some((id) => set.has(id));

    if (includesAll && !excludesAny) {
      return rule.focus;
    }
  }

  return "mixed";
}
