"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { VerticalTimelineElement } from "react-vertical-timeline-component";

import { useTheme } from "@/context/theme-context";
import { useParams } from "next/navigation";

export type Experience = {
  title: string;
  description: string;
  icon: string;
  startedOn: Date;
  finishedAt: Date | null;
};

const utcDate = (dateWithTimezone: Date): Date => {
  const date = new Date(dateWithTimezone);
  const userTimezoneOffset = date.getTimezoneOffset() * 60_000;

  return new Date(date.getTime() + userTimezoneOffset);
};

export const ExperienceTimelineElement = ({ item }: { item: Experience }) => {
  const { theme } = useTheme();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.8 });

  const { lang: locale } = useParams();

  const start = new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
  }).format(utcDate(item.startedOn));

  const finish = item.finishedAt
    ? new Intl.DateTimeFormat(locale, {
        month: "short",
        year: "numeric",
      }).format(utcDate(item.finishedAt))
    : locale === "es"
    ? "presente"
    : "present";

  const printDescription = (description: string) => {
    const splitByLineBreak = description.split("\n");

    return splitByLineBreak.map((text, i) => (
      <p
        key={i}
        className="!mt-1 !font-normal text-gray-700 dark:text-white/75"
      >
        {text}
      </p>
    ));
  };

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
      date={`${start} - ${finish}`}
      icon={React.createElement("span", {}, item.icon)}
      iconStyle={{
        background: theme === "light" ? "white" : "rgba(255, 255, 255, 0.15)",
        fontSize: "1.5rem",
        alignContent: "center",
        textAlign: "center",
      }}
    >
      <div ref={ref}>
        <h3 className="font-semibold capitalize">{item.title}</h3>
        {printDescription(item.description)}
      </div>
    </VerticalTimelineElement>
  );
};
