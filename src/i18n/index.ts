import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import { ptBR } from "./pt-BR";
import { enUS } from "./en-US";

const translations = {
  "pt-BR": ptBR,
  "pt": ptBR,
  "en-US": enUS,
  "en": enUS,
};

export const i18n = new I18n(translations);

const deviceLocale = Localization.getLocales()[0];
const locale = deviceLocale?.languageTag || "pt-BR";

i18n.locale = locale;
i18n.enableFallback = true;
i18n.defaultLocale = "pt-BR";

export function t(key: string, params?: Record<string, string | number>) {
  return i18n.t(key, params);
}

export function getCurrentLocale(): string {
  return i18n.locale;
}

export function setLocale(locale: string) {
  i18n.locale = locale;
}
