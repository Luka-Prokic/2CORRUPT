import { create } from 'zustand';
import { SettingsStore } from './types';
import { createThemeSlice } from './slices/themeSlice';
import { createLanguageSlice } from './slices/languageSlice';
import { createGeneralSlice } from './slices/generalSlice';

export const useSettingsStore = create<SettingsStore>()((...a) => ({
  ...createThemeSlice(...a),
  ...createLanguageSlice(...a),
  ...createGeneralSlice(...a),
}) as SettingsStore);
