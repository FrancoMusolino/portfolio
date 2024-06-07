"use client";

import React from "react";
import { motion } from "framer-motion";

import SectionHeading from "../section-heading";
import { getSkills } from "@/lib/strapi";
import { Observe } from "../observe";
import { useActiveSectionContext } from "@/context/active-section-context";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

type SkillsRenderProps = {
  title: string;
  skills: Awaited<ReturnType<typeof getSkills>>;
};

export function SkillsRender({ title, skills }: SkillsRenderProps) {
  const { setActiveSection } = useActiveSectionContext();

  return (
    <Observe
      onElementIntersected={(elementId) => setActiveSection(elementId)}
      opts={{ threshold: 0.5 }}
      elementId="skills"
    >
      <section className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40">
        <SectionHeading>{title}</SectionHeading>
        <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
          {skills.map(({ attributes }, index) => (
            <motion.li
              className="bg-white borderBlack rounded-xl px-5 py-3 dark:bg-white/10 dark:text-white/80"
              key={index}
              variants={fadeInAnimationVariants}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              custom={index}
            >
              {attributes.name}
            </motion.li>
          ))}
        </ul>
      </section>
    </Observe>
  );
}
