"use client";

import React from "react";
import { motion } from "framer-motion";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import SectionHeading from "../section-heading";
import { Observerable } from "../oberverable";
import { useActiveSectionContext } from "@/context/active-section-context";

type AboutRenderProps = {
  title: string;
  aboutMDX: string;
};

export function AboutRender({ title, aboutMDX }: AboutRenderProps) {
  const { setActiveSection } = useActiveSectionContext();

  return (
    <Observerable
      onElementIntersected={(elementId) => setActiveSection(elementId)}
      onElementLeaveIntersection={() => console.log("Hola")}
      opts={{ threshold: 0.2 }}
      elementId="about"
    >
      <motion.section
        className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.175 }}
        id="about"
      >
        <SectionHeading>{title}</SectionHeading>
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {aboutMDX}
        </Markdown>
      </motion.section>
    </Observerable>
  );
}
