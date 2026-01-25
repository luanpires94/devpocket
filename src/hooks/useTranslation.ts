import { t as i18nT, getCurrentLocale, setLocale } from "../i18n";

export function useTranslation() {
  return {
    t: i18nT,
    locale: getCurrentLocale(),
    setLanguage: setLocale,
  };
}
