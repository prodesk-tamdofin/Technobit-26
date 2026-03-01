"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";

const ALLOWED_EMAILS = ["redoyanul1234@gmail.com"];

export default function ExamGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, loading] = useUser();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login?redirect=/exams");
      return;
    }
    if (!ALLOWED_EMAILS.includes(user.email)) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !ALLOWED_EMAILS.includes(user.email)) {
    return null;
  }

  return <>{children}</>;
}
