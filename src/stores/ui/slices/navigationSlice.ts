import { StateCreator } from "zustand";
import { UIStore, NavigationSlice } from "../types";

/**
 * Navigation slice: manages current screen state
 */
export const createNavigationSlice: StateCreator<
  UIStore,
  [],
  [],
  NavigationSlice
> = (set, get) => ({
  currentScreen: "Home",

  setCurrentScreen: (screen: string) => set({ currentScreen: screen }),
});
