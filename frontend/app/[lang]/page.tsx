import { Suspense } from "react";

import Contact from "@/components/contact";
import SectionDivider from "@/components/section-divider";
import { Intro } from "@/components/intro";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Experience } from "@/components/experience";

import { Locale } from "@/lib/strapi/types";

export default async function Home({ params }: { params: { lang: Locale } }) {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro locale={params.lang} />
      <SectionDivider />
      <About locale={params.lang} />
      <Projects locale={params.lang} />
      <Suspense fallback={<></>}>
        <Skills />
      </Suspense>
      <Suspense fallback={<></>}>
        <Experience lang={params.lang} />
      </Suspense>
      <Contact />
    </main>
  );
}
