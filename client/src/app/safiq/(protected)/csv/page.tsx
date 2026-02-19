"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BsArrowLeft, BsDownload } from "react-icons/bs";
import { toast } from "react-toastify";
import reqs from "@/api/requests";

const GROUPS: { key: string; label: string; description: string }[] = [
  { key: "freefire",     label: "Free Fire",     description: "All Free Fire participants" },
  { key: "pubg",         label: "PUBG Mobile",   description: "All PUBG Mobile participants" },
  { key: "efootball",    label: "eFootball",     description: "All eFootball participants" },
  { key: "chess",        label: "Chess",         description: "All Chess participants" },
  { key: "crackthecode", label: "Crack The Code", description: "All Crack The Code participants" },
  {
    key: "submission",
    label: "Submission Events",
    description: "Poster Designing, AI Art, Tech Meme War, Sci-Fi Story",
  },
  {
    key: "quiz",
    label: "Quiz / Olympiad",
    description: "IT Olympiad, Gaming Quiz, Robothon Olympiad, Marvel-DC Quiz, Animelogia, Google-IT",
  },
];

const CSVDownloadPage = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const downloadCSV = async (group: string) => {
    setLoading(group);
    try {
      const res = await fetch(reqs.DOWNLOAD_GROUP_CSV + group, { credentials: "include" });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        toast.error(json.msg || "Download failed");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${group}-participants.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`${group} CSV downloaded`);
    } catch {
      toast.error("Network error — could not download CSV");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-6 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center gap-3">
          <Link
            href="/safiq"
            className="flex items-center gap-1 rounded-lg bg-gray-800 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700"
          >
            <BsArrowLeft /> Back
          </Link>
          <h1 className="text-2xl font-bold">CSV Downloads</h1>
        </div>

        <p className="mb-6 text-gray-400">
          Download participant lists by event group. Each CSV contains Full Name, Email, and WhatsApp Number.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {GROUPS.map((g) => (
            <div
              key={g.key}
              className="flex flex-col gap-3 rounded-xl border border-white/10 bg-gray-900 p-5"
            >
              <div>
                <p className="font-semibold text-white">{g.label}</p>
                <p className="mt-0.5 text-xs text-gray-400">{g.description}</p>
              </div>
              <button
                onClick={() => downloadCSV(g.key)}
                disabled={loading === g.key}
                className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <BsDownload />
                {loading === g.key ? "Downloading…" : "Download CSV"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CSVDownloadPage;
