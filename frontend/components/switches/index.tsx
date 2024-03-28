import React from "react";

// SWITCHES
import { ThemeSwitch } from "./theme-switch";
import { LangSwitch } from "./lang-switch";

export const Switches = () => {
  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-4">
      <LangSwitch />
      <ThemeSwitch />
    </div>
  );
};
