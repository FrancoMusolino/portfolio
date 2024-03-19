import { Locale } from "@/lib/strapi/types";

const dictionaries = {
  es: () =>
    import("@/lib/dictionaries/es.json").then((module) => module.default),
  en: () =>
    import("@/lib/dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
