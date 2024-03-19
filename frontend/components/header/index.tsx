import React from "react";

import { HeaderRender } from "./header-render";
import { Locale } from "@/lib/strapi/types";
import { getDictionary } from "@/app/[lang]/dictionaries";

type HeaderProps = {
  lang: Locale;
};

export async function Header({ lang }: HeaderProps) {
  const dict = await getDictionary(lang);

  return <HeaderRender links={dict.header as any} />;
}
