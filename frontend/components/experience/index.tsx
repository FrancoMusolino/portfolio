import React from "react";

import { ExperienceRender } from "./experience-render";
import { Locale } from "@/lib/strapi/types";
import { getExperienceByLocale } from "@/lib/strapi";
import { Experience } from "./experience-timeline-element";
import { getDictionary } from "@/app/[lang]/dictionaries";

type ExperienceProps = {
  lang: Locale;
};

export async function Experience({ lang }: ExperienceProps) {
  const [experience, dict] = await Promise.all([
    getExperienceByLocale(lang),
    getDictionary(lang),
  ]);

  const items = experience.data.reduce<Experience[]>((acc, { attributes }) => {
    acc.push(attributes);
    return acc;
  }, []);

  return <ExperienceRender title={dict.experience.title} items={items} />;
}
