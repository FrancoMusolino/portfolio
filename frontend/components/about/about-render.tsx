"use client";

import React from "react";
import { motion } from "framer-motion";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import SectionHeading from "../section-heading";
import { Observe } from "../observe";
import { useOnIntersection } from "@/hooks/useOnIntersection";
import { useActiveSectionContext } from "@/context/active-section-context";

type AboutRenderProps = {
  title: string;
  aboutMDX: string;
};

export function AboutRender({ title, aboutMDX }: AboutRenderProps) {
  const handleIntersection = useOnIntersection();
  const { SECTION_OBSERVER_OPTS } = useActiveSectionContext();

  return (
    <Observe
      onElementIntersected={handleIntersection}
      opts={SECTION_OBSERVER_OPTS}
      elementId="about"
    >
      <motion.section
        className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.175 }}
      >
        <SectionHeading>{title}</SectionHeading>
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {aboutMDX}
        </Markdown>
      </motion.section>
    </Observe>
  );
}
