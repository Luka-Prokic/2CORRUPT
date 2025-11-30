import { create } from "zustand";
import { UserStore } from "./types";
import { createAuthSlice } from "./slices/authSlice";
import { createProfileSlice } from "./slices/profileSlice";
import { createGeneralSlice } from "./slices/generalSlice";

export const useUserStore = create<UserStore>()(
  (...a) =>
    ({
      // Set default user in auth slice
      ...createAuthSlice(...a),
      ...createProfileSlice(...a),
      ...createGeneralSlice(...a),
    } as UserStore)
);
