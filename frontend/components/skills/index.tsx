import { getSkills } from "@/lib/strapi";
import { SkillsRender } from "./skills-render";
import { Dictionary } from "@/app/[lang]/dictionaries";

type SkillsProps = {
  skillsDict: Dictionary["skills"];
};

export async function Skills({ skillsDict }: SkillsProps) {
  const skills = await getSkills();

  return <SkillsRender skills={skills} {...skillsDict} />;
}
