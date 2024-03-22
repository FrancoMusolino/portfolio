"use client";

import React from "react";
import SectionHeading from "../section-heading";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { useSectionInView } from "@/lib/hooks";
import {
  Experience,
  ExperienceTimelineElement,
} from "./experience-timeline-element";

type ExperienceRenderProps = {
  items: Experience[];
  title: string;
};

export function ExperienceRender({ items, title }: ExperienceRenderProps) {
  const { ref } = useSectionInView("experience");

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>{title}</SectionHeading>
      <VerticalTimeline lineColor="" animate>
        {items.map((item, index) => (
          <ExperienceTimelineElement key={index} item={item} />
        ))}
      </VerticalTimeline>
    </section>
  );
}
