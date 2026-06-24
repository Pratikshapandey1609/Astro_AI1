import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

import en from "./locales/en.json";
import hi from "./locales/hi.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import sa from "./locales/sa.json";

i18n
  .use(LanguageDetector) // Detect language from browser
  .use(initReactI18next)
  .use(Backend)
  .init({
    debug : true,
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      es: { translation: es },
      fr: { translation: fr },
      sa: { translation: sa }
    },
    fallbackLng: "en", // Default language
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });

export default i18n;
