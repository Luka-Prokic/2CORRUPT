import i18n, { changeLanguage } from "i18next";
import { initReactI18next } from "react-i18next";

export const LANGUAGES = {
  en: "English",
  rs: "Serbian",
};

export const LANGUAGES_COUNT = Object.keys(LANGUAGES).length;

export const languageArray = Object.entries(LANGUAGES).map(([code, name]) => ({
  code,
  title: name,
  icon: code === "en" ? "flag-outline" : "flag-sharp", // example icons
  onPress: () => changeLanguage(code),
  info: "",
}));

export const DEFAULT_LANGUAGE_CODE = "en";

const resources = {
  en: {
    translation: require("../../assets/locales/en/translation.json"),
  },
  rs: {
    translation: require("../../assets/locales/rs/prevod.json"),
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LANGUAGE_CODE, // default language
  fallbackLng: "en", // fallback if key is missing
  ns: ["translation"], // namespace
  defaultNS: "translation",
  interpolation: {
    escapeValue: false, // React already does XSS protection
  },
});

export { i18n };
