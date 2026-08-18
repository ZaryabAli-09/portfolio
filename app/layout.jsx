import { Nunito, Caveat } from "next/font/google";
import "./globals.css";
import TransitionProvider from "@/components/TransitionProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { readSiteSettings } from "@/lib/contentStore";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-primary",
});
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-secondary",
});

export const metadata = {
  title: "Zaryab_Dev.",
  description:
    "I am Zaryab Ali, a final-year Software Engineering student at Iqra  National University, Peshawar, with roots in Katlang, a vibrant  area in the Mardan district of Khyber Pakhtunkhwa, Pakistan. As a full-stack MERN developer and this is my portfoilo webiste. stay blessed!!",
};

export default async function RootLayout({ children }) {
  const siteSettings = await readSiteSettings();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={`${nunito.variable} ${caveat.variable} font-primary`}>
        <Toaster position="bottom-center" reverseOrder={true} />
        <Navbar siteSettings={siteSettings} />
        <TransitionProvider>{children}</TransitionProvider>
        <Footer siteSettings={siteSettings} />
      </body>
    </html>
  );
}
