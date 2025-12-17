import { create } from "zustand";
import { CreatineStore } from "./types";
import { createGeneralSlice } from "./slices/generalSlice";

export const useCreatineStore = create<CreatineStore>()(
  (...a) =>
    ({
      ...createGeneralSlice(...a),
    } as CreatineStore)
);
