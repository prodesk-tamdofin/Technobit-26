"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { DEMO_QUESTIONS, EXAM_META, MCQQuestion } from "@/data/examQuestions";

// ── Helpers ──────────────────────────────────────────────────────────────────

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildShuffledQuestions(seed: number): MCQQuestion[] {
  const shuffledQ = seededShuffle(DEMO_QUESTIONS, seed);
  return shuffledQ.map((q) => {
    const indexed = q.options.map((opt, i) => ({ opt, isCorrect: i === q.correct }));
    const shuffledOpts = seededShuffle(indexed, seed + q.id * 7);
    return {
      ...q,
      options: shuffledOpts.map((x) => x.opt),
      correct: shuffledOpts.findIndex((x) => x.isCorrect),
    };
  });
}

function fmt(sec: number) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

const MAX_VIOLATIONS = 3;
const EXAM_DURATION = 30 * 60; // 30 min in seconds

// ── Component ─────────────────────────────────────────────────────────────────

export default function DemoExamPage() {
  const router = useRouter();

  // ── State ──────────────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<"loading" | "exam" | "submitted">("loading");
  const [questions, setQuestions] = useState<MCQQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({}); // questionId → chosen option index
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
  const [violations, setViolations] = useState(0);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  const [score, setScore] = useState<{ correct: number; total: number } | null>(null);
  const [examName, setExamName] = useState("Demo Exam");

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const submittedRef = useRef(false);
  const violationsRef = useRef(0);
  const warningAckRef = useRef(false);

  // ── Submit logic ───────────────────────────────────────────────────────────
  const submitExam = useCallback(
    (qs: MCQQuestion[], ans: Record<number, number>) => {
      if (submittedRef.current) return;
      submittedRef.current = true;
      if (timerRef.current) clearInterval(timerRef.current);

      // Exit fullscreen
      try { if (document.fullscreenElement) document.exitFullscreen(); } catch {}

      const correct = qs.filter((q) => ans[q.id] === q.correct).length;
      setScore({ correct, total: qs.length });
      setPhase("submitted");
    },
    []
  );

  // ── Init ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    const slug = typeof window !== "undefined" ? sessionStorage.getItem("examSlug") : null;
    const meta = slug ? EXAM_META.find((e) => e.slug === slug) : null;
    if (meta) setExamName(meta.name);

    // Build questions with a seed based on user + time (hour-granular so same user
    // gets same order in a sitting but different from next hour)
    const seed = Date.now() % 99991;
    const qs = buildShuffledQuestions(seed);
    setQuestions(qs);

    // Request fullscreen, then kick off exam
    const el = document.documentElement;
    const fsPromise = el.requestFullscreen?.() ?? Promise.resolve();
    fsPromise
      .catch(() => {}) // user may deny — continue anyway
      .finally(() => setPhase("exam"));
  }, []);

  // ── Timer ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "exam") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          submitExam(questions, answers);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // ── Proctoring: record a violation ────────────────────────────────────────
  const recordViolation = useCallback(
    (msg: string) => {
      if (submittedRef.current) return;
      violationsRef.current += 1;
      setViolations(violationsRef.current);
      setWarningMsg(`⚠️ ${msg} (Violation ${violationsRef.current}/${MAX_VIOLATIONS})`);
      if (violationsRef.current >= MAX_VIOLATIONS) {
        setTimeout(() => submitExam(questions, answers), 1500);
      }
    },
    [questions, answers, submitExam]
  );

  // ── Proctoring: tab visibility ─────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "exam") return;
    const onVisibility = () => {
      if (document.hidden) recordViolation("You switched tabs or minimized the window.");
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [phase, recordViolation]);

  // ── Proctoring: window blur ────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "exam") return;
    const onBlur = () => {
      if (!warningAckRef.current) recordViolation("Window focus was lost.");
    };
    window.addEventListener("blur", onBlur);
    return () => window.removeEventListener("blur", onBlur);
  }, [phase, recordViolation]);

  // ── Proctoring: fullscreen exit ────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "exam") return;
    const onFsChange = () => {
      if (!document.fullscreenElement && !submittedRef.current) {
        recordViolation("You exited fullscreen mode.");
        // Re-request fullscreen
        document.documentElement.requestFullscreen?.().catch(() => {});
      }
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, [phase, recordViolation]);

  // ── Proctoring: right-click & keyboard shortcuts ───────────────────────────
  useEffect(() => {
    if (phase !== "exam") return;

    const noContextMenu = (e: MouseEvent) => e.preventDefault();

    const noKeys = (e: KeyboardEvent) => {
      const blocked = [
        e.key === "F12",
        e.ctrlKey && ["c", "v", "a", "u", "s", "p"].includes(e.key.toLowerCase()),
        e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(e.key.toLowerCase()),
        e.altKey && e.key === "Tab",
        e.metaKey,
      ];
      if (blocked.some(Boolean)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener("contextmenu", noContextMenu);
    document.addEventListener("keydown", noKeys);
    return () => {
      document.removeEventListener("contextmenu", noContextMenu);
      document.removeEventListener("keydown", noKeys);
    };
  }, [phase]);

  // ── Proctoring: DevTools size heuristic ────────────────────────────────────
  useEffect(() => {
    if (phase !== "exam") return;
    const check = () => {
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;
      if (widthDiff > 160 || heightDiff > 160) {
        recordViolation("Developer tools appear to be open.");
      }
    };
    const id = setInterval(check, 3000);
    return () => clearInterval(id);
  }, [phase, recordViolation]);

  // ── Prevent page navigation ────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "exam") return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [phase]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const selectAnswer = (qId: number, optIdx: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const dismissWarning = () => {
    warningAckRef.current = true;
    setWarningMsg(null);
    setTimeout(() => { warningAckRef.current = false; }, 500);
    // Re-enter fullscreen if left
    document.documentElement.requestFullscreen?.().catch(() => {});
  };

  // ── Derived ────────────────────────────────────────────────────────────────
  const answeredCount = Object.keys(answers).length;
  const progress = questions.length ? (current / questions.length) * 100 : 0;
  const isLowTime = timeLeft <= 5 * 60;
  const isCriticalTime = timeLeft <= 60;

  // ── Loading Phase ──────────────────────────────────────────────────────────
  if (phase === "loading") {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin" />
        <p className="text-gray-500 font-medium">Preparing your exam…</p>
      </div>
    );
  }

  // ── Results Phase ──────────────────────────────────────────────────────────
  if (phase === "submitted" && score) {
    const pct = Math.round((score.correct / score.total) * 100);
    const passed = pct >= 50;
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 max-w-md w-full text-center">
          <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center text-5xl mb-6 ${passed ? "bg-green-100" : "bg-red-100"}`}>
            {passed ? "🎉" : "😔"}
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            {passed ? "Excellent Work!" : "Better Luck Next Time"}
          </h1>
          <p className="text-gray-500 mb-8 text-sm">{examName}</p>

          <div className="flex justify-center gap-10 mb-8">
            <div>
              <p className="text-4xl font-black text-gray-900">{score.correct}</p>
              <p className="text-gray-400 text-sm">Correct</p>
            </div>
            <div className="w-px bg-gray-100" />
            <div>
              <p className="text-4xl font-black text-gray-300">{score.total - score.correct}</p>
              <p className="text-gray-400 text-sm">Wrong</p>
            </div>
            <div className="w-px bg-gray-100" />
            <div>
              <p className={`text-4xl font-black ${passed ? "text-green-600" : "text-red-500"}`}>{pct}%</p>
              <p className="text-gray-400 text-sm">Score</p>
            </div>
          </div>

          {violations > 0 && (
            <div className="rounded-xl bg-orange-50 border border-orange-200 px-4 py-3 mb-6 text-sm text-orange-700">
              {violations} proctoring violation{violations > 1 ? "s were" : " was"} recorded during this exam.
            </div>
          )}

          <button
            onClick={() => router.push("/exams")}
            className="w-full py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-700 transition-colors"
          >
            Back to Exams
          </button>
        </div>
      </div>
    );
  }

  const q = questions[current];
  if (!q) return null;

  // ── Exam Phase ─────────────────────────────────────────────────────────────
  return (
    <div
      className="fixed inset-0 bg-gray-50 flex flex-col select-none"
      style={{ userSelect: "none", WebkitUserSelect: "none" } as React.CSSProperties}
    >
      {/* ── Violation Warning Overlay ── */}
      {warningMsg && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
            <div className="text-5xl mb-4">🚨</div>
            <h2 className="text-xl font-extrabold text-red-600 mb-2">Proctoring Alert</h2>
            <p className="text-gray-600 text-sm mb-2 leading-relaxed">{warningMsg}</p>
            {violations >= MAX_VIOLATIONS ? (
              <p className="text-red-500 font-bold text-sm mt-4">Maximum violations reached. Submitting your exam…</p>
            ) : (
              <>
                <p className="text-gray-400 text-xs mb-6">
                  {MAX_VIOLATIONS - violations} violation{MAX_VIOLATIONS - violations !== 1 ? "s" : ""} remaining before auto-submit.
                </p>
                <button
                  onClick={dismissWarning}
                  className="w-full py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-500 transition-colors"
                >
                  I Understand — Return to Exam
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Top Bar ── */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 shrink-0 shadow-sm">
        {/* Exam name + progress */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider truncate">{examName}</p>
            <p className="text-xs text-gray-400 ml-2 shrink-0">
              {answeredCount}/{questions.length} answered
            </p>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-600 rounded-full transition-all duration-300"
              style={{ width: `${(answeredCount / (questions.length || 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Timer */}
        <div
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-mono font-bold text-sm shrink-0 transition-colors ${
            isCriticalTime
              ? "bg-red-600 text-white animate-pulse"
              : isLowTime
              ? "bg-orange-100 text-orange-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          ⏱ {fmt(timeLeft)}
        </div>

        {/* Violation counter */}
        {violations > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold shrink-0">
            🚨 {violations}/{MAX_VIOLATIONS}
          </div>
        )}
      </header>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-y-auto flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Question number */}
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 text-center">
            Question {current + 1} of {questions.length}
          </p>

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
            <p className="text-gray-900 font-semibold text-lg leading-relaxed">{q.question}</p>
          </div>

          {/* Options */}
          <div className="grid gap-3">
            {q.options.map((opt, idx) => {
              const chosen = answers[q.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => selectAnswer(q.id, idx)}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium text-sm transition-all ${
                    chosen
                      ? "border-red-600 bg-red-50 text-red-700"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mr-3 shrink-0 ${
                    chosen ? "bg-red-600 text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* ── Bottom Navigation ── */}
      <footer className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between gap-3 shrink-0">
        {/* Question dots (mini navigator) */}
        <div className="flex-1 flex flex-wrap gap-1 overflow-hidden max-h-10">
          {questions.map((qq, i) => (
            <button
              key={qq.id}
              onClick={() => setCurrent(i)}
              title={`Q${i + 1}`}
              className={`w-6 h-6 rounded text-xs font-bold transition-colors ${
                i === current
                  ? "bg-red-600 text-white"
                  : answers[qq.id] !== undefined
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Prev / Next / Submit */}
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium disabled:opacity-30 transition-colors"
          >
            ← Prev
          </button>

          {current < questions.length - 1 ? (
            <button
              onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}
              className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium transition-colors"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={() => {
                if (
                  answeredCount < questions.length &&
                  !window.confirm(`You have ${questions.length - answeredCount} unanswered questions. Submit anyway?`)
                )
                  return;
                submitExam(questions, answers);
              }}
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-colors"
            >
              Submit ✓
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
