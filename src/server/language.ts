import * as text from "@/server/language.json";

const languageObj = {
  ru: true,
} as const;

export type Language = keyof typeof languageObj;
export type LanguageText = (typeof text)[Language];

export const isLanguage = (language: unknown): language is Language =>
  Object.hasOwn(languageObj, language as string);
export const getLanguageText = (language: Language): LanguageText => {
  return text[language];
};
