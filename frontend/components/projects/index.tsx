import { getProjectsByLocale } from "@/lib/strapi";
import { Locale } from "@/lib/strapi/types";
import { getDictionary } from "@/app/[lang]/dictionaries";

import { ProjectsRender } from "./projects-render";
import { Project } from "./project";

type ProjectsProps = {
  locale: Locale;
};

export async function Projects({ locale }: ProjectsProps) {
  const [projects, dict] = await Promise.all([
    getProjectsByLocale(locale),
    getDictionary(locale),
  ]);

  const projectsProp = projects.data.reduce<Project[]>(
    (acc, { attributes: project }) => {
      acc.push({
        title: project.title,
        description: project.description,
        skills: project.skills.data.map((skill) => skill.attributes.name),
        imageUrl: {
          small: project.image.data.attributes.formats.small.url,
          medium: project.image.data.attributes.formats.medium.url,
          large: project.image.data.attributes.formats.large.url,
        },
      });

      return acc;
    },
    []
  );

  return <ProjectsRender title={dict.projects.title} projects={projectsProp} />;
}
