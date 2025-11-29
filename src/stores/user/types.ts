// Types for the modular user store
export interface User {
  readonly id: string;
  readonly username: string;
  readonly email: string | null;
  readonly profileImage?: string | null;
  readonly joinDate: Date;
  readonly preferences?: {
    readonly notifications: boolean;
    readonly privacy: "public" | "private";
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
  updatePreferences: (preferences: Partial<User["preferences"]>) => void;
}

// General user utilities slice contract
export interface GeneralSlice {
  resetUser: () => void;
}
