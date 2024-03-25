"use client";

import React from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa";

import SectionHeading from "../section-heading";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import { SubmitBtn } from "../submit-btn";
import { EMAIL_REGEXP } from "@/lib/constants";

type ContactRenderProps = {
  title: string;
  description: string;
  buttonText: string;
  successText: string;
};

export function ContactRender({
  title,
  description,
  buttonText,
  successText,
}: ContactRenderProps) {
  const { ref } = useSectionInView("contact");

  const html = description.replace(
    EMAIL_REGEXP,
    (match) => `<a className="!underline" href="mailto:${match}">${match}</a>`
  );

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>{title}</SectionHeading>

      <p
        className="text-gray-700 -mt-6 dark:text-white/80"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <form
        className="mt-10 flex flex-col dark:text-black"
        action={async (formData) => {
          const { error } = await sendEmail(formData);

          if (error) {
            toast.error(error);
            return;
          }

          toast.success(successText);
        }}
      >
        <input
          className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
        />
        <textarea
          className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="message"
          placeholder="Your message"
          required
          maxLength={5000}
        />

        <div className="flex gap-3">
          <SubmitBtn text={buttonText} />

          <button
            type="button"
            className="group flex items-center justify-center gap-2 h-[3rem] w-[8rem] bg-[#25D366] text-[#ECE5DD] rounded-full outline-none transition-all focus:scale-110 hover:scale-110 hover:bg-[#25d365dc] active:scale-105"
          >
            <a
              href="https://wa.link/ff7srv"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              WhatsApp
              <FaWhatsapp
                className="text-xs opacity-80 transition-all group-hover:scale-110"
                size={18}
              />{" "}
            </a>
          </button>
        </div>
      </form>
    </motion.section>
  );
}
