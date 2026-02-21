import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Layout/Navbar";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/Layout/Footer";
import ExtendedColors from "../../color.config";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import "@/components/Admin/Dashboard/Dashboard.css";
// const inter = Inter({ subsets: ["latin"] });  disabled for offline usage

export const metadata: Metadata = {
  title: "Technobit'26 | BNMPC IT Club",
  description: "The Ultimate IT Event by BNMPC IT Club",
  icons: { icon: "/ITC_LOGO.png" },
  manifest: "/seo/site.webmanifest",
  openGraph: {
    images: [
      {
        url: "/ITC_LOGO.png",
        width: 512,
        height: 512,
        alt: "Technobit'26 Logo",
      },
    ],
  },
  twitter: {
    images: [
      {
        url: "/ITC_LOGO.png",
        width: 512,
        height: 512,
        alt: "Technobit'26 Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={"max-w-[100vw] overflow-x-hidden bg-primary-650"}>
        <NextTopLoader color={ExtendedColors["primary"]["400"]} />
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <ToastContainer
            bodyClassName={"Inter"}
            theme="dark"
            limit={3}
            autoClose={2000}
            toastStyle={{
              backgroundColor: ExtendedColors.secondary["600"],
            }}
          />
          <Navbar />
          <Suspense>{children}</Suspense>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
