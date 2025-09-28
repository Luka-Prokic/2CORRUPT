import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'en' | 'rs';

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: 'en',
      setLanguage: (language) => set({ language }),
      toggleLanguage: () => {
        const currentLanguage = get().language;
        const newLanguage = currentLanguage === 'en' ? 'rs' : 'en';
        set({ language: newLanguage });
      },
    }),
    {
      name: 'language-storage',
    }
  )
);
