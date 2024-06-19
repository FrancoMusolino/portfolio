"use client";

import React, {
  useState,
  createContext,
  useContext,
  useMemo,
  useEffect,
} from "react";
import { calcObserverThreshold } from "@/lib/utils";

type ActiveSectionContextProviderProps = {
  children: React.ReactNode;
};

type ActiveSectionContextType = {
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  timeOfLastClick: number;
  setTimeOfLastClick: React.Dispatch<React.SetStateAction<number>>;
  SECTION_OBSERVER_OPTS: IntersectionObserverInit;
};

export const ActiveSectionContext =
  createContext<ActiveSectionContextType | null>(null);

export default function ActiveSectionContextProvider({
  children,
}: ActiveSectionContextProviderProps) {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [timeOfLastClick, setTimeOfLastClick] = useState(0); // we need to keep track of this to disable the observer temporarily when user clicks on a link
  const [innerHeight, setInnerHeight] = useState(
    "Window" in globalThis ? window.innerHeight : 0
  );

  const SECTION_OBSERVER_OPTS: IntersectionObserverInit = useMemo(
    () => ({
      threshold: calcObserverThreshold(innerHeight),
    }),
    [innerHeight, calcObserverThreshold]
  );

  useEffect(() => {
    function updateInnerHeight() {
      setInnerHeight(window.innerHeight);
    }

    window.addEventListener("resize", updateInnerHeight);

    return () => window.removeEventListener("resize", updateInnerHeight);
  }, []);

  return (
    <ActiveSectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
        timeOfLastClick,
        setTimeOfLastClick,
        SECTION_OBSERVER_OPTS,
      }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSectionContext() {
  const context = useContext(ActiveSectionContext);

  if (context === null) {
    throw new Error(
      "useActiveSectionContext must be used within an ActiveSectionContextProvider"
    );
  }

  return context;
}
