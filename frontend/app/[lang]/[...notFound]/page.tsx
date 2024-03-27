import Link from "next/link";

import { Locale } from "@/lib/strapi/types";
import { getDictionary } from "../dictionaries";

export default async function NotFound({
  params,
}: {
  params: { lang: Locale };
}) {
  const { notFound } = await getDictionary(params.lang);

  return (
    <div className="flex flex-col gap-6 sm:gap-8 justify-center items-center py-20 sm:py-36">
      <h3 className="text-center">{notFound.title}</h3>

      <Link
        href={`/${params.lang}`}
        prefetch
        className="flex items-center justify-center h-[3rem] w-[8rem] bg-gray-900 text-white rounded-full outline-none transition-all focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 dark:bg-white dark:bg-opacity-10 disabled:scale-100 disabled:bg-opacity-65"
      >
        {notFound.buttonText}
      </Link>
    </div>
  );
}
