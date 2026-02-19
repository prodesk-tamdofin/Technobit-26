"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import useUser from "@/hooks/useUser";

export function SpotlightBG() {
  const [mounted, setMounted] = useState(false);
  const [user] = useUser(false);

  useEffect(() => {
    setMounted(true);
    scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!mounted) {
    return <div className="h-screen w-screen" />;
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden antialiased md:items-center md:justify-center">
      {/* Background Image - Full visibility */}
      <div className="absolute inset-0">
        <img
          src="/Background.png"
          className="w-full h-full object-cover opacity-40"
          alt="Background"
        />
        {/* Subtle gradient overlay at bottom for smooth transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-650 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mt-20 flex max-w-[800px] flex-col items-center justify-center px-4 md:mt-32">
        <motion.img
          initial={{ opacity: 0.0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          src="/Logo(Red NO BG).png"
          alt="Technobit'26 Logo"
          className="relative z-10 max-h-[70vh] w-[85%] object-contain md:w-[95%]"
        />
        <div className="z-10 mt-10 flex w-full gap-2 px-8 sm:gap-4">
          {user ? (
            <Link
              href="/events"
              className="btn-prim Bebas flex-1 cursor-pointer rounded-full bg-primary-200 px-4 py-2.5 sm:px-8 md:text-xl hover:bg-primary-150 transition-colors"
              type="button"
            >
              View Segments →
            </Link>
          ) : (
            <Link
              href="/register"
              className="btn-prim Bebas flex-1 cursor-pointer rounded-full bg-primary-200 px-4 py-2.5 sm:px-8 md:text-xl hover:bg-primary-150 transition-colors"
              type="button"
            >
              Register Now →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
