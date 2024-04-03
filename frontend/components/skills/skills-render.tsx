"use client";

import React from "react";
import { motion } from "framer-motion";

import SectionHeading from "../section-heading";
import { useSectionInView } from "@/lib/hooks";
import { getSkills } from "@/lib/strapi";

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
  skills: Awaited<ReturnType<typeof getSkills>>;
};

export function SkillsRender({ skills }: SkillsRenderProps) {
  const { ref } = useSectionInView("skills");

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>My skills</SectionHeading>
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
  );
}
