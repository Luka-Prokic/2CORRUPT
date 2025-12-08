import { WorkoutStore, CategorySlice } from "../types";
import { StateCreator } from "zustand";

export const createCategorySlice: StateCreator<
  WorkoutStore,
  [],
  [],
  CategorySlice
> = (set, get) => ({
  muscles: [
    { id: "upper-chest", name: "Upper Chest" },
    { id: "mid-chest", name: "Mid Chest" },
    { id: "lower-chest", name: "Lower Chest" },
    { id: "front-delts", name: "Front Delts" },
    { id: "side-delts", name: "Side Delts" },
    { id: "rear-delts", name: "Rear Delts" },
    { id: "lats", name: "Lats" },
    { id: "lower-back", name: "Lower Back" },
    { id: "mid-traps", name: "Mid Traps" },
    { id: "upper-traps", name: "Upper Traps" },
    { id: "biceps", name: "Biceps" },
    { id: "brachialis", name: "Brachialis" },
    { id: "triceps", name: "Triceps" },
    { id: "forearms", name: "Forearms" },
    { id: "quads", name: "Quads" },
    { id: "hamstrings", name: "Hamstrings" },
    { id: "glutes", name: "Glutes" },
    { id: "calves", name: "Calves" },
    { id: "adductors", name: "Adductors" },
    { id: "abs", name: "Abs" },
    { id: "obliques", name: "Obliques" },
    { id: "hip-flexors", name: "Hip Flexors" },
    { id: "forearms", name: "Forearms" },
    { id: "grip", name: "Grip" },
  ],

  muscleCategories: [
    {
      id: "chest",
      name: "Chest",
      muscles: [
        { id: "upper-chest", name: "Upper Chest" },
        { id: "mid-chest", name: "Mid Chest" },
        { id: "lower-chest", name: "Lower Chest" },
      ],
    },
    {
      id: "shoulders",
      name: "Shoulders",
      muscles: [
        { id: "front-delts", name: "Front Delts" },
        { id: "side-delts", name: "Side Delts" },
        { id: "rear-delts", name: "Rear Delts" },
      ],
    },
    {
      id: "back",
      name: "Back",
      muscles: [
        { id: "lats", name: "Lats" },
        { id: "lower-back", name: "Lower Back" },
        { id: "mid-traps", name: "Mid Traps" },
        { id: "upper-traps", name: "Upper Traps" },
        { id: "rear-delts", name: "Rear Delts" },
      ],
    },
    {
      id: "arms",
      name: "Arms",
      muscles: [
        { id: "biceps", name: "Biceps" },
        { id: "brachialis", name: "Brachialis" },
        { id: "triceps", name: "Triceps" },
        { id: "forearms", name: "Forearms" },
      ],
    },
    {
      id: "legs",
      name: "Legs",
      muscles: [
        { id: "quads", name: "Quads" },
        { id: "hamstrings", name: "Hamstrings" },
        { id: "glutes", name: "Glutes" },
        { id: "calves", name: "Calves" },
        { id: "adductors", name: "Adductors" },
      ],
    },
    {
      id: "core",
      name: "Core",
      muscles: [
        { id: "abs", name: "Abs" },
        { id: "obliques", name: "Obliques" },
        { id: "hip-flexors", name: "Hip Flexors" },
      ],
    },
    {
      id: "fullBody",
      name: "Full Body",
      muscles: [
        { id: "forearms", name: "Forearms" },
        { id: "grip", name: "Grip" },
        { id: "core", name: "Core" },
        { id: "legs", name: "Legs" },
        { id: "shoulders", name: "Shoulders" },
      ],
    },
  ],

  equipment: [
    { id: "barbell", name: "Barbell" },
    { id: "dumbbells", name: "Dumbbells" },
    { id: "bench", name: "Bench" },
    { id: "rack", name: "Rack" },
    { id: "cable", name: "Cable" },
    { id: "bodyweight", name: "Bodyweight" },
    { id: "dip-bar", name: "Dip Bar" },
    { id: "pull-up-bar", name: "Pull-Up Bar" },
    { id: "machine", name: "Machine" },
    { id: "box", name: "Box" },
    { id: "kettlebell", name: "Kettlebell" },
    { id: "ab-wheel", name: "Ab Wheel" },
    { id: "preacher-bench", name: "Preacher Bench" },
  ],

  getMusclesByCategory: (categoryId: string) => {
    const category = get().muscleCategories.find((c) => c.id === categoryId);
    return category?.muscles ?? [];
  },
});
