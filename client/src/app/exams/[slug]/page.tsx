import React from "react";
import Link from "next/link";
import { EXAM_META } from "@/data/examQuestions";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import StartExamButton from "@/components/Exam/StartExamButton";
import {
  BsLaptop, BsController, BsCpu, BsShield, BsLightningCharge,
  BsClock, BsListOl, BsLockFill, BsCheckCircleFill, BsExclamationTriangleFill,
} from "react-icons/bs";
import ExamGuard from "@/components/Exam/ExamGuard";

export function generateStaticParams() {
  return EXAM_META.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const exam = EXAM_META.find((e) => e.slug === params.slug);
  if (!exam) return { title: "Exam Not Found" };
  return { title: `${exam.name} — Technobit'26 Exam` };
}

const examIcons: Record<string, React.ReactNode> = {
  "it-olympiad":       <BsLaptop          className="text-[36px]" />,
  "gaming-quiz":       <BsController      className="text-[36px]" />,
  "robothon-olympiad": <BsCpu             className="text-[36px]" />,
  "marvel-dc-quiz":    <BsShield          className="text-[36px]" />,
  "animelogia":        <BsLightningCharge className="text-[36px]" />,
};

const colorMap: Record<string, { ring: string; bg: string; accent: string; iconBg: string; iconText: string; badge: string; badgeText: string; btn: string }> = {
  blue:   { ring: "ring-blue-500/30",   bg: "bg-blue-500/[0.07]",   accent: "bg-blue-500",   iconBg: "bg-blue-500/20",   iconText: "text-blue-300",   badge: "bg-blue-500/15 border-blue-500/30",   badgeText: "text-blue-300",   btn: "bg-blue-600 hover:bg-blue-500"   },
  green:  { ring: "ring-green-500/30",  bg: "bg-green-500/[0.07]",  accent: "bg-green-500",  iconBg: "bg-green-500/20",  iconText: "text-green-300",  badge: "bg-green-500/15 border-green-500/30",  badgeText: "text-green-300",  btn: "bg-green-600 hover:bg-green-500"  },
  orange: { ring: "ring-orange-500/30", bg: "bg-orange-500/[0.07]", accent: "bg-orange-500", iconBg: "bg-orange-500/20", iconText: "text-orange-300", badge: "bg-orange-500/15 border-orange-500/30", badgeText: "text-orange-300", btn: "bg-orange-600 hover:bg-orange-500" },
  red:    { ring: "ring-red-500/30",    bg: "bg-red-500/[0.07]",    accent: "bg-red-500",    iconBg: "bg-red-500/20",    iconText: "text-red-300",    badge: "bg-red-500/15 border-red-500/30",    badgeText: "text-red-300",    btn: "bg-red-600 hover:bg-red-500"    },
  purple: { ring: "ring-purple-500/30", bg: "bg-purple-500/[0.07]", accent: "bg-purple-500", iconBg: "bg-purple-500/20", iconText: "text-purple-300", badge: "bg-purple-500/15 border-purple-500/30", badgeText: "text-purple-300", btn: "bg-purple-600 hover:bg-purple-500" },
};

export default function ExamInstructionsPage({ params }: { params: { slug: string } }) {
  const exam = EXAM_META.find((e) => e.slug === params.slug);
  if (!exam) notFound();

  const c = colorMap[exam.color];

  return (
    <ExamGuard>
    <main className="min-h-screen pt-28 pb-16 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header Card */}
        <div className={`relative rounded-2xl ring-1 ${c.ring} ${c.bg} p-8 mb-6 overflow-hidden`}>
          {/* Top accent bar */}
          <div className={`absolute top-0 left-0 right-0 h-[2px] ${c.accent} opacity-60`} />

          <div className="flex items-start gap-5 mb-5">
            <div className={`flex items-center justify-center w-16 h-16 rounded-2xl ${c.iconBg} ${c.iconText} shrink-0`}>
              {examIcons[exam.slug]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${c.badge} ${c.badgeText}`}>
                  <BsLockFill className="text-[10px]" /> Proctored Exam
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">{exam.name}</h1>
            </div>
          </div>

          <p className="text-white/50 leading-relaxed mb-6 text-sm">{exam.description}</p>

          <div className="flex flex-wrap gap-3">
            <div className={`flex items-center gap-2 ${c.iconBg} ${c.iconText} rounded-xl px-4 py-2.5 text-sm font-medium`}>
              <BsClock /> {exam.duration} minutes
            </div>
            <div className="flex items-center gap-2 bg-white/[0.07] text-white/60 rounded-xl px-4 py-2.5 text-sm font-medium">
              <BsListOl /> {exam.totalQ} MCQ questions
            </div>
            <div className="flex items-center gap-2 bg-white/[0.07] text-white/60 rounded-xl px-4 py-2.5 text-sm font-medium">
              <BsLockFill /> Fullscreen enforced
            </div>
          </div>
        </div>

        {/* Rules */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 mb-5">
          <h2 className="text-white font-bold text-base mb-5 flex items-center gap-2 uppercase tracking-wider text-xs">
            Rules &amp; Instructions
          </h2>
          <ul className="space-y-3">
            {exam.rules.map((rule, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                <BsCheckCircleFill className={`shrink-0 mt-0.5 ${c.iconText} opacity-60`} />
                {rule}
              </li>
            ))}
          </ul>
        </div>

        {/* Proctoring Warning */}
        <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.06] px-5 py-4 mb-8 flex gap-3">
          <BsExclamationTriangleFill className="text-red-400 text-base shrink-0 mt-0.5" />
          <p className="text-red-300/70 text-sm leading-relaxed">
            This exam is <strong className="text-red-300">fully proctored</strong>. Any attempt to cheat — tab switching, copy-paste, inspecting elements or using AI tools — will be logged and may result in disqualification.
          </p>
        </div>

        {/* Start Button */}
        <StartExamButton examSlug={exam.slug} btnClass={c.btn} />
      </div>
    </main>
    </ExamGuard>
  );
}
