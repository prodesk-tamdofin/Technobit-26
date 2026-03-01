import React from "react";
import Link from "next/link";
import { EXAM_META } from "@/data/examQuestions";
import type { Metadata } from "next";
import {
  BsLaptop, BsController, BsCpu, BsShield, BsLightningCharge,
  BsClock, BsListOl, BsLockFill, BsArrowRight, BsExclamationTriangleFill,
} from "react-icons/bs";
import ExamGuard from "@/components/Exam/ExamGuard";

export const metadata: Metadata = {
  title: "Online Exams | Technobit'26",
  description: "Take your Technobit'26 quiz segment exam online.",
};

const examIcons: Record<string, React.ReactNode> = {
  "it-olympiad":       <BsLaptop          className="text-[28px]" />,
  "gaming-quiz":       <BsController      className="text-[28px]" />,
  "robothon-olympiad": <BsCpu             className="text-[28px]" />,
  "marvel-dc-quiz":    <BsShield          className="text-[28px]" />,
  "animelogia":        <BsLightningCharge className="text-[28px]" />,
};

const colorMap: Record<string, { border: string; bg: string; accent: string; iconBg: string; iconText: string; badge: string; badgeText: string; arrow: string }> = {
  blue:   { border: "border-blue-500/25",   bg: "bg-blue-500/[0.06]",   accent: "bg-blue-500",   iconBg: "bg-blue-500/20",   iconText: "text-blue-300",   badge: "bg-blue-500/15 border-blue-500/30",   badgeText: "text-blue-300",   arrow: "text-blue-400"   },
  green:  { border: "border-green-500/25",  bg: "bg-green-500/[0.06]",  accent: "bg-green-500",  iconBg: "bg-green-500/20",  iconText: "text-green-300",  badge: "bg-green-500/15 border-green-500/30",  badgeText: "text-green-300",  arrow: "text-green-400"  },
  orange: { border: "border-orange-500/25", bg: "bg-orange-500/[0.06]", accent: "bg-orange-500", iconBg: "bg-orange-500/20", iconText: "text-orange-300", badge: "bg-orange-500/15 border-orange-500/30", badgeText: "text-orange-300", arrow: "text-orange-400" },
  red:    { border: "border-red-500/25",    bg: "bg-red-500/[0.06]",    accent: "bg-red-500",    iconBg: "bg-red-500/20",    iconText: "text-red-300",    badge: "bg-red-500/15 border-red-500/30",    badgeText: "text-red-300",    arrow: "text-red-400"    },
  purple: { border: "border-purple-500/25", bg: "bg-purple-500/[0.06]", accent: "bg-purple-500", iconBg: "bg-purple-500/20", iconText: "text-purple-300", badge: "bg-purple-500/15 border-purple-500/30", badgeText: "text-purple-300", arrow: "text-purple-400" },
};

export default function ExamsPage() {
  return (
    <ExamGuard>
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-primary-300 font-semibold mb-4">
            Technobit&apos;26 — Online Examination Portal
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Quiz <span className="text-[#FF1744]">Segments</span>
          </h1>
          <p className="text-white/40 text-base max-w-lg mx-auto leading-relaxed">
            Select your registered segment below. You must be logged in and registered for the segment to begin.
          </p>
        </div>

        {/* Warning Banner */}
        <div className="mb-10 rounded-2xl bg-amber-500/[0.07] border border-amber-500/20 px-6 py-4 flex items-start gap-4">
          <BsExclamationTriangleFill className="text-amber-400 text-lg shrink-0 mt-0.5" />
          <p className="text-sm text-amber-200/60 leading-relaxed">
            <span className="font-semibold text-amber-300">Read before starting — </span>
            Each exam is fully proctored. Switching tabs, opening DevTools, or exiting fullscreen will be recorded as violations.{" "}
            <strong className="text-amber-200">3 violations</strong> will auto-submit your exam.
          </p>
        </div>

        {/* Exam Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EXAM_META.map((exam) => {
            const c = colorMap[exam.color];
            return (
              <Link
                key={exam.slug}
                href={`/exams/${exam.slug}`}
                className={`group relative flex flex-col gap-5 rounded-2xl border ${c.border} ${c.bg} p-6 hover:brightness-110 hover:scale-[1.015] transition-all duration-200 overflow-hidden`}
              >
                {/* Top accent line */}
                <div className={`absolute top-0 left-6 right-6 h-[1px] ${c.accent} opacity-40`} />

                {/* Icon + badge */}
                <div className="flex items-start justify-between mt-1">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${c.iconBg} ${c.iconText}`}>
                    {examIcons[exam.slug]}
                  </div>
                  <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${c.badge} ${c.badgeText}`}>
                    <BsClock className="text-[10px]" /> {exam.duration} min
                  </span>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h2 className="text-white font-bold text-lg mb-1.5 leading-snug">{exam.name}</h2>
                  <p className="text-white/40 text-sm line-clamp-2 leading-relaxed">{exam.description}</p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.07]">
                  <div className="flex items-center gap-3 text-xs text-white/30">
                    <span className="flex items-center gap-1"><BsListOl /> {exam.totalQ} Qs</span>
                    <span className="flex items-center gap-1"><BsLockFill /> Proctored</span>
                  </div>
                  <span className={`flex items-center gap-1 text-xs font-semibold ${c.arrow} group-hover:translate-x-0.5 transition-transform duration-200`}>
                    View <BsArrowRight />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="text-center text-white/20 text-xs mt-10 tracking-wide">
          Google-IT segment is conducted separately and is not listed here.
        </p>
      </div>
    </main>
    </ExamGuard>
  );
}
