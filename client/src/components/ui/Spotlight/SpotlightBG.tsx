"use client";

import { motion } from "framer-motion";
import { Spotlight } from "./Spotlight";
import ExtendedColors from "../../../../color.config";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function SpotlightBG() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const { setTheme, resolvedTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
    scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!mounted) {
    return <div className="h-screen w-screen" />;
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-primary-650 antialiased md:items-center md:justify-center">
      <Spotlight
        className="-top-40 left-0 md:-top-40 md:left-60"
        fill={ExtendedColors.primary["200"]}
      />
      <div className="relative z-10 mt-24 flex max-w-[600px] flex-col items-center justify-center px-4 md:mt-40">
        <motion.img
          initial={{ opacity: 0.0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          src="/TechnobitLogo.png"
          alt="Technobit'26 Logo"
          className="relative z-10 max-h-[60vh] w-[90%] object-contain md:w-full"
        />
        <div className="z-10 mt-10 flex w-full gap-2 px-8 sm:gap-4">
          <Link
            href="/register"
            className="btn-prim Bebas flex-1 cursor-pointer rounded-full bg-primary-350 px-4 py-2.5 sm:px-8 md:text-xl"
            type="button"
          >
            Register Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
