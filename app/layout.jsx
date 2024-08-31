import { Inter } from "next/font/google";
import "./globals.css";
import TransitionProvider from "@/components/TransitionProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Zaryab_Dev.",
  description:
    "I am Zaryab Ali, a final-year Software Engineering student at Iqra  National University, Peshawar, with roots in Katlang, a vibrant  area in the Mardan district of Khyber Pakhtunkhwa, Pakistan. As a full-stack MERN developer and this is my portfoilo webiste. stay blessed!!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
