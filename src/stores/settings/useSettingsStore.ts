import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SettingsStore } from './types';
import { createThemeSlice } from './slices/themeSlice';
import { createLanguageSlice } from './slices/languageSlice';
import { createGeneralSlice } from './slices/generalSlice';

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (...a) => ({
      ...createThemeSlice(...a),
      ...createLanguageSlice(...a),
      ...createGeneralSlice(...a),
    }) as SettingsStore,
    {
      name: 'settings-storage',
    }
  )
);
