"use client";

import React from "react";
import SectionHeading from "../section-heading";
import { Project, ProjectCard } from "./project";
import { Observe } from "../observe";
import { useOnIntersection } from "@/hooks/useOnIntersection";

type ProjectsRenderProps = {
  title: string;
  projects: Project[];
};

export function ProjectsRender({ title, projects }: ProjectsRenderProps) {
  const handleIntersection = useOnIntersection();

  return (
    <Observe
      onElementIntersected={(elementId) => handleIntersection(elementId)}
      opts={{ threshold: 0.5 }}
      elementId="projects"
    >
      <section className="scroll-mt-28 mb-28">
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
