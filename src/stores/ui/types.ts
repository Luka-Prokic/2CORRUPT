// Types for the modular UI store

export type UIStore = HomeViewSlice &
  ModalSlice &
  WidgetSlice &
  NavigationSlice &
  LoadingSlice &
  GeneralSlice;

// Home view slice contract
export interface HomeViewSlice {
  typeOfView: HomeViewType;
  setTypeOfView: (type: HomeViewType) => void;
}

// Types of home modes
export type HomeViewType = "home" | "workout" | "template";

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
  navigationHandler: (() => void) | null;
  setNavigationHandler: (handler: (() => void) | null) => void;
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
