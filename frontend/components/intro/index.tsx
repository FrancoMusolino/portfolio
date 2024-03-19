import React from "react";

import { getIntroByLocale } from "@/lib/strapi";
import { Locale } from "@/lib/strapi/types";
import { IntroRender } from "./intro-render";
import { getDictionary } from "@/app/[lang]/dictionaries";

type IntroProps = {
  locale: Locale;
};

export async function Intro({ locale }: IntroProps) {
  const [intro, dict] = await Promise.all([
    getIntroByLocale(locale),
    getDictionary(locale),
  ]);
  if (!intro) return null;

  return (
    <IntroRender
      introMDX={intro}
      contactText={dict.intro.contact}
      cvText={dict.intro.cv}
    />
  );
}
