import type { Metadata } from "next";

import "./globals.css";
import { metaGenerator } from "./meta";
import { Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { TOASTER_PROPS } from "@/lib";
//import TawkToScript from "@/hooks/tawkScript";

const montserrat = Montserrat({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const generateMetadata = async (): Promise<Metadata> =>
  await metaGenerator();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="max-w-[1600px] mx-auto text-mobile sm:text-desktop"
    >
      <body className={`${montserrat.className}`}>
        {children}
        <Toaster {...TOASTER_PROPS} />
        {/* <TawkToScript/> */}
      </body>
    </html>
  );
}
