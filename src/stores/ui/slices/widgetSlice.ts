import { StateCreator } from "zustand";
import { UIStore, WidgetSlice } from "../types";

/**
 * Widget slice: manages widget states and editing
 */
export const createWidgetSlice: StateCreator<UIStore, [], [], WidgetSlice> = (set, get) => ({
  activeWidgetId: null,
  isWidgetEditing: false,

  setActiveWidget: (widgetId: string | null) => set({ activeWidgetId: widgetId }),

  setWidgetEditing: (editing: boolean) => set({ isWidgetEditing: editing }),
});
