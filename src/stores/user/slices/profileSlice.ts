import { StateCreator } from "zustand";
import { UserStore, ProfileSlice, User } from "../types";

import { nanoid } from "nanoid/non-secure";
import { username } from "../../../config/constants/defaults";

export const guestUser: User = {
  id: `user-${nanoid()}`,
  username,
  email: null,
  joinDate: new Date(),
  profileImage: null,
  preferences: {
    notifications: false,
    privacy: "public",
  },
};

/**
 * Profile slice: manages user profile data and updates
 */
export const createProfileSlice: StateCreator<
  UserStore,
  [],
  [],
  ProfileSlice
> = (set, get) => ({
  user: guestUser, // Will be set by auth slice

  updateUsername: (username: string) => {
    const currentUser = get().user;
    if (currentUser) {
      set({ user: { ...currentUser, username } });
    }
  },

  updateEmail: (email: string) => {
    const currentUser = get().user;
    if (currentUser) {
      set({ user: { ...currentUser, email } });
    }
  },

  updateProfileImage: (profileImage: string) => {
    const currentUser = get().user;
    if (currentUser) {
      set({ user: { ...currentUser, profileImage } });
    }
  },

  updatePreferences: (preferences: any) => {
    const currentUser = get().user;
    if (currentUser) {
      set({
        user: {
          ...currentUser,
          preferences: { ...currentUser.preferences, ...preferences },
        },
      });
    }
  },
});
