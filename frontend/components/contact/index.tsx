import React from "react";

import { ContactRender } from "./contact-render";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Locale } from "@/lib/strapi/types";

type ContactProps = {
  locale: Locale;
};

export async function Contact({ locale }: ContactProps) {
  const dict = await getDictionary(locale);

  return (
    <ContactRender
      title={dict.contact.title}
      description={dict.contact.description}
      buttonText={dict.contact.button}
      successText={dict.contact.successText}
    />
  );
}
