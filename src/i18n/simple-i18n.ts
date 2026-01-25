import * as Localization from "expo-localization";
import { ptBR } from "./pt-BR";
import { enUS } from "./en-US";

type Translations = typeof ptBR;

const translations: Record<string, Translations> = {
  "pt-BR": ptBR,
  "pt": ptBR,
  "en-US": enUS,
  "en": enUS,
};

const deviceLocale = Localization.getLocales()[0];
const defaultLocale = deviceLocale?.languageTag || "pt-BR";

let currentLocale = defaultLocale;

function getNestedValue(obj: any, path: string): string {
  const keys = path.split(".");
  let value = obj;
  
  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key];
    } else {
      return path; // Retorna a chave se não encontrar
    }
  }
  
  return typeof value === "string" ? value : path;
}

function replaceParams(text: string, params?: Record<string, string | number>): string {
  if (!params) return text;
  
  let result = text;
  for (const [key, value] of Object.entries(params)) {
    result = result.replace(new RegExp(`{{${key}}}`, "g"), String(value));
  }
  return result;
}

export function t(key: string, params?: Record<string, string | number>): string {
  const localeTranslations = translations[currentLocale] || translations[defaultLocale] || translations["pt-BR"];
  const text = getNestedValue(localeTranslations, key);
  return replaceParams(text, params);
}

export function getCurrentLocale(): string {
  return currentLocale;
}

export function setLocale(locale: string) {
  if (translations[locale]) {
    currentLocale = locale;
  }
}

export const i18n = {
  locale: currentLocale,
  t,
  getCurrentLocale,
  setLocale,
};
