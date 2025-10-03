// Types for the modular UI store

export type UIStore = WorkoutViewSlice & ModalSlice & WidgetSlice & NavigationSlice & LoadingSlice & GeneralSlice;

// Workout view slice contract
export interface WorkoutViewSlice {
  isWorkoutView: boolean;
  setWorkoutView: (isActive: boolean) => void;
  toggleWorkoutView: () => void;
}

// Modal management slice contract
export interface ModalSlice {
  isModalOpen: boolean;
  modalType: string | null;
  openModal: (type: string) => void;
  closeModal: () => void;
}

// Widget management slice contract
export interface WidgetSlice {
  activeWidgetId: string | null;
  setActiveWidget: (widgetId: string | null) => void;
  isWidgetEditing: boolean;
  setWidgetEditing: (editing: boolean) => void;
}

// Navigation slice contract
export interface NavigationSlice {
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
}

// Loading states slice contract
export interface LoadingSlice {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

// General UI utilities slice contract
export interface GeneralSlice {
  resetUI: () => void;
}
