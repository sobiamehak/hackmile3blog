import "../globals.css";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import {
  VisualEditing,
  toPlainText,
  type PortableTextBlock,
} from "next-sanity";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";

import Header from "./alert-banner";
import PortableText from "./portable-text";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import Link from "next/link";
export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || demo.title;
  const description = settings?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await sanityFetch({ query: settingsQuery });
  const footer = data?.footer || [];
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" className={`${inter.variable} bg-white text-black`}>
      <body>
        <section className="min-h-screen">
          {isDraftMode && <Header />}
          <main>{children}</main>
          <footer className="bg-accent-1 border-accent-2 border-t bg-black">
            <div className="container mx-auto px-5">
              {footer.length > 0 ? (
                <PortableText
                  className="prose-sm text-pretty bottom-0 w-full max-w-none bg-white py-12 text-center md:py-20"
                  value={footer as PortableTextBlock[]}
                />
              ) : (
                <div className="flex flex-col items-center py-8 lg:flex-row">
                  <p className=" text-white mb-10 text-center  font-bold leading-tight tracking-tighter lg:mb-0 lg:w-1/2 lg:pr-4 lg:text-left lg:text-xl">
                 &copy; 2024 My Blog. All Rights Reserved.
                  </p>
                  <div className="flex flex-col items-center justify-center lg:w-1/2 lg:flex-row lg:pl-4">
                   
                   
<div className='flex justify-center items-center text-4xl gap-8 pb-15'>
 

 <Link href="https://www.linkedin.com/in/sobia-mehak-a277362ba/" target="_blank" rel="noopener noreferrer">
   <FaLinkedin className='text-blue-900 transition duration-300 ease-in-out transform hover:scale-105' />
 </Link>
 <Link href="https://github.com/sobiamehak" target="_blank" rel="noopener noreferrer">
   <FaGithub className=' transition duration-300 ease-in-out transform hover:scale-105 text-white' />
 </Link>
 <Link href="https://www.facebook.com/lal.pari.712714?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
   <FaFacebook className='text-blue-700 transition duration-300 ease-in-out transform hover:scale-105' />
 </Link>
</div>
                  </div>
                </div>
              )}
            </div>
          </footer>
        </section>
        {isDraftMode && <VisualEditing />}
        <SpeedInsights />
      </body>
    </html>
  );
}
