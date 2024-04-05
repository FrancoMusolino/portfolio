import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import "../globals.css";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import ActiveSectionContextProvider from "@/context/active-section-context";
import { ThemeProvider } from "@/context/theme-context";

import { Locale } from "@/lib/strapi/types";
import { getDictionary } from "./dictionaries";

import { Switches } from "@/components/switches";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const { seo } = await getDictionary(params.lang);

  return {
    ...seo,
    openGraph: {
      ...seo,
      url: `https://${process.env.VERCEL_URL}/${params.lang}`,
    },
  };
}

export async function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);

  return (
    <html
      lang={params.lang}
      className="!scroll-smooth"
      suppressHydrationWarning
    >
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 relative pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
        <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>

        <ThemeProvider>
          <ActiveSectionContextProvider>
            <Header headerDict={dict.header} />
            {children}
            <Footer footerDict={dict.footer} />

            <Toaster position="top-right" />
            <Switches />
          </ActiveSectionContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
