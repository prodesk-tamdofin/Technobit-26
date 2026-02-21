import type { Metadata } from "next";
import React from "react";
import EventSegment from "@/components/Events/EventSegment";
import categoryIcons from "@/data/categoryIcons";
import TriangleBottom from "@/components/ui/TriangleBottom";
import Link from "next/link";
import { eventCategories, eventInfo } from "@/data/eventSegments";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { FaCalendarAlt, FaGlobe } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Events — All Segments",
  description:
    "Browse all 15 segments of Technobit'26: IT Olympiad, Crack the Code, eFootball, PUBG Mobile, Free Fire, Chess, Gaming Quiz, Animelogia, Marvel-DC Quiz, AI Art, Sci-Fi Story, Tech Meme War, Poster Designing, Robothon Olympiad, and Google It. Register now for free!",
  alternates: { canonical: "https://www.technobit26-itc.tech/events" },
};


const page = () => {
  // Use static event data
  const categories = eventCategories;
  
  return (
    <main className="max-w-[100vw] overflow-x-hidden">
      {/* Hero Section with BackgroundPaths */}
      <BackgroundPaths 
        title="TECHNOBIT'26"
        subtitle={eventInfo.tagline}
        buttonText="Explore Events"
        buttonHref="#events"
        logoSrc="/Logo(Red NO BG).png"
      />
      
      {/* Event Info Banner */}
      <div id="events" className="bg-gradient-to-r from-primary-650 via-primary-600 to-primary-650 py-6 border-y border-primary-350/20">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-8 text-center">
          <div className="flex items-center gap-2 text-white/80">
            <FaCalendarAlt className="text-primary-350 text-xl" />
            <span className="text-lg font-medium">{eventInfo.dates}</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <FaGlobe className="text-primary-150 text-xl" />
            <span className="text-lg font-medium">{eventInfo.type}</span>
          </div>
          <div className="text-primary-350 font-semibold text-lg">
            Organized by {eventInfo.organizer}
          </div>
        </div>
      </div>

      {/* Segment Icons */}
      <div className="bg-primary-650 py-12">
        <h2 className="mb-8 text-center text-4xl font-bold text-primary-250">OUR SEGMENTS</h2>
        <div className="flex max-w-[22rem] mx-auto flex-wrap justify-center gap-4">
          {categories.map((data, index) => {
            return (
              <Link
                href={"/events/#s" + data.id}
                className="rouded-full group relative block"
                key={index}
              >
                <div className="grid aspect-square h-14 w-14 -rotate-[12deg] cursor-pointer place-items-center rounded-full bg-primary-500/45 text-3xl text-primary-150 transition hover:bg-primary-500/75 group-hover:rotate-[360deg] sm:h-16 sm:w-16 sm:text-4xl">
                  {React.createElement(categoryIcons[index] || categoryIcons[0])}
                </div>
                <div className="absolute -top-[100%] left-1/2 grid h-[60px] w-[120px] origin-bottom -translate-x-1/2 scale-0 place-items-center rounded-lg bg-primary-550 p-2 text-center text-sm text-white/75 transition group-hover:scale-100">
                  {data.name}
                  <TriangleBottom />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Event Segments */}
      <div className="GradBGDark">
        {categories.map((data, index) => {
          return (
            <EventSegment
              key={index}
              name={data.name}
              description={data.description}
              events={data.events}
              index={index}
              id={data.id}
            />
          );
        })}
      </div>
    </main>
  );
};

export default page;
