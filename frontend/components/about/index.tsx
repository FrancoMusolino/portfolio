import { getAboutByLocale } from "@/lib/strapi";
import { Locale } from "@/lib/strapi/types";

import { AboutRender } from "./about-render";

type AboutProps = {
  locale: Locale;
};

export async function About({ locale }: AboutProps) {
  const about = await getAboutByLocale(locale);
  if (!about) return null;

  return <AboutRender aboutMDX={about} />;
}
