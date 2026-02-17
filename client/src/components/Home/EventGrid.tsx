import React from "react";
import { HiOutlineUser, HiOutlineStar, HiOutlineDesktopComputer } from "react-icons/hi";
import { IoChevronForward } from "react-icons/io5";
import Link from "next/link";

const segments = [
  {
    id: 1,
    name: "Solo Segments",
    tagline: "Prove Your Individual Mastery",
    description: "Challenge yourself in quizzes, olympiads, and cerebral showdowns. Completely free — show up and dominate.",
    icon: HiOutlineUser,
    accentColor: "#FF1744",
    glowColor: "rgba(255, 23, 68, 0.15)",
    borderColor: "rgba(255, 23, 68, 0.3)",
    href: "/events#s1",
    count: "6 Events",
  },
  {
    id: 2,
    name: "Signature Segments",
    tagline: "Flagship Competitions Await",
    description: "Our headlining events — programming contests, creative showcases, and design battles that define Technobit.",
    icon: HiOutlineStar,
    accentColor: "#FF006E",
    glowColor: "rgba(255, 0, 110, 0.15)",
    borderColor: "rgba(255, 0, 110, 0.3)",
    href: "/events#s2",
    count: "5 Events",
  },
  {
    id: 3,
    name: "Gaming Segments",
    tagline: "Battle. Compete. Conquer.",
    description: "Competitive esports — eFootball, PUBG, Free Fire & Chess. Bring your A-game.",
    icon: HiOutlineDesktopComputer,
    accentColor: "#D500F9",
    glowColor: "rgba(213, 0, 249, 0.15)",
    borderColor: "rgba(213, 0, 249, 0.3)",
    href: "/events#s3",
    count: "5 Events",
  },
];

const EventGrid = () => {
  return (
    <>
      <div className="text-center mb-14">
        <p className="text-primary-200/60 text-sm tracking-[0.35em] uppercase mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>Stay Tuned</p>
        <h2 className="title title-top mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>OUR SEGMENTS</h2>
        <div className="mx-auto w-24 h-[2px] bg-gradient-to-r from-transparent via-primary-200 to-transparent" />
      </div>
      <div className="container-c grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {segments.map((segment) => (
          <Link
            key={segment.id}
            href={segment.href}
            className="group relative overflow-hidden rounded-2xl backdrop-blur-sm p-[1px] transition-all duration-500 hover:scale-[1.03]"
            style={{ background: `linear-gradient(135deg, ${segment.borderColor}, transparent 60%)` }}
          >
            <div className="relative h-full rounded-2xl bg-primary-650/95 p-7 flex flex-col overflow-hidden">
              {/* Glow effect on hover */}
              <div 
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: segment.glowColor }}
              />
              
              {/* Top row: icon + event count */}
              <div className="flex items-start justify-between mb-5">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
                  style={{ borderColor: segment.accentColor + '40', background: segment.glowColor }}
                >
                  {React.createElement(segment.icon, {
                    className: "text-2xl",
                    style: { color: segment.accentColor },
                  })}
                </div>
                <span 
                  className="text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full border"
                  style={{ color: segment.accentColor, borderColor: segment.accentColor + '30', background: segment.glowColor }}
                >
                  {segment.count}
                </span>
              </div>

              {/* Content */}
              <h3 
                className="text-xl font-bold text-white mb-1 tracking-wide"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {segment.name}
              </h3>
              <p 
                className="text-xs font-medium tracking-wider uppercase mb-3 opacity-70"
                style={{ color: segment.accentColor }}
              >
                {segment.tagline}
              </p>
              <p className="text-white/50 text-sm leading-relaxed mb-6 flex-1">
                {segment.description}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-2 text-white/70 group-hover:text-white transition-colors duration-300">
                <span className="text-sm font-medium">Explore Events</span>
                <IoChevronForward className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
              </div>

              {/* Bottom accent line */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${segment.accentColor}, transparent)` }}
              />
            </div>
          </Link>
        ))}
      </div>
      <div className="mb-16 flex items-center justify-center">
        <Link
          href="/events"
          className="group inline-flex items-center gap-3 px-8 py-3 rounded-full border border-primary-200/30 bg-primary-200/10 text-primary-200 font-semibold tracking-wide hover:bg-primary-200/20 hover:border-primary-200/50 transition-all duration-300"
        >
          View All Segments
          <IoChevronForward className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </>
  );
};

export default EventGrid;
