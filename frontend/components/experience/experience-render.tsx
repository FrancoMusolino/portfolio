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
import { useOnIntersection } from "@/hooks/useOnIntersection";
import { useActiveSectionContext } from "@/context/active-section-context";

type ExperienceRenderProps = {
  items: Experience[];
  title: string;
};

export function ExperienceRender({ items, title }: ExperienceRenderProps) {
  const handleIntersection = useOnIntersection();
  const { SECTION_OBSERVER_OPTS } = useActiveSectionContext();

  return (
    <Observe
      onElementIntersected={handleIntersection}
      opts={SECTION_OBSERVER_OPTS}
      elementId="experience"
    >
      <section className="mb-28 sm:mb-40">
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
