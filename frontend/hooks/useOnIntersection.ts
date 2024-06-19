import { useRef, useEffect } from "react";
import { useActiveSectionContext } from "@/context/active-section-context";

export const useOnIntersection = () => {
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();
  const timeOfLastClickRef = useRef(timeOfLastClick);

  useEffect(() => {
    timeOfLastClickRef.current = timeOfLastClick;
  }, [timeOfLastClick]);

  return (elementId: string): void => {
    if (Date.now() - timeOfLastClickRef.current > 1000) {
      setActiveSection(elementId);
    }
  };
};
