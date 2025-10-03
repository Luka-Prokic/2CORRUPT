// Types for the modular user store

export interface User {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly profileImage?: string;
  readonly joinDate: Date;
  readonly preferences?: {
    readonly notifications: boolean;
    readonly privacy: 'public' | 'private';
    readonly units: 'metric' | 'imperial';
  };
}

export type UserStore = AuthSlice & ProfileSlice & GeneralSlice;

// Authentication slice contract
export interface AuthSlice {
  isLoggedIn: boolean;
  isLoading: boolean;
  setUser: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

// Profile management slice contract
export interface ProfileSlice {
  user: User | null;
  updateUsername: (username: string) => void;
  updateEmail: (email: string) => void;
  updateProfileImage: (imageUrl: string) => void;
  updatePreferences: (preferences: Partial<User['preferences']>) => void;
}

// General user utilities slice contract
export interface GeneralSlice {
  resetUser: () => void;
}

export const defaultUser: User = {
  id: '1',
  username: 'Pencil Neck',
  email: 'user@example.com',
  joinDate: new Date('2025-01-01'),
  preferences: {
    notifications: true,
    privacy: 'public',
    units: 'metric',
  },
};
