"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

// WhatsApp group links per segment
const WA_LINKS: Record<string, string> = {
  "pubg-mobile":      "https://chat.whatsapp.com/HQaHIq4iRc8HJKrEAhNEyd?mode=gi_t",
  "free-fire":        "https://chat.whatsapp.com/DpU908s2Kbl65pBUre2Rud?mode=gi_t",
  "efootball":        "https://chat.whatsapp.com/I9GIymZ7DBpHBvqvu6sTd3?mode=gi_t",
  "chess":            "https://chat.whatsapp.com/JFd5MoqjJgYCSf2U4Ua0mi",
  "crack-the-code":   "https://chat.whatsapp.com/F6hUTwgSfi02hYCNroq82O",
  // Quiz segments
  "it-olympiad":      "https://chat.whatsapp.com/ENVBGgikkJXI1YwMCsfCJH?mode=gi_t",
  "gaming-quiz":      "https://chat.whatsapp.com/ENVBGgikkJXI1YwMCsfCJH?mode=gi_t",
  "robothon-olympiad":"https://chat.whatsapp.com/ENVBGgikkJXI1YwMCsfCJH?mode=gi_t",
  "marvel-dc-quiz":   "https://chat.whatsapp.com/ENVBGgikkJXI1YwMCsfCJH?mode=gi_t",
  "animelogia":       "https://chat.whatsapp.com/ENVBGgikkJXI1YwMCsfCJH?mode=gi_t",
  "google-it":        "https://chat.whatsapp.com/ENVBGgikkJXI1YwMCsfCJH?mode=gi_t",
  "sci-fi-story":     "https://chat.whatsapp.com/ENVBGgikkJXI1YwMCsfCJH?mode=gi_t",
  // Submission segments
  "tech-meme-war":    "https://chat.whatsapp.com/J9m5JqkJcBeKqphZbIHJzX?mode=gi_t",
  "ai-art":           "https://chat.whatsapp.com/J9m5JqkJcBeKqphZbIHJzX?mode=gi_t",
  "poster-designing": "https://chat.whatsapp.com/J9m5JqkJcBeKqphZbIHJzX?mode=gi_t",
};

const GENERAL_SPAM_LINK = "https://chat.whatsapp.com/BPYUs7CH5vvCDXuKMNAb04?mode=gi_t";

const WA_NAMES: Record<string, string> = {
  "pubg-mobile":      "PUBG Mobile",
  "free-fire":        "Free Fire",
  "efootball":        "eFootball",
  "chess":            "Chess",
  "crack-the-code":   "Crack the Code",
  "it-olympiad":      "Quiz Segments",
  "gaming-quiz":      "Quiz Segments",
  "robothon-olympiad":"Quiz Segments",
  "marvel-dc-quiz":   "Quiz Segments",
  "animelogia":       "Quiz Segments",
  "google-it":        "Quiz Segments",
  "sci-fi-story":     "Quiz Segments",
  "tech-meme-war":    "Submission Segments",
  "ai-art":           "Submission Segments",
  "poster-designing": "Submission Segments",
};

interface Props {
  open: boolean;
  eventSlug: string;
  eventName: string;
  onDone: () => void;
}

const WhatsAppJoinModal: React.FC<Props> = ({ open, eventSlug, eventName, onDone }) => {
  const segmentLink = WA_LINKS[eventSlug] || GENERAL_SPAM_LINK;
  const segmentGroupName = WA_NAMES[eventSlug] || eventName;
  const isSameLink = segmentLink === GENERAL_SPAM_LINK;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Blurred backdrop — non-dismissible */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          <motion.div
            className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-[#1a1a2e] to-primary-700 border border-white/10 shadow-2xl p-8 flex flex-col gap-6"
            initial={{ scale: 0.85, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, y: 30 }}
            transition={{ type: "spring", damping: 20, stiffness: 260 }}
          >
            {/* Header */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-500/20 border border-green-400/30">
                  <FaWhatsapp className="text-green-400 text-3xl" />
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">You&apos;re Registered!</h2>
              <p className="text-white/60 text-sm">
                Join the WhatsApp groups below to stay updated with event announcements and results.
              </p>
            </div>

            {/* Segment-specific group */}
            <a
              href={segmentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-green-600/20 border border-green-400/30 hover:bg-green-600/30 transition group"
            >
              <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-green-500/30">
                <FaWhatsapp className="text-green-400 text-xl" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-green-300 text-sm leading-tight">
                  {segmentGroupName} — Official Group
                </p>
                <p className="text-white/50 text-xs mt-0.5 truncate">Event updates, schedule &amp; results</p>
              </div>
              <span className="text-green-400 text-xs font-bold group-hover:translate-x-1 transition">JOIN →</span>
            </a>

            {/* General spam group — only show if different from segment link */}
            {!isSameLink && (
              <a
                href={GENERAL_SPAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-primary-600/30 border border-primary-400/20 hover:bg-primary-600/50 transition group"
              >
                <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-primary-400/20">
                  <FaWhatsapp className="text-primary-200 text-xl" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-primary-200 text-sm leading-tight">General Community Group</p>
                  <p className="text-white/50 text-xs mt-0.5 truncate">Technobit'26 announcements &amp; updates</p>
                </div>
                <span className="text-primary-200 text-xs font-bold group-hover:translate-x-1 transition">JOIN →</span>
              </a>
            )}

            {/* Confirm button — only way to close */}
            <button
              onClick={onDone}
              className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-base transition active:scale-95"
            >
              I have joined the GC
            </button>

            <p className="text-center text-white/30 text-xs -mt-2">
              Click the button above after joining to continue to your profile.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppJoinModal;
