import { create } from "zustand";
import { UIStore } from "./types";
import { createModalSlice } from "./slices/modalSlice";
import { createWidgetSlice } from "./slices/widgetSlice";
import { createNavigationSlice } from "./slices/navigationSlice";
import { createLoadingSlice } from "./slices/loadingSlice";
import { createGeneralSlice } from "./slices/generalSlice";
import { createHomeViewSlice } from "./slices/homeViewSlice";

export const useUIStore = create<UIStore>(
  (...a) =>
    ({
      ...createHomeViewSlice(...a),
      ...createModalSlice(...a),
      ...createWidgetSlice(...a),
      ...createNavigationSlice(...a),
      ...createLoadingSlice(...a),
      ...createGeneralSlice(...a),
    } as UIStore)
);
