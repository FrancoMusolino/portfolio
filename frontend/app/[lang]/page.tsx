import { Suspense } from "react";

import { SectionDivider } from "@/components/section-divider";

// SECTIONS
import { Intro } from "@/components/intro";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";

import { Locale } from "@/lib/strapi/types";
import { getDictionary } from "./dictionaries";

export default async function Home({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);

  return (
    <main className="flex flex-col items-center px-4">
      <Intro locale={params.lang} introDict={dict.intro} />
      <SectionDivider />
      <About locale={params.lang} aboutDict={dict.about} />
      <Projects locale={params.lang} projectsDict={dict.projects} />
      <Skills skillsDict={dict.skills} />
      <Experience lang={params.lang} experienceDict={dict.experience} />
      <Contact contactDict={dict.contact} />
    </main>
  );
}
