"use client";

import React, { Fragment } from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";

import { WorldIcon } from "../icons";
import { Locale } from "@/lib/strapi/types";
import { useParams } from "next/navigation";

const languges: Record<Locale, Record<Locale, string>> = {
  es: { es: "Español", en: "Inglés" },
  en: { es: "Spanish", en: "English" },
};

export const LangSwitch = () => {
  const { lang } = useParams();
  const selectedLang = languges[lang as Locale];

  return (
    <Menu as="div">
      <Menu.Button className="bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950">
        <WorldIcon />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-14 top-4 z-10 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-950">
          {Object.entries(selectedLang).map(([locale, lang]) => (
            <Menu.Item key={locale}>
              {({ active }) => (
                <Link
                  href={`/${locale}`}
                  prefetch
                  scroll={false}
                  className={clsx(
                    active
                      ? "bg-gray-200 text-gray-900 dark:bg-[#0b0f1a] dark:text-gray-100"
                      : "text-gray-950 dark:text-gray-50 dark:text-opacity-90",
                    "block px-4 py-2 text-sm rounded-md"
                  )}
                >
                  {lang} ({locale})
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
