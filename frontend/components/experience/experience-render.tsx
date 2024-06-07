"use client";

import React from "react";
import SectionHeading from "../section-heading";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import {
  Experience,
  ExperienceTimelineElement,
} from "./experience-timeline-element";
import { Observe } from "../observe";
import { useActiveSectionContext } from "@/context/active-section-context";

type ExperienceRenderProps = {
  items: Experience[];
  title: string;
};

export function ExperienceRender({ items, title }: ExperienceRenderProps) {
  const { setActiveSection } = useActiveSectionContext();

  return (
    <Observe
      onElementIntersected={(elementId) => setActiveSection(elementId)}
      opts={{ threshold: 0.5 }}
      elementId="experience"
    >
      <section className="scroll-mt-28 mb-28 sm:mb-40">
        <SectionHeading>{title}</SectionHeading>
        <VerticalTimeline lineColor="" animate>
          {items.map((item, index) => (
            <ExperienceTimelineElement key={index} item={item} />
          ))}
        </VerticalTimeline>
      </section>
    </Observe>
  );
}
