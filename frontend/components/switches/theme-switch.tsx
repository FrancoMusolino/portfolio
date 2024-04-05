"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "../icons";

export const ThemeSwitch = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return (
    <button
      className="bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      {!isMounted ? (
        <svg
          className="animate-spin h-5 w-5 border border-gray-950 dark:border-gray-50 border-l-0 rounded-full"
          viewBox="0 0 24 24"
        />
      ) : resolvedTheme === "light" ? (
        <SunIcon />
      ) : (
        <MoonIcon />
      )}
    </button>
  );
};
