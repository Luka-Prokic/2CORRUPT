import { StateCreator } from "zustand";
import { UserStore, AuthSlice } from "../types";

/**
 * Authentication slice: manages login state and user authentication
 */
export const createAuthSlice: StateCreator<UserStore, [], [], AuthSlice> = (set, get) => ({
  isLoggedIn: true, // For demo purposes, start as logged in
  isLoading: false,

  setUser: (user: any) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
});
