"use client";

import React from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import SectionHeading from "../section-heading";
import { sendEmail } from "@/actions/sendEmail";
import { SubmitBtn } from "../submit-btn";
import { EMAIL_REGEXP } from "@/lib/constants";
import { WhatsAppIcon } from "../icons";
import { Observe } from "../observe";
import { useActiveSectionContext } from "@/context/active-section-context";

type ContactRenderProps = {
  title: string;
  description: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submitText: string;
  successText: string;
};

export function ContactRender({
  title,
  description,
  emailPlaceholder,
  messagePlaceholder,
  submitText,
  successText,
}: ContactRenderProps) {
  const { setActiveSection } = useActiveSectionContext();
  const html = description.replace(
    EMAIL_REGEXP,
    (match) => `<a class="!underline" href="mailto:${match}">${match}</a>`
  );

  return (
    <Observe
      onElementIntersected={(elementId) => setActiveSection(elementId)}
      opts={{ threshold: 0.5 }}
      elementId="contact"
    >
      <motion.section
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
            placeholder={emailPlaceholder}
          />
          <textarea
            className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
            name="message"
            placeholder={messagePlaceholder}
            required
            maxLength={5000}
          />

          <div className="flex gap-3">
            <SubmitBtn text={submitText} />

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
                <div className="text-xs opacity-80 transition-all group-hover:scale-110">
                  <WhatsAppIcon />
                </div>
              </a>
            </button>
          </div>
        </form>
      </motion.section>
    </Observe>
  );
}
