"use client";
import React from "react";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import { BsArrowRight, BsLockFill } from "react-icons/bs";

interface Props {
  examSlug: string;
  btnClass: string;
}

export default function StartExamButton({ examSlug, btnClass }: Props) {
  const router = useRouter();
  const [user, loading] = useUser();

  const handleStart = () => {
    if (!user) {
      router.push(`/login?redirect=/exams/${examSlug}`);
      return;
    }
    sessionStorage.setItem("examSlug", examSlug);
    router.push("/demo-exam");
  };

  return (
    <button
      onClick={handleStart}
      disabled={loading}
      className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-white font-bold text-base tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] shadow-lg ${btnClass}`}
    >
      {loading ? (
        <span className="flex items-center gap-2 text-white/70">
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Checking login…
        </span>
      ) : (
        <>
          <BsLockFill className="text-sm opacity-70" />
          Start Exam
          <BsArrowRight className="text-base" />
        </>
      )}
    </button>
  );
}
