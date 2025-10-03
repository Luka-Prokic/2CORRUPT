import { StateCreator } from "zustand";
import { UIStore, NavigationSlice } from "../types";

/**
 * Navigation slice: manages current screen state and navigation logic
 */
export const createNavigationSlice: StateCreator<
  UIStore,
  [],
  [],
  NavigationSlice
> = (set, get) => ({
  currentScreen: "Home",
  navigationHandler: null,

  setCurrentScreen: (screen: string) => set({ currentScreen: screen }),

  setNavigationHandler: (handler: (() => void) | null) =>
    set({ navigationHandler: handler }),
});
