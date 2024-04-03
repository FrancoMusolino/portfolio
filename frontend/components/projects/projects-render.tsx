"use client";

import React from "react";
import SectionHeading from "../section-heading";
import { Project, ProjectCard } from "./project";
import { useSectionInView } from "@/lib/hooks";

type ProjectsRenderProps = {
  title: string;
  projects: Project[];
};

export function ProjectsRender({ title, projects }: ProjectsRenderProps) {
  const { ref } = useSectionInView("projects", 0.5);

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
      <SectionHeading>{title}</SectionHeading>
      <div>
        {projects.map((project, index) => (
          <React.Fragment key={index}>
            <ProjectCard {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
