import React from "react";

import ExperienceRender from "./experience-render";
import { Locale } from "@/lib/strapi/types";

type ExperienceProps = {
  lang: Locale;
};

export function Experience({ lang }: ExperienceProps) {
  return <ExperienceRender />;
}
