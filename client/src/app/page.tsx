import { SpotlightBG } from "../components/ui/Spotlight/SpotlightBG";
import Timer from "../components/Home/Timer/Timer";
import EventGrid from "@/components/Home/EventGrid";
import FAQCont from "@/components/Home/FAQCont";

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
