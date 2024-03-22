"use client";
import React from "react";
import { useTheme } from "@/context/theme-context";
import { useInView } from "react-intersection-observer";
import { VerticalTimelineElement } from "react-vertical-timeline-component";

import { experiencesData } from "@/lib/data";

export const TimelineElement = ({
  item,
}: {
  item: (typeof experiencesData)[number];
}) => {
  const { theme } = useTheme();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.8 });

  return (
    <VerticalTimelineElement
      visible={inView}
      contentStyle={{
        background: theme === "light" ? "#f3f4f6" : "rgba(255, 255, 255, 0.05)",
        boxShadow: "none",
        border: "1px solid rgba(0, 0, 0, 0.05)",
        textAlign: "left",
        padding: "1.3rem 2rem",
      }}
      contentArrowStyle={{
        borderRight:
          theme === "light"
            ? "0.4rem solid #9ca3af"
            : "0.4rem solid rgba(255, 255, 255, 0.5)",
      }}
      date={item.date}
      icon={item.icon}
      iconStyle={{
        background: theme === "light" ? "white" : "rgba(255, 255, 255, 0.15)",
        fontSize: "1.5rem",
      }}
    >
      <div ref={ref}>
        <h3 className="font-semibold capitalize">{item.title}</h3>
        <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75">
          {item.description}
        </p>
      </div>
    </VerticalTimelineElement>
  );
};
