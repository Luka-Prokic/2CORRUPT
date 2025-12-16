import { create } from "zustand";
import { WaterStore } from "./types";
import { createGeneralSlice } from "./slices/generalSlice";

export const useWaterStore = create<WaterStore>()(
  (...a) =>
    ({
      ...createGeneralSlice(...a),
    } as WaterStore)
);
