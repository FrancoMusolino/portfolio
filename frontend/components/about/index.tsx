import { getAboutByLocale } from "@/lib/strapi";
import { Locale } from "@/lib/strapi/types";

import { AboutRender } from "./about-render";
import { Dictionary } from "@/app/[lang]/dictionaries";

type AboutProps = {
  aboutDict: Dictionary["about"];
  locale: Locale;
};

export async function About({ aboutDict, locale }: AboutProps) {
  const about = await getAboutByLocale(locale);
  if (!about) return null;

  return <AboutRender {...aboutDict} aboutMDX={about} />;
}
