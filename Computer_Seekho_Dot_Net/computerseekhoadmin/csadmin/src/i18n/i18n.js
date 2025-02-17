import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi) // Load translations from external files
  .use(LanguageDetector) // Detect browser language
  .use(initReactI18next) // Initialize i18n
  .init({
    fallbackLng: 'en', // Default language
    debug: true, // Set false in production
    interpolation: { escapeValue: false },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Path to translation files
    },
  });

export default i18n;
