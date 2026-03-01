"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";

const ALLOWED_EMAILS = ["redoyanul1234@gmail.com"];

export default function ExamGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, loading] = useUser();
  // Track whether the hook has started loading at least once
  const everLoaded = useRef(false);
  const [authDone, setAuthDone] = useState(false);

  useEffect(() => {
    if (loading) {
      everLoaded.current = true;
      return;
    }
    // Only act once the hook has actually fired its API call (loading was true)
    if (!everLoaded.current) return;

    setAuthDone(true);
    if (!user) {
      router.replace("/login?redirect=/exams");
      return;
    }
    if (!ALLOWED_EMAILS.includes(user.email)) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (!authDone) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !ALLOWED_EMAILS.includes(user.email)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
