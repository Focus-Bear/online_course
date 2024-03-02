import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from 'assets/locales/en.json';
import es from 'assets/locales/es.json';
import { Language } from 'constants/enum';

i18n.use(initReactI18next).init({
  lng: Language.EN,
  resources: { en, es },
  fallbackLng: Language.EN,
  detection: {
    order: ['cookie', 'htmlTag', 'path', 'subdomain'],
    caches: ['cookie'],
  },
});

export default i18n;
