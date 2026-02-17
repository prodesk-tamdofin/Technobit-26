import { getEventBySlug, eventInfo, eventCategories } from "@/data/eventSegments";
import DetailCard from "@/components/Events/DetailCard";
import MdSection from "@/components/ui/MdSection";
import { capitalCase } from "change-case";
import Link from "next/link";
import React from "react";
import { FiGlobe } from "react-icons/fi";
import { IoPerson } from "react-icons/io5";
import { MdEventAvailable, MdQuiz, MdGamepad, MdCode, MdBrush, MdEmojiEvents } from "react-icons/md";
import { notFound } from "next/navigation";

// Get event icon based on event value
const getEventIcon = (value: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    "it-olympiad": <MdQuiz className="text-7xl text-primary-350" />,
    "gaming-quiz": <MdGamepad className="text-7xl text-purple-400" />,
    "robothon-olympiad": <MdCode className="text-7xl text-blue-400" />,
    "marvel-dc-quiz": <MdEmojiEvents className="text-7xl text-red-400" />,
    "animelogia": <MdEmojiEvents className="text-7xl text-pink-400" />,
    "google-it": <MdQuiz className="text-7xl text-green-400" />,
    "crack-the-code": <MdCode className="text-7xl text-cyan-400" />,
    "sci-fi-story": <MdBrush className="text-7xl text-orange-400" />,
    "tech-meme-war": <MdBrush className="text-7xl text-yellow-400" />,
    "ai-art": <MdBrush className="text-7xl text-fuchsia-400" />,
    "poster-designing": <MdBrush className="text-7xl text-rose-400" />,
    "efootball": <MdGamepad className="text-7xl text-emerald-400" />,
    "pubg-mobile": <MdGamepad className="text-7xl text-amber-400" />,
    "free-fire": <MdGamepad className="text-7xl text-orange-400" />,
    "chess": <MdGamepad className="text-7xl text-slate-300" />,
  };
  return iconMap[value] || <MdEmojiEvents className="text-7xl text-primary-350" />;
};

// Get category color based on event
const getCategoryData = (eventValue: string) => {
  for (const cat of eventCategories) {
    if (cat.events.find(e => e.value === eventValue)) {
      const colors: { [key: number]: { bg: string; border: string } } = {
        1: { bg: "from-primary-350/30 to-primary-500/20", border: "border-primary-350/40" },
        2: { bg: "from-cyan-500/30 to-blue-600/20", border: "border-cyan-400/40" },
        3: { bg: "from-purple-500/30 to-pink-600/20", border: "border-purple-400/40" },
      };
      return { name: cat.name, ...colors[cat.id] };
    }
  }
  return { name: "Event", bg: "from-primary-350/30 to-primary-500/20", border: "border-primary-350/40" };
};

