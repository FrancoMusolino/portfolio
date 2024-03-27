import React from "react";

import { ContactRender } from "./contact-render";
import { Dictionary } from "@/app/[lang]/dictionaries";

type ContactProps = {
  contactDict: Dictionary["contact"];
};

export async function Contact({ contactDict }: ContactProps) {
  return <ContactRender {...contactDict} />;
}
