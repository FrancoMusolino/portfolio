import { getSkills } from "@/lib/strapi";
import { SkillsRender } from "./skills-render";

export async function Skills() {
  const skills = await getSkills();

  return <SkillsRender skills={skills} />;
}
