"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BsArrowLeft, BsDownload, BsClipboard, BsCheckLg } from "react-icons/bs";
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
  const [loadingCSV, setLoadingCSV] = useState<string | null>(null);
  const [loadingWA, setLoadingWA] = useState<string | null>(null);
  const [copiedWA, setCopiedWA] = useState<string | null>(null);

  const downloadCSV = async (group: string) => {
    setLoadingCSV(group);
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
      setLoadingCSV(null);
    }
  };

  const copyWhatsApp = async (group: string, label: string) => {
    setLoadingWA(group);
    try {
      const res = await fetch(reqs.GROUP_WHATSAPP + group, { credentials: "include" });
      const data = await res.json();
      if (!data.succeed) {
        toast.error(data.msg || "Failed to fetch numbers");
        return;
      }
      const text = data.numbers.join("\n");
      await navigator.clipboard.writeText(text);
      setCopiedWA(group);
      toast.success(`Copied ${data.total} WhatsApp numbers for ${label}`);
      setTimeout(() => setCopiedWA(null), 3000);
    } catch {
      toast.error("Could not copy numbers");
    } finally {
      setLoadingWA(null);
    }
  };

  return (
    <div className="flex-1 text-white">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/safiq"
          className="flex items-center gap-1 rounded-lg bg-primary-700/50 px-3 py-2 text-sm text-white/70 hover:bg-primary-600/50"
        >
          <BsArrowLeft /> Back
        </Link>
        <div>
          <h1 className="text-2xl font-bold">CSV Downloads</h1>
          <p className="text-white/50 text-sm mt-0.5">Download full participant lists or copy WhatsApp numbers per segment</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GROUPS.map((g) => (
          <div
            key={g.key}
            className="flex flex-col gap-3 rounded-xl border border-primary-600/30 bg-primary-800/50 p-5"
          >
            <div>
              <p className="font-semibold text-white">{g.label}</p>
              <p className="mt-0.5 text-xs text-white/40">{g.description}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => downloadCSV(g.key)}
                disabled={loadingCSV === g.key}
                className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <BsDownload />
                {loadingCSV === g.key ? "Downloading…" : "Download Full CSV"}
              </button>
              <button
                onClick={() => copyWhatsApp(g.key, g.label)}
                disabled={loadingWA === g.key}
                className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  copiedWA === g.key
                    ? "bg-green-600 text-white"
                    : "bg-primary-600/60 hover:bg-primary-500/60 text-white/80"
                }`}
              >
                {copiedWA === g.key ? (
                  <><BsCheckLg /> Copied!</>
                ) : loadingWA === g.key ? (
                  "Fetching…"
                ) : (
                  <><BsClipboard /> Copy WhatsApp Numbers</>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CSVDownloadPage;
