import { Dictionary } from "@/app/[lang]/dictionaries";

type FooterProps = {
  footerDict: Dictionary["footer"];
};

export async function Footer({ footerDict }: FooterProps) {
  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      <small className="mb-2 block text-xs">&copy; {footerDict.rights}</small>
      <p className="text-xs">{footerDict.about}</p>
    </footer>
  );
}
