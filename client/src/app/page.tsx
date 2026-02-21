import type { Metadata } from "next";
import { SpotlightBG } from "../components/ui/Spotlight/SpotlightBG";
import Timer from "../components/Home/Timer/Timer";
import EventGrid from "@/components/Home/EventGrid";
import FAQCont from "@/components/Home/FAQCont";

export const metadata: Metadata = {
  title: "Technobit'26 | BNMPC IT Club — Annual Tech Festival",
  description:
    "Welcome to Technobit'26 — the flagship annual tech festival by BNMPC IT Club. Compete in IT Olympiad, Crack the Code, eFootball, PUBG Mobile, Free Fire, Chess, AI Art, quiz events and more. 5–10 March 2026. Register free!",
  alternates: { canonical: "https://www.technobit26-itc.tech" },
};


export default async function Home() {
  return (
    <main>
      <SpotlightBG />
      <Timer />
      <div className="GradBGDark h-full pt-16">
        <EventGrid />
        <div className="container-c flex flex-col gap-8 lg:flex-row">
          <FAQCont />
        </div>
      </div>
    </main>
  );
}
