import { StateCreator } from "zustand";
import { UIStore, HomeViewSlice, HomeViewType } from "../types";

/**
 * Home view slice: manages home screen home view state
 */
export const createHomeViewSlice: StateCreator<
  UIStore,
  [],
  [],
  HomeViewSlice
> = (set, get) => ({
  typeOfView: "home",

  setTypeOfView: (type: HomeViewType) => set({ typeOfView: type }),
});
