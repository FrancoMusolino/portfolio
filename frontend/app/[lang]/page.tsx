import { Suspense } from "react";

import Contact from "@/components/contact";
import Experience from "@/components/experience";
import { Intro } from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import { Skills } from "@/components/skills";
import { About } from "@/components/about";
import { Locale } from "@/lib/strapi/types";

export default async function Home({ params }: { params: { lang: Locale } }) {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro locale={params.lang} />
      <SectionDivider />
      <About locale={params.lang} />
      <Projects />
      <Suspense fallback={<></>}>
        <Skills />
      </Suspense>
      <Experience />
      <Contact />
    </main>
  );
}
