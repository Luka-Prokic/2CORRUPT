import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserStore, defaultUser } from './types';
import { createAuthSlice } from './slices/authSlice';
import { createProfileSlice } from './slices/profileSlice';
import { createGeneralSlice } from './slices/generalSlice';

export const useUserStore = create<UserStore>()(
  persist(
    (...a) => ({
      // Set default user in auth slice
      ...createAuthSlice(...a),
      ...createProfileSlice(...a),
      ...createGeneralSlice(...a),
      // Override with default user
      user: defaultUser,
    }) as UserStore,
    {
      name: 'user-storage',
      // Only persist user data, not loading states
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
