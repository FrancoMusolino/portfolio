"use client";

import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import { ArrowRight, DownloadIcon, GithubIcon, LinkedinIcon } from "../icons";
import profilePic from "../../public/intro.jpg";
import { Observe } from "../observe";
import { useOnIntersection } from "@/hooks/useOnIntersection";
import { useActiveSectionContext } from "@/context/active-section-context";

type IntroRenderProps = {
  introMDX: string;
  contactText: string;
  cvText: string;
};

export function IntroRender({
  introMDX,
  contactText,
  cvText,
}: IntroRenderProps) {
  const { lang } = useParams();

  const { setActiveSection, setTimeOfLastClick, SECTION_OBSERVER_OPTS } =
    useActiveSectionContext();
  const handleIntersection = useOnIntersection();

  return (
    <Observe
      onElementIntersected={handleIntersection}
      opts={SECTION_OBSERVER_OPTS}
      elementId="home"
    >
      <section className="mb-28 max-w-[50rem] text-center sm:mb-0">
        <div className="flex items-center justify-center">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "tween",
                duration: 0.2,
              }}
            >
              <Image
                src={profilePic}
                alt="Franco Emanuel Musolino"
                width="192"
                height="192"
                quality="95"
                priority={true}
                className="h-24 w-24 rounded-full object-cover border-[0.35rem] border-white shadow-xl"
              />
            </motion.div>
            <motion.span
              className="absolute bottom-0 right-0 text-4xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 125,
                delay: 0.1,
                duration: 0.7,
              }}
            >
              👋
            </motion.span>
          </div>
        </div>

        <motion.h1
          className="mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-3xl"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {introMDX}
          </Markdown>
        </motion.h1>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
          }}
        >
          <Link
            href="#contact"
            className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
            onClick={() => {
              setActiveSection("contact");
              setTimeOfLastClick(Date.now());
            }}
          >
            {contactText}{" "}
            <div className="opacity-70 group-hover:translate-x-1 transition">
              <ArrowRight />
            </div>
          </Link>

          <a
            className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
            href={
              lang === "en"
                ? "/CV_en-Franco_Emanuel_Musolino.pdf"
                : "/CV_es-Franco_Emanuel_Musolino.pdf"
            }
            download
          >
            {cvText}{" "}
            <div className="opacity-60 group-hover:translate-y-1 transition">
              <DownloadIcon />
            </div>
          </a>

          <a
            className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
            href="https://www.linkedin.com/in/franco-musolino-396817316"
            target="_blank"
            rel="noopener noreferrer"
            title="Linkedin"
          >
            <LinkedinIcon />
          </a>

          <a
            className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
            href="https://github.com/FrancoMusolino"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <GithubIcon />
          </a>
        </motion.div>
      </section>
    </Observe>
  );
}
