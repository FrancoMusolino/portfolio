import { getProjectsByLocale } from "@/lib/strapi";
import { Locale } from "@/lib/strapi/types";
import { Dictionary } from "@/app/[lang]/dictionaries";

import { ProjectsRender } from "./projects-render";

type ProjectsProps = {
  locale: Locale;
  projectsDict: Dictionary["projects"];
};

export async function Projects({ locale, projectsDict }: ProjectsProps) {
  const projects = await getProjectsByLocale(locale);

  const items = projects.data.map(({ attributes: project }) => ({
    ...project,
    skills: project.skills.data.map((skill) => skill.attributes.name),
    imageUrl: {
      small: project.image.data.attributes.formats.small.url,
      medium: project.image.data.attributes.formats.medium.url,
      large: project.image.data.attributes.formats.large.url,
    },
  }));

  return <ProjectsRender projects={items} {...projectsDict} />;
}
