"use client";

import React from "react";
import { motion } from "framer-motion";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import SectionHeading from "../section-heading";
import { useSectionInView } from "@/lib/hooks";

type AboutRenderProps = {
  aboutMDX: string;
};

export function AboutRender({ aboutMDX }: AboutRenderProps) {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {aboutMDX}
      </Markdown>
    </motion.section>
  );
}
