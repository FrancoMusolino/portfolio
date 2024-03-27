import React from "react";

import { getIntroByLocale } from "@/lib/strapi";
import { Locale } from "@/lib/strapi/types";
import { Dictionary } from "@/app/[lang]/dictionaries";

import { IntroRender } from "./intro-render";

type IntroProps = {
  locale: Locale;
  introDict: Dictionary["intro"];
};

export async function Intro({ locale, introDict }: IntroProps) {
  const intro = await getIntroByLocale(locale);
  if (!intro) return null;

  return <IntroRender introMDX={intro} {...introDict} />;
}
