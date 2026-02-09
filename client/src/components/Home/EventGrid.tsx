import React from "react";
import { FaTicketAlt, FaStar, FaGamepad } from "react-icons/fa";
import Link from "next/link";

const segments = [
  {
    id: 1,
    name: "Solo Segments",
    description: "Individual challenge events - quizzes, olympiads & more. All free!",
    icon: FaTicketAlt,
    color: "from-purple-500 to-primary-350",
    href: "/events#s1",
  },
  {
    id: 2,
    name: "Signature Segments",
    description: "Our flagship events - programming, creative arts & design challenges.",
    icon: FaStar,
    color: "from-pink-500 to-primary-150",
    href: "/events#s2",
  },
  {
    id: 3,
    name: "Gaming Segments",
    description: "Competitive gaming tournaments - eFootball, PUBG, Free Fire & Chess.",
    icon: FaGamepad,
    color: "from-cyan-500 to-blue-500",
    href: "/events#s3",
  },
];

const EventGrid = () => {
  return (
    <>
      <h2 className="title title-top mb-10">OUR SEGMENTS</h2>
      <div className="container-c grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {segments.map((segment) => (
          <Link
            key={segment.id}
            href={segment.href}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600/50 to-primary-650/80 border border-primary-350/20 p-6 transition-all duration-300 hover:border-primary-350/50 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-350/10"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${segment.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            <div className="relative z-10">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${segment.color} mb-4`}>
                {React.createElement(segment.icon, {
                  className: "text-3xl text-white",
                })}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{segment.name}</h3>
              <p className="text-white/60 text-sm mb-4">{segment.description}</p>
              <span className="inline-flex items-center text-primary-350 font-medium text-sm group-hover:text-primary-250 transition-colors">
                Explore All
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mb-16 flex items-center justify-center">
        <Link
          href="/events"
          className="btn-prim leading-0 mt-2 bg-secondary-400 px-8 pb-3 pt-2.5 text-lg before:bg-secondary-500"
        >
          View All Segments
        </Link>
      </div>
    </>
  );
};

export default EventGrid;