const Page = ({ params }: { params: { value: string } }) => {
  const result = getEventBySlug(params.value);
  
  if (!result) {
    notFound();
  }

  const categoryData = getCategoryData(params.value);

  return (
    <div>
      {" "}
      <div className="relative flex min-h-screen w-full max-w-[100vw] items-center justify-center overflow-hidden bg-primary-650">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-350/10 via-transparent to-primary-150/5" />

        {/* Hero Section */}

        <div className="container-c my-24 flex flex-col sm:my-28 lg:flex-row">
          <div className="mb-4 lg:hidden">
            <Link
              href="/events"
              className="border-b border-transparent pb-1 text-xl text-primary-200 hover:border-primary-200"
            >
              ← Back to Segments
            </Link>
          </div>
          <div className="h-[40vh] max-h-[40vh] lg:h-auto lg:w-[45%] lg:pr-4 xl:w-1/2">
            <div className={`h-full max-h-[50vh] w-full rounded-xl shadow-lg lg:h-auto bg-gradient-to-br ${categoryData.bg} flex flex-col items-center justify-center p-8 border ${categoryData.border}`}>
              <div className="text-center">
                {getEventIcon(params.value)}
                <p className="text-white/60 text-sm mt-4 uppercase tracking-wider">{categoryData.name}</p>
                <p className="text-primary-200 font-semibold mt-2">{result.name}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:w-[55%] lg:gap-6 lg:pl-4 xl:w-1/2">
            {/* Go Back Button */}

            <div className="hidden lg:block">
              <Link
                href="/events"
                className="border-b border-transparent pb-1 text-xl text-primary-200 hover:border-primary-200"
              >
                ← Back to Segments
              </Link>
            </div>

            {/* Heading */}

            <h2 className="title Inter mb-4 mt-12 pb-1 text-center text-4xl font-extrabold md:text-5xl lg:mb-0 lg:mt-0 lg:text-left">
              {result.name}
            </h2>

            {/* Location & Type*/}

            <div className="flex justify-center gap-3 lg:justify-start lg:gap-6">
              <div
                className={`Inter flex h-10 items-center justify-start gap-2 rounded-full bg-secondary-400/60 pl-1 pr-4 text-xl font-semibold`}
              >
                <div
                  className={`flex h-9 w-9 flex-1 items-center justify-center rounded-full bg-secondary-300 pt-1 text-lg text-white/60`}
                >
                  <FiGlobe className="-mt-1 text-xl text-white/60" />
                </div>
                <p className="text-white/75">{capitalCase(result.type)}</p>
              </div>

              <div className="mr-2 flex items-center gap-2 text-2xl font-semibold text-white/75 lg:mr-0">
                <IoPerson className="text-3xl text-primary-300" />
                <p>Solo</p>
              </div>
            </div>

            {/* Detail Card */}

            <div className="mt-6 flex w-full flex-col items-center gap-3 sm:flex-row lg:mt-0">
              <DetailCard
                icon={
                  <MdEventAvailable className="h-14 w-14 text-primary-300" />
                }
                title="Event Date"
                text={eventInfo.dates}
              />
            </div>

            {/* Fee */}
            <div className="my-6 flex flex-col items-center justify-center sm:flex-row lg:my-0 lg:ml-6 lg:justify-start">
              <div className="flex flex-col items-center md:flex-row">
                <h4 className="text-3xl text-primary-200">FEE</h4>
                <div className="mx-3 my-6 hidden h-1 w-1 rounded-full bg-primary-200 md:block"></div>

                <p className="Inter text-center md:text-end">
                  <span className="text-3xl font-semibold text-primary-350">
                    ৳
                  </span>{" "}
                  <span className="ml-2 text-start text-xl font-semibold text-white/75">
                    {result.fee === 0 ? "Free" : result.fee}
                  </span>{" "}
                </p>
              </div>
            </div>

            {/* Buttons */}

            <div className="z-30 flex w-full gap-2 sm:gap-4">
              <Link
                href={"/register/event/" + params.value}
                className="btn-prim Bebas flex-1 cursor-pointer rounded-full bg-primary-350 px-4 py-2.5 sm:px-8 md:text-xl"
                type="button"
              >
                Register →
              </Link>
              <a
                href="#rules"
                className="btn-prim Bebas flex flex-1 cursor-pointer justify-center rounded-full bg-secondary-400 px-4 py-2.5 before:bg-secondary-600 sm:px-8 md:text-xl"
                type="button"
              >
                RULES ↓
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Description  */}
      <div className="GradBGDark h-full">
        <div>
          <div className="border-b border-white/10 py-10">
            <h2 className="title title-top">ABOUT EVENT</h2>
            <MdSection className="container-c text-white/90">
              {result.description}
            </MdSection>
          </div>
          <div id="rules" className="py-16">
            <h2 className="title title-top">RULES AND REGULATIONS</h2>
            <div className="container-c text-white/90">
              <p className="text-center text-white/60">Rules and regulations will be announced soon. Stay tuned!</p>
              <div className="mt-8 p-6 rounded-xl bg-primary-600/30 border border-primary-350/20">
                <h3 className="text-xl font-bold text-primary-350 mb-4">General Guidelines:</h3>
                <ul className="list-disc list-inside space-y-2 text-white/70">
                  <li>All participants must register before the deadline</li>
                  <li>This is an online event - stable internet connection required</li>
                  <li>Follow fair play guidelines</li>
                  <li>Decisions by organizers are final</li>
                  <li>Contact us for any queries: bnmpc.itc@gmail.com</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
