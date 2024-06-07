"use client";

import React, { PropsWithChildren, useEffect, useMemo, useRef } from "react";

type ObserverProps = PropsWithChildren & {
  onElementIntersected: (elementId: string) => void;
  onElementLeaveIntersection?: () => void;
  opts?: IntersectionObserverInit;
  elementId?: string;
};

export const Observerable = ({
  children,
  opts,
  elementId,
  onElementIntersected,
  onElementLeaveIntersection,
}: ObserverProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  function callback(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry, index) => {
      const elementID = entry.target.getAttribute("id") ?? `element-${index}`;

      if (entry.isIntersecting) onElementIntersected(elementID);
      else if (onElementLeaveIntersection) onElementLeaveIntersection();
    });
  }

  const observer = useMemo(() => {
    if ("Window" in globalThis) {
      return new IntersectionObserver(callback, opts);
    }
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (element && observer) observer.observe(element);

    return () => observer?.disconnect();
  }, [elementRef, observer]);

  return (
    <div ref={elementRef} id={elementId}>
      {children}
    </div>
  );
};
