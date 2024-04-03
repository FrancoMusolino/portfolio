import React from "react";

import { HeaderRender } from "./header-render";
import { Dictionary } from "@/app/[lang]/dictionaries";

type HeaderProps = {
  headerDict: Dictionary["header"];
};

export async function Header({ headerDict }: HeaderProps) {
  return <HeaderRender links={headerDict as any} />;
}
