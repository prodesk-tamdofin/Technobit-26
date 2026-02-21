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

const siteUrl = "https://www.technobit26-itc.tech";
const ogImage = `${siteUrl}/TechnobitLogo.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Technobit'26 | BNMPC IT Club — Annual Tech Festival",
    template: "%s | Technobit'26",
  },
  description:
    "Technobit'26 is the flagship annual tech festival organized by BNMPC IT Club (Birshreshtha Noor Mohammad Public College). Featuring IT Olympiad, coding competitions, gaming tournaments, quiz bowls, AI art, and more. Register now!",
  keywords: [
    "Technobit 26",
    "Technobit'26",
    "BNMPC IT Club",
    "BNMPC tech event",
    "Birshreshtha Noor Mohammad Public College",
    "IT festival Bangladesh",
    "tech competition Bangladesh",
    "IT Olympiad",
    "coding competition Bangladesh",
    "gaming tournament Bangladesh",
    "eFootball tournament",
    "PUBG Mobile tournament",
    "Free Fire tournament",
    "chess tournament online",
    "crack the code hackathon",
    "AI art competition",
    "tech meme war",
    "poster designing contest",
    "anime quiz",
    "Marvel DC quiz",
    "Google It challenge",
    "sci-fi story writing",
    "BMARPC",
    "BNMPC ITC",
  ],
  authors: [{ name: "BNMPC IT Club", url: siteUrl }],
  creator: "BNMPC IT Club",
  publisher: "BNMPC IT Club",
  category: "Technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/ITC_LOGO.png", sizes: "any" },
      { url: "/ITC_LOGO.png", type: "image/png" },
    ],
    apple: "/ITC_LOGO.png",
    shortcut: "/ITC_LOGO.png",
  },
  manifest: "/seo/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Technobit'26",
    title: "Technobit'26 | BNMPC IT Club — Annual Tech Festival",
    description:
      "Join Technobit'26 — the flagship annual tech festival by BNMPC IT Club. IT Olympiad, coding, gaming, quizzes, AI art & more. 5–10 March 2026.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Technobit'26 — BNMPC IT Club Annual Tech Festival",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bnmpcitclub",
    title: "Technobit'26 | BNMPC IT Club — Annual Tech Festival",
    description:
      "Join Technobit'26 — the flagship annual tech festival by BNMPC IT Club. IT Olympiad, coding, gaming, quizzes, AI art & more.",
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${siteUrl}/#organization`,
                  name: "BNMPC IT Club",
                  url: siteUrl,
                  logo: {
                    "@type": "ImageObject",
                    url: `${siteUrl}/ITC_LOGO.png`,
                  },
                  description:
                    "BNMPC IT Club is the official IT club of Birshreshtha Noor Mohammad Public College, organizing annual tech fest Technobit'26.",
                  sameAs: ["https://www.facebook.com/groups/exhib.it.bnmpcitc"],
                },
                {
                  "@type": "Event",
                  "@id": `${siteUrl}/#event`,
                  name: "Technobit'26",
                  description:
                    "Technobit'26 is the flagship annual technology festival organized by BNMPC IT Club, featuring IT Olympiad, coding competitions, gaming tournaments, creative contests and more.",
                  startDate: "2026-03-05",
                  endDate: "2026-03-10",
                  eventStatus: "https://schema.org/EventScheduled",
                  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
                  url: siteUrl,
                  image: ogImage,
                  organizer: {
                    "@type": "Organization",
                    name: "BNMPC IT Club",
                    url: siteUrl,
                  },
                  location: {
                    "@type": "VirtualLocation",
                    url: siteUrl,
                  },
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "BDT",
                    availability: "https://schema.org/InStock",
                    url: `${siteUrl}/register`,
                    validFrom: "2026-01-01",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  url: siteUrl,
                  name: "Technobit'26",
                  description: "Official website of Technobit'26 — Annual Tech Festival by BNMPC IT Club",
                  publisher: { "@id": `${siteUrl}/#organization` },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: `${siteUrl}/events?q={search_term_string}`,
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
      </head>
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
