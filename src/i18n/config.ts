import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { LanguageEnum } from '../shared/enumeration/language';
import translationEn from './en.json';
import translationVi from './vi.json';

export const resources = {
  en: {
    translation: translationEn,
  },
  vi: {
    translation: translationVi,
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: LanguageEnum.vi,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });
export default i18n;
