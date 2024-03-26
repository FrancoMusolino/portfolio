import { getDictionary } from "@/app/[lang]/dictionaries";
import { Locale } from "@/lib/strapi/types";

type FooterProps = {
  locale: Locale;
};

export async function Footer({ locale }: FooterProps) {
  const { footer } = await getDictionary(locale);

  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      <small className="mb-2 block text-xs">&copy; {footer.rights}</small>
      <p className="text-xs">{footer.about}</p>
    </footer>
  );
}
