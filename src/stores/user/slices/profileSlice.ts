import { StateCreator } from "zustand";
import { UserStore, ProfileSlice } from "../types";

/**
 * Profile slice: manages user profile data and updates
 */
export const createProfileSlice: StateCreator<UserStore, [], [], ProfileSlice> = (set, get) => ({
  user: null, // Will be set by auth slice

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
          preferences: { ...currentUser.preferences, ...preferences } 
        } 
      });
    }
  },
});
