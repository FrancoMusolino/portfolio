"use client";

import React from "react";
import SectionHeading from "../section-heading";
import { Project, ProjectCard } from "./project";
import { Observe } from "../observe";
import { useOnIntersection } from "@/hooks/useOnIntersection";
import { useActiveSectionContext } from "@/context/active-section-context";

type ProjectsRenderProps = {
  title: string;
  projects: Project[];
};

export function ProjectsRender({ title, projects }: ProjectsRenderProps) {
  const handleIntersection = useOnIntersection();
  const { SECTION_OBSERVER_OPTS } = useActiveSectionContext();

  return (
    <Observe
      onElementIntersected={handleIntersection}
      opts={SECTION_OBSERVER_OPTS}
      elementId="projects"
    >
      <section className="mb-28">
        <SectionHeading>{title}</SectionHeading>
        <div>
          {projects.map((project, index) => (
            <React.Fragment key={index}>
              <ProjectCard {...project} />
            </React.Fragment>
          ))}
        </div>
      </section>
    </Observe>
  );
}
