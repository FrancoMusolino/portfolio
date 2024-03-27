import React from "react";

import { Locale } from "@/lib/strapi/types";
import { getExperienceByLocale } from "@/lib/strapi";
import { Dictionary } from "@/app/[lang]/dictionaries";

import { ExperienceRender } from "./experience-render";

type ExperienceProps = {
  lang: Locale;
  experienceDict: Dictionary["experience"];
};

export async function Experience({ lang, experienceDict }: ExperienceProps) {
  const experience = await getExperienceByLocale(lang);

  const items = experience.data.map((experience) => experience.attributes);

  return <ExperienceRender items={items} {...experienceDict} />;
}
